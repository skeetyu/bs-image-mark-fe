<template>
    <el-container>
        <el-aside style="width:200px, margin-top:20px">
            <SideMenu></SideMenu>
        </el-aside>
        <el-main>
        <router-view/>
        </el-main>
    </el-container>
</template>

<script>
    import SideMenu from './Sidemenu.vue'
    export default {
        name: 'TaskIndex',
        components: { SideMenu }
    }
</script>

<style scoped>
    .taskbar-area{
        width: 990px;
        margin-left: auto;
        margin-right: auto;
    }
</style>