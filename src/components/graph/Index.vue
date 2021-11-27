<template>
    <el-container>
        <el-aside style="width:200px, margin-top:20px">
            <SideMenu></SideMenu>
        </el-aside>
        <!-- <el-main> -->
        <router-view/>
        <!-- </el-main> -->
    </el-container>
</template>

<script>
    import SideMenu from './SideMenu.vue'
    export default {
        name: 'GraphIndex',
        components: { SideMenu }
    }
</script>

<style scoped>
    /* .picture-area{
        width: 990px;
        margin-left: auto;
        margin-right: auto;
    } */
</style>