<template>
  <div class="container">
    <h1 class="top-title">待发货订单</h1>
    <div v-for="(item,index) in tableData" :key="index">
      <div class="order">
        <div class="orderId">
          订单编号: {{item._id}}
        </div>
        <div class="status">
          状态：{{item.status ==1 ?'未支付':item.status ==2 ?'已支付':item.status ==3?'已收货':item.status ==4?'已评价':'未评价'}}
        </div>
        <div class="contro" v-if="item.status==2">
          操作：<el-button type="primary" round @click="handleSend(item,index)">发货</el-button>
        </div>
      </div>
      <el-table
      :data="item.commodity"
      stripe
      style="width: 100%">
          <el-table-column
            prop="id.title"
            label="商品"
            width="180">
          </el-table-column>
          <el-table-column
            prop="orderCreateTime"
            label="提交时间"
            width="200">
          </el-table-column>
          <el-table-column
            prop="userNickname"
            label="收件人"
            width="180">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="收件地址"
            width="180">
          </el-table-column>
          <el-table-column
            prop="num"
            label="数量"
            width="180">
          </el-table-column>
          <el-table-column
            prop="price"
            label="单价">
          </el-table-column>
      </el-table>
  </div>
  <el-pagination
      class="pagemenu"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalpages">
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'allnews',
  data () {
    return {
      tableData: [],
      currentPage: 1,
      totalpages: 0,
      pagesize: 2
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getAllOrder()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getAllOrder()
    },
    getAllOrder () {
      // var date = new Date();
      // var timer = date.getTime().toString();
      axios.get('/api/order/status2',{
        params: {
              pn: this.currentPage,
              size: this.pagesize
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.data.data
        console.log(this.tableData)
        this.tableData.map(item => {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
        })
        for (let i=0; i<this.tableData.length; i++) {
          for (let j=0; j<this.tableData[i].commodity.length; j++) {
            this.tableData[i].commodity.splice(j,1,{
            ...this.tableData[i].commodity[j],
            orderId: this.tableData[i]._id,
            orderCreateTime: this.tableData[i].createTime,
            phone: this.tableData[i].user.phone,
            userNickname: this.tableData[i].user.usernickname,
            address: this.tableData[i].user.address,
          })
          }
        }
      })
    },
    handleSend (item,index) {
      const id = item._id
      axios.put('/api/order/'+ id,{status:3}).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '发货成功',
            type: 'success'
        })
        }
      })
      this.getAllOrder()
    }
  },
  mounted () {
    this.getAllOrder()
  },
  created () {
    axios.get('/api/order/status2').then(res => {
      this.totalpages = res.data.data.length
    })
  }
}
</script>

<style scoped lang='scss'>
.el-pagination {
  position: relative;
  padding-left: 60%;
}
.order {
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
  height: 40px;
  line-height: 40px;
  background: #EBEEF5;
  font-size: 18px;
  color: #555;
  border-bottom: 1px solid #EBEEF5;
}
</style>
