<template>
    <label class="lin-upload-wrap">
        <input type="file" class="lin-upload-input" @change="change" multiple>
        <slot></slot>
    </label>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      token: '',
      url: []
    }
  },
  methods: {
    getToken () {
      axios.get('/api/uploadToken/admin').then(res => {
        console.log(res.data)
        this.token = res.data.data.token
      })
    },
    change (evnet) {
      const files = event.target.files
      for (let i = 0; i<files.length; i++) {
        const file = files[i]
        const form = new FormData()
        form.append('token', this.token)
        form.append('file', file)
        axios.post('https://upload-z1.qiniup.com', form).then(res => {
        this.url.push(res.data.url)
        this.$emit('success', this.url)
        })
      }
      
    }
  },
  created () {
    this.getToken()
  }
}
</script>

<style lang="scss">
  .lin-upload-wrap{
    display: block;
    .lin-upload-input {
      display: none;
    }
    .upload-btn {
      width: 100px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      color: #555;
      border: 1px solid #000;
    }
  }
</style>
