<template>
    <el-container style="margin-top:20px">
        <el-aside width="200px">
            <SideMenu></SideMenu>
        </el-aside>
        <router-view/>
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