<template>
  <div class="container">
    <h1 class="top-title">添加分类</h1>
    <div class="category-wrap">
      <span>我的分类：</span>
      <div class="category" v-for="(item,index) in categoryData" :key="index">
        {{item.title}}
      </div>
    </div>
    <div class="title">
      <span>添加分类：</span>
      <el-input placeholder="请输入分类名" v-model="text"></el-input>
    </div>
    <el-button class="btn" type="primary" @click="handleAdd">添加</el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'chartadd',
  data () {
    return {
      categoryData: [],
      text: ''
    }
  },
  methods: {
    getAllCategory() {
      axios.get('/api/category').then(res => {
        this.categoryData = res.data.data
        console.log(this.categoryData)
      })
    },
    handleAdd () {
      const title = this.text
      axios.post('/api/category',{title}).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.getAllCategory()
        } else {
          this.$message({
            message: '分类添加失败',
            type: 'warning'
          })
        }
      })
    }
  },
  created () {
    this.getAllCategory()
  }
}
</script>

<style scoped lang="scss">
.container {

  .top-title {
    color: #888;
  }

  div {
    margin-top: 10px;
  }

  span {
    display: block;
    margin: 10px 0;
    color: #999;
  }
  .category {
    width: 10%;
    margin: 0 auto;
    text-align: center;
    font-size: 28px;
    color: #409eff;
    padding: 6px 0;
  }

  .btn {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
  }
}
</style>
