<template>
    <div>
        <el-row style="left:180px; width:1200px; height:840px">
            <el-table class="table-border" stripe :data="tasks">
                <el-table-column prop="tid" label="编号" width="200"></el-table-column>
                <el-table-column prop="name" label="名称" width="200"></el-table-column>
                <el-table-column prop="publisher" label="发布者" width="200"></el-table-column>
                <el-table-column prop="accepter" label="领取者" width="200"></el-table-column>
                <el-table-column prop="tid" label="状态" width="180">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.state==0">待领取</el-tag>
                        <el-tag type="info" v-if="scope.row.state==1">已领取</el-tag>
                        <el-tag type="warning" v-if="scope.row.state==2">进行中</el-tag>
                        <el-tag type="success" v-if="scope.row.state==3">已完成</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="text" v-on:click="showTask(scope.row.name)">预览</el-button>
                        <el-button type="text" v-if="scope.row.state==0" v-on:click="acceptTask(scope.row.name)">领取</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-dialog :visible.sync="ifShown" :title="shownTask" width="800px" top="150px">
            <el-row style="overflow-y:auto; height:250px">
                <el-card style="width:230px; margin-bottom:20px; height:220px; float:left; margin-right:15px" 
                    class="board" bodyStyle="padding:10px" shadow="hover" v-for="item in pictures" :key="item.id">
                    <div class="picture"><img :src="imgUrl ? imgUrl : require('../../assets/upload/' + item.path)" alt="封面"></div>
                    <div class="title">{{item.name}}</div>
                </el-card>
            </el-row>
            <template #footer>
            <span>
                <el-button type="primary" size="medium" v-on:click="closeShown">关闭</el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'Tasks',
        data () {
            return {
                tasks: [],
                shownTask: '',
                ifShown: false,
                imgUrl: '',
                pictures: []
            }
        },
        mounted: function() {
            this.getTasks()
        },
        methods: {
            getTasks() {
                var _this = this
                this.$axios.post('/gettasks').then(successResponse => {
                    if(successResponse && successResponse.data.code === 200) {
                        _this.tasks = successResponse.data.tasks
                    }
                })
            },
            showTask(taskname) {
                this.shownTask = taskname
                this.ifShown = true
                this.getGraphs()
            },
            getGraphs(){
                var _this = this
                this.$axios.post('gettaskgraphs', {
                    taskname: this.shownTask
                })
                .then(successResponse => {
                    if(successResponse && successResponse.data.code === 200) {
                        _this.pictures = successResponse.data.pictures
                    }
                })
            },
            closeShown(){
                this.shownTask = ''
                this.ifShown = false
                this.pictures = []
            },
            acceptTask(taskname) {
                var _this = this
                this.$axios.post('/accepttask', {
                    taskname: taskname
                })
                .then(successResponse => {
                    if(successResponse.data.code === 200){
                        this.$message.success('领取任务成功！')
                        this.getTasks()
                    }else if(successResponse.data.code === 400){
                        this.$message.warning('不能领取自己发布的任务！')
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .table-border {
        border-radius: 15px;
        background-clip: padding-box;
        padding: 10px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 15px #cac6c6;
    }

    .picture {
        width: 230px;
        height: 172px;
        margin-bottom: 7px;
        overflow: hidden;
        cursor: pointer;
    }

    img {
        width: 230px;
        height: 172px;
    }

    .title {
        font-size: 14px;
        text-align: center;
    }
</style>
