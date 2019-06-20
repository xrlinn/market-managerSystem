<template>
  <div class="container">
    <h1 class="top-title">下架商品</h1>
    <div class="msg">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="title"
          label="商品名称"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="_id"
          label="商品编号"
          min-width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="164">
          <template slot-scope="scope">
            <div class="btns">
              <el-button type="primary" @click="handleClick(scope.row)" size="small">查看</el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">下架</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="pagemenu"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[6]"
      :current-page="currentPage"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalpages">
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'commoditydelete',
  data () {
    return {
      tableData: [],
      currentPage: 1,
      totalpages: 0,
      pagesize: 6
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getAllCommodity()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getAllCommodity()
    },
    getAllCommodity () {
      axios.get('/api/commodity',{
        params: {
          pn: this.currentPage,
          size: this.pagesize
        }
      }).then(res => {
        this.tableData = res.data.data
      })
    },
    handleDelete (index,row) {
      const id = row._id
      axios.delete('/api/commodity/'+id).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '该商品下架成功',
            type: 'success'
          })
          this.getAllCommodity()
          axios.get('/api/commodity').then(res => {
            console.log(res.data)
            this.totalpages = res.data.data.length
          })
        } else {
          this.$message({
            message: '下架失败',
            type: 'warning'
          })
        }
      })
    }
  },
  mounted () {
    this.getAllCommodity()
  },
  created () {
    axios.get('/api/commodity').then(res => {
      console.log(res.data)
      this.totalpages = res.data.data.length
    })
  }
}
</script>

<style scoped lang="scss">
.top-title {
  color: #888;
}
.btns {
  text-align: center;
}
.pagemenu {
  position: absolute;
  top: 600px;
  right: 20px;
}
</style>
