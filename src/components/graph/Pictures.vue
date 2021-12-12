<template>
    <div>
        <el-button type="primary" plain size="mini" class="btn" @click="createTaskVisible = true">
        <i class="el-icon-position"> 创建任务</i>
        </el-button>
        <el-row style="left:180px; top:20px; height:840px">
            <!-- <el-col :span="20"> -->
            <el-checkbox-group v-model="checkList">
                <el-card style="width:230px; margin-bottom:20px; height:220px; float:left; margin-right:15px" 
                    class="board" bodyStyle="padding:10px" shadow="hover" v-for="item in pictures" :key="item.id">
                    <div class="picture"><img :src="imgUrl ? imgUrl : require('../../assets/upload/' + item.path)" alt="封面"></div>
                    <el-checkbox class="title" :label="item.name"></el-checkbox>
                </el-card>
            </el-checkbox-group>
            <!-- </el-col> -->
        </el-row>
        <el-dialog :visible.sync="createTaskVisible" title="创建任务" width="400px" top="180px">
            <el-form>
                <el-form-item>
                    <el-input type="text" v-model="taskname" 
                        auto-complete="off" placeholder="任务名称">
                    </el-input>
                </el-form-item>
            </el-form>
            <template #footer>
            <span> 
                <el-button @click="createTaskVisible = false">取消</el-button>
                <el-button type="primary" v-on:click="createTask">发布</el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'Pictures',
        data () {
            return {
                createTaskVisible: false,
                imgUrl: '',
                pictures: [],
                checkList: [],
                taskname: ''
            }
        },
        mounted: function() {
            this.getGraphs()
        },
        methods: {
            getGraphs() {
                var _this = this
                this.$axios.post('/getgraphs').then(successResponse => {
                    if(successResponse && successResponse.data.code === 200) {
                        _this.pictures = successResponse.data.pictures
                    }
                })
            },
            createTask() {
                var _this = this
                if(this.checkList.length === 0){
                    this.$message.error('请选择要创建任务的图片！')
                }else{
                    this.$axios.post('/createtask', {
                        graphs: this.checkList,
                        taskname: this.taskname
                    })
                    .then(successResponse => {
                        if(successResponse.data.code === 200){
                            this.$message.success('创建任务成功！已发布')
                        }else if(successResponse.data.code === 400){
                            this.$message.error('创建失败！任务名重复')
                        }
                    })
                    this.createTaskVisible = false
                }
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

    .btn {
        position: fixed;
        left: 21px;
        top: 150px;
        z-index: 7;
    }
</style>
