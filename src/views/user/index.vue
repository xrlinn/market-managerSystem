<template>
  <div class="container">
    <h1 class="top-title">用户管理</h1>
    <div class="msg">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="usernickname"
          label="用户名"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          min-width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="164">
          <template slot-scope="scope">
            <div class="btns">
              <el-button type="primary" @click="handleLift(scope.row)" size="small">解封</el-button>
              <el-button type="danger" size="small" @click="handleLimit(scope.row)">封禁</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'user',
  data () {
    return {
      tableData: [],
    }
  },
  methods: {
    getAllUser() {
      axios.get('/api/user/admin').then(res => {
        this.tableData = res.data.data
        console.log(this.tableData)
      })
    },
    handleLimit (row) {
      const id = row._id
      axios.put('/api/user/limit/'+id).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning'
          })
        }
      })
    },
    handleLift (row) {
      const id = row._id
      axios.put('/api/user/lift/'+id).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning'
          })
        }
      })
    }
  },
  created () {
    this.getAllUser()
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
