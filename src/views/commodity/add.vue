<template>
  <div class="container">
    <h1 class="top-title">发布新商品</h1>
    <div class="image">
      <span class="text">上传商品头图：</span>
      <lin-upload
        class="avatar-uploader"
        @success="changeImageUrl">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus icon"></i>
      </lin-upload>
    </div>
    <div class="title">
      <span class="text">商品标题：</span>
      <el-input v-model="title"></el-input>
    </div>
    <div class="author">
      <span class="text">商品价格：</span>
      <el-input v-model="price"></el-input>
    </div>
    <div class="delivery">
      <span class="text">发货地址：</span>
      <el-input v-model="delivery"></el-input>
    </div>
    <div class="category">
      <el-dropdown class="left">
        <span class="el-dropdown-link">
          商品类别<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="handleItem(item, index)" divided v-for="(item,index) in categoryData" :key="index">{{item.title}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-input v-model="categoryTitle" class="input" disabled></el-input>
    </div>
    <el-button class="btn" type="primary" @click="handleSend">发布商品</el-button>
  </div>
</template>

<script>
import editor from '@/components/editor'
import axios from 'axios'
import linUpload from '@/components/lin-upload'
export default {
  name: 'add',
  components: {
    editor,
    linUpload
  },
  data () {
    return {
      imageUrl: '',
      title: '',
      price: '',
      delivery: '',
      categoryData: [],
      categoryTitle: '',
    }
  },
  methods: {
    handleItem(item, index){
      this.categoryTitle = item.title
    },
    getAllCategory() {
      axios.get('/api/category').then(res => {
        this.categoryData = res.data.data
        console.log(this.categoryData)
      })
    },
    changeImageUrl (url) {
      this.imageUrl = url[0]
    },
    handleSend () {
      const img = this.imageUrl
      const title = this.title
      const price = this.price
      const categoryTitle = this.categoryTitle
      const delivery = this.delivery
      axios.post('/api/commodity/toCategory',{img,title,price,delivery,categoryTitle}).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.imageUrl = ''
          this.title = ''
          this.price = ''
          this.categoryTitle = ''
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
    this.getAllCategory()
  }
}
</script>

<style  lang="scss">
.avatar-uploader {
      width: 300px;
      height: 200px;
      border: 1px dashed #d9d9d9;

      img {
        width: 100%;
        height: 100%;
      }

      .icon {
        font-size: 28px;
        color: #8c939d;
        width: 300px;
        height: 200px;
        line-height: 200px;
        text-align: center;
      }
    }

    .avatar-uploader:hover {
      border: 1px dashed #409eff;
      cursor: pointer;
    }
  .el-input.is-disabled .el-input__inner {
    color:#409eff;
  }
.container {

  .top-title {
    color: #888;
  }

  div {
    margin-top: 10px;
  }

  .text {
    display: block;
    margin: 10px 0;
    color: #999;
  }
  .btn {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    padding: 20px;
    color: #fff;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .category {
    display: flex;
  
    .input {
      width: 8%;
    }
  }
}
</style>
