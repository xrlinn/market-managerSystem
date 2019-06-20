<template>
  <el-col :span="12" class="sidenav">
    <el-menu
      router
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c6e"
      text-color="#fff"
      active-text-color="#409eff">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-film icon"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/addCommodity" @click="handleTransfer('商品管理','发布商品')"><i class="el-icon-circle-plus-outline icon"></i>发布商品</el-menu-item>
          <el-menu-item index="/deleteCommodity" @click="handleTransfer('商品管理','下架商品')"><i class="el-icon-remove-outline icon"></i>下架商品</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-document-copy"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/allOrders" @click="handleTransfer('订单管理','全部商品')"><i class="el-icon-s-grid icon"></i>全部订单</el-menu-item>
          <el-menu-item index="/pay" @click="handleTransfer('订单管理','待付款订单')"><i class="el-icon-time icon"></i>待付款订单</el-menu-item>
          <el-menu-item index="/send" @click="handleTransfer('订单管理','代发货订单')"><i class="el-icon-circle-check icon"></i>代发货订单</el-menu-item>
          <el-menu-item index="/receive" @click="handleTransfer('订单管理','待收货订单')"><i class="el-icon-circle-close icon"></i>待收货订单</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-notebook-2 icon"></i>
          <span>分类管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/addCategory" @click="handleTransfer('分类管理','添加')"><i class="el-icon-plus icon"></i>添加分类</el-menu-item>
          <el-menu-item index="/deleteCategory" @click="handleTransfer('分类管理','删除')"><i class="el-icon-minus icon"></i>删除分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-custom icon"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user" @click="handleTransfer('用户管理','用户信息')"><i class="el-icon-user icon"></i>用户信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  name: 'sidenav',
  data () {
    return {
      pathmsg: []
    }
  },
  methods: {
    handleTransfer (firstmsg, secondmsg) {
      this.$store.dispatch('getPathMsg', [])
      this.pathmsg = []
      this.pathmsg.push(firstmsg)
      this.pathmsg.push(secondmsg)
      setTimeout(() => {
        this.$store.dispatch('getPathMsg', this.pathmsg)
      }, 10)
    }
  }
}
</script>

<style scoped lang="scss">
.sidenav {
  position: fixed;
  width: 220px;
  height: 100%;

  .el-menu-vertical-demo {
    height: 100%;

    .icon {
      font-size: 26px;
    }
  }
}
</style>
