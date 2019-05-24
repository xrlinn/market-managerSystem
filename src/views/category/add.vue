<template>
  <div class="container">
    <h1 class="top-title">轮播图添加</h1>
    <div class="image">
      <span>轮播图图片：</span>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div class="title">
      <span>标题：</span>
      <el-input></el-input>
    </div>
    <el-button class="btn" type="primary">发送</el-button>
  </div>
</template>

<script>
import editor from '@/components/editor'
export default {
  name: 'chartadd',
  components: {
    editor
  },
  data () {
    return {
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
    }
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

  .btn {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
  }
}
</style>
