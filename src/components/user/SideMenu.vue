<template>
  <el-menu
    class = "categories"
    default-active="0"
    @select="handleSelect"
    active-text-color="red">
    <el-menu-item index="0">
      <i class="el-icon-user"></i>
      <span slot="title">个人信息</span>
    </el-menu-item>
    <el-menu-item index="1">
      <i class="el-icon-edit"></i>
      <span slot="title">修改密码</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-remove"></i>
      <span slot="title">登出 / 注销</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'SideMenu'
  }
</script>

<style scoped>
  .categories {
    position: fixed;
    /* margin-left: 50%;
    left: -600px; */
    top: 80px;
    width: 150px;
    text-align: left;
  }
</style>

