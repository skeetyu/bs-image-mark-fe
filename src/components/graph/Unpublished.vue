<template>
    <div>
        <el-row style="left:180px; top:20px; height:840px">
        <h2>要引入任务模块后才可以完善此功能的后端部分</h2>
            <el-card style="width:230px; margin-bottom:20px; height:220px; float:left; margin-right:15px" 
                class="board" bodyStyle="padding:10px" shadow="hover" v-for="item in pictures" :key="item.id">
                <div class="picture"><img :src="imgUrl ? imgUrl : require('../../assets/upload/' + item.path)" alt="封面"></div>
                <div class="title">{{item.name}}</div>
            </el-card>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'Unpublished',
        data () {
            return {
                imgUrl: '',
                pictures: []
            }
        },
        // mounted: function() {
        //     this.getUnpublishedGraphs()
        // },
        methods: {
            getUnpublishedGraphs() {
                var _this = this
                this.$axios.post('/getunpublishedgraphs').then(successResponse => {
                    console.log(successResponse)
                    if(successResponse && successResponse.data.code === 200) {
                        _this.pictures = successResponse.data.pictures
                    }
                    console.log(this.pictures)
                })
            }
        }
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
