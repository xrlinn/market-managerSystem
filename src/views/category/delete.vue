<template>
  <div class="container">
    <h1 class="top-title">删除分类</h1>
    <div class="msg">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="title"
          label="分类名"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="commodity.length"
          label="商品数"
          min-width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="164">
          <template slot-scope="scope">
            <div class="btns">
              <el-button type="primary" @click="handleClick(scope.row)" size="small">查看</el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="pagemenu"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[8]"
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
  name: 'chartdelete',
  data () {
    return {
      tableData: [],
      currentPage: 1,
      totalpages: 0,
      pagesize: 8
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getAllCategory()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getAllCategory()
    },
    getAllCategory() {
      axios.get('/api/category',{
        params: {
          pn: this.currentPage,
          size: this.pagesize
        }
      }).then(res => {
        this.tableData = res.data.data
        console.log(this.tableData)
      })
    },
    handleDelete (row) {
      const id = row._id
      axios.delete('/api/category/'+id).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.getAllCategory()
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning'
          })
        }
      })
    }
  },
  mounted () {
    this.getAllCategory()
  },
  created () {
    axios.get('/api/category').then(res => {
      console.log(res.data)
      this.totalpages = res.data.data.length
    })
  }

}
</script>

<style scoped>
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
