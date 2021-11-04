<template>
    <el-container>
        <el-aside style="width:200px, margin-top:20px">
            <!-- <el-switch></el-switch> -->
            <SideMenu></SideMenu>
        </el-aside>
        <el-main>
            <Info class="info-area"></Info>
        </el-main>
    </el-container>
</template>

<script>
    import SideMenu from './SideMenu.vue'
    import Info from './Info.vue'
    export default {
        name: 'UserIndex',
        components: {SideMenu, Info}
    }
</script>

<style scoped>
    .info-area{
        width: 990px;
        margin-left: auto;
        margin-right: auto;
    }
</style>