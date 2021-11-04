<template>
    <el-container>
        <el-aside style="width:200px, margin-top:20px">
            <!-- <el-switch></el-switch> -->
            <SideMenu></SideMenu>
        </el-aside>
        <el-main>
            <Picture class="picture-area"></Picture>
        </el-main>
    </el-container>
</template>

<script>
    import SideMenu from './SideMenu.vue'
    import Picture from './Picture.vue'
    export default {
        name: 'GraphIndex',
        components: {SideMenu, Picture}
    }
</script>

<style scoped>
    .picture-area{
        width: 990px;
        margin-left: auto;
        margin-right: auto;
    }
</style>