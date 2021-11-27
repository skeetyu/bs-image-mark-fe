<template>
    <el-carousel  indicator-position="outside" type="card" 
        left="50px" right="50px" height="600px">
        <el-carousel-item v-for="(item,i) in homeList" :key="i">
            <img :src="imgUrl ? imgUrl : require('../../assets/' + item.url + '.jpg')" alt=''>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
    export default {
        name: 'AppIndex',
        data(){
            return {
                imgUrl: '',
                homeList: [
                    {url: 'jingling1', name: 'jingling1'},
                    {url: 'jingling2', name: 'jingling2'},
                    {url: 'jingling3', name: 'jingling3'},
                    {url: 'jingling4', name: 'jingling4'}
                ]
            }
        }
    }
</script>

<style scoped>
    .el-carousel__item{
    height: 500px;
    top: 50px;
    /* margin-top: 100px; */
    }

    .el-carousel__item img{
        width: 100%;
        height: 100%;
    }
</style>