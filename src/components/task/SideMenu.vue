<template>
  <el-menu
    class = "categories"
    default-active="0"
    @select="handleSelect"
    active-text-color="red">
    <el-menu-item index="0">
      <i class="el-icon-tickets"></i>
      <span slot="title">任务栏</span>
    </el-menu-item>
    <el-menu-item index="1">
      <i class="el-icon-dish"></i>
      <span slot="title">当前任务</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-finished"></i>
      <span slot="title">历史任务</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-box"></i>
      <span slot="title">工作台</span>
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
    /* top: 100px; */
    width: 150px;
    text-align: left;
  }
</style>

