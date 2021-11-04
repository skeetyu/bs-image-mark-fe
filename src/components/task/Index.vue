<template>
    <el-container>
        <el-aside style="width:200px, margin-top:20px">
            <!-- <el-switch></el-switch> -->
            <SideMenu></SideMenu>
        </el-aside>
        <el-main>
            <Bar class="taskbar-area"></Bar>
        </el-main>
    </el-container>
</template>

<script>
    import SideMenu from './SideMenu.vue'
    import Bar from './Bar.vue'
    export default {
        name: 'TaskIndex',
        components: {SideMenu, Bar}
    }
</script>

<style scoped>
    .taskbar-area{
        width: 990px;
        margin-left: auto;
        margin-right: auto;
    }
</style>