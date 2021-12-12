<template>    
    <el-container>
        <el-aside style="width:200px, margin-top:20px">
            <el-menu
                class="sidemenu"
                :default-active="$route.path"
                router
                active-text-color="coral">
                <el-menu-item>
                    <el-button type="primary" plain size="mini" class="el-icon-picture-outline" v-on:click="gotoGraph">
                    返回图片
                    </el-button>
                </el-menu-item>
                <el-menu-item>
                    <el-button type="primary" plain size="mini" class="el-icon-position" v-on:click="uploadPictures">
                    确认上传
                    </el-button>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <el-row style="left:180px; top:20px; height:840px">
                <el-checkbox-group v-model="checkList">
                    <el-card style="width:230px; margin-bottom:20px; height:220px; float:left; margin-right:15px" 
                        class="board" bodyStyle="padding:10px" shadow="hover" v-for="item in pictures" :key="item.id">
                        <div class="picture"><img :src="imgUrl ? imgUrl : require('../../assets/temp/' + item + '.jpg')" alt="封面"></div>
                        <el-checkbox class="title" :label="item"></el-checkbox>
                    </el-card>
                </el-checkbox-group>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: 'Video',
        data () {
            return {
                imgUrl: '',
                pictures: [],
                checkList: []
            }
        },
        mounted() {
            if(this.$route.params.graphs) this.pictures = this.$route.params.graphs
            console.log(this.pictures)
        },
        methods: {
            gotoGraph(){
                this.$router.replace({path: '/graph'})
            },
            uploadPictures(){
                var _this = this
                if(this.checkList.length === 0){
                    this.$message.error('请选择要上传的图片！若不上传，请点击[返回图片]')
                }else{
                    this.$axios.post('/videotographs', {
                        graphs: this.checkList
                    })
                    .then(successResponse => {
                        if(successResponse.data.code === 200){
                            this.$message.success('上传成功')
                            this.$router.replace({path: '/graph'})
                        }else if(successResponse.data.code === 400){
                            this.$message.error('上传失败')
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .sidemenu{
        position: fixed;
        top: 80px;
        width: 150px;
        height: 85%;
        text-align: left;
        z-index: 5;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 15px #cac6c6;
    }
    .el-menu-item.is-active {
        background-color: #fff !important;
        color: #fff;
        span {
            color: #fff !important;
        }
    }
    .el-menu-item:hover{
        background-color: #fff;
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

    .btn {
        position: fixed;
        left: 21px;
        top: 150px;
        z-index: 7;
    }
</style>
