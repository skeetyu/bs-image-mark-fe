<template>
    <div>
        <el-row style="left:180px; top:20px; height:840px">
        <h2>工作台</h2>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'Workbench'
    }
</script>

<style scoped>
    .board{
       top:80px;
    }

    .picture {
        width: 230px;
        height: 172px;
        /* top:80px; */
        margin-bottom: 7px;
        overflow: hidden;
        cursor: pointer;
    }

    img {
        width: 230px;
        height: 172px;
        /*margin: 0 auto;*/
    }

    .title {
        font-size: 14px;
        text-align: center;
    }
</style>
