<template>
    <el-menu
      :default-active="$route.path"
      router
      mode="horizontal"
      background-color="antiquewhite"
      text-color="#222"
      active-text-color="red"
      style="min-width: 1300px">
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" :class="item.icon">
        {{ item.navItem }}
      </el-menu-item>
      <span style="position: absolute;padding-top: 20px;right: 48%;font-size: 20px;font-weight: bold">Welcome</span>
    </el-menu>
</template>

<script>
    export default {
        name: 'NavMenu',
        data(){
            return {
                navList: [
                    {name: '/user', navItem: '个人中心', icon: 'el-icon-user'},
                    {name: '/graph', navItem: '图片中心', icon: 'el-icon-picture'},
                    {name: '/task', navItem: '任务中心', icon: 'el-icon-box'}
                ]
            }
        }
    }
</script>

<style scoped>

</style>