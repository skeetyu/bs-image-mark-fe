<template>
    <el-menu 
        class="navmenu"
        :default-active="currentPath"
        router
        mode="horizontal"
        text-color="#222"
        active-text-color="coral">
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" :class="item.icon">
            {{ item.navItem }}
        </el-menu-item>
        <span style="position:absolute; padding-top:8px; right:65%;">
            <img :src="imgUrl ? imgUrl : require('../../assets/logo2.jpeg')" alt="logo">
        </span>
        <span style="position:absolute; padding-top:20px; right:58%; 
            font-size:20px; font-weight:bold; font-style:italic; color:lightsalmon">
            Welcome! 
        </span>
        <span style="position:absolute; padding-top:25px; right:25%; 
            font-size:15px; font-weight:bold; font-style:italic; color:lightsalmon">
            ———— This is your best reliable image annotation assistant
        </span>
    </el-menu>
</template>

<script>
    export default {
        name: 'NavMenu',
        data(){
            return {
                imgUrl: '',
                navList: [
                    {name: '/index', navItem: '首页', icon: 'el-icon-s-home'},
                    {name: '/graph', navItem: '图片中心', icon: 'el-icon-picture'},
                    {name: '/task', navItem: '任务中心', icon: 'el-icon-s-claim'},
                    {name: '/user', navItem: '用户', icon: 'el-icon-user-solid'}
                ]
            }
        },
        computed: {
            currentPath () {
                var x = this.$route.path.indexOf('/', 1)
                if (x !== -1) {
                    return this.$route.path.substring(0, x)
                } else {
                    return this.$route.path
                }
            }
        }
    }
</script>

<style scoped>
    .navmenu{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%;
        /* background: rgb(252, 242, 242);
        border: 1px solid #eaeaea;
        box-shadow: 0 0 15px #f7d7d7; */
        
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 10px #cac6c6;
    }
</style>