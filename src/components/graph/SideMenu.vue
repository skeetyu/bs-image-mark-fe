<template>
    <el-menu
        class="sidemenu"
        :default-active="$route.path"
        router
        active-text-color="coral">
        <el-menu-item v-for="(item,i) in sideList" :key="i" :index="item.name" :class="item.icon">
            {{ item.sideItem }}
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
          name: 'SideMenu',
          data(){
              return {
                  sideList: [
                      {name: '/graph', sideItem: '所有图片', icon: 'el-icon-tickets'},
                      {name: '/graph/unpublished', sideItem: '未发布的', icon: 'el-icon-dish'},
                      {name: '/graph/upload', sideItem: '图片上传', icon: 'el-icon-upload'}
                  ]
              }
          }
    }
</script>

<style scoped>
    .sidemenu{
        position: fixed;
        top: 80px;
        width: 150px;
        height: 85%;
        text-align: left;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 15px #cac6c6;
    }
    .el-menu-item.is-active {
      background-color: #fff !important;
      color: #fff;
      span {
        color: #fff !important;
      }
    }
    .el-menu-item:hover{
        background-color: #fff;
    }
</style>

