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
                        <el-button type="text" v-if="scope.row.state==3" v-on:click="showTask(scope.row.name)">查看</el-button>
                        <el-button type="text" v-if="scope.row.state==1 || scope.row.state==2" v-on:click="markTask(scope.row.name)">标注</el-button>
                        <el-button type="text" v-if="scope.row.state==1" v-on:click="withdrawTask(scope.row.name)">取消领取</el-button>
                        <el-button type="text" v-if="scope.row.state==2" v-on:click="submitTask(scope.row.name)">提交任务</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-dialog :visible.sync="dialogVisible" :title="todoTask" width="800px" top="150px" :before-close="closeDialog">
            <el-row style="overflow-y:auto; height:250px">
                <el-checkbox-group v-model="checkList" v-on:change="bindCheckBox">
                    <el-card style="width:230px; margin-bottom:20px; height:220px; float:left; margin-right:15px" 
                        class="board" bodyStyle="padding:10px" shadow="hover" v-for="item in pictures" :key="item.id">
                        <div class="picture"><img :src="imgUrl ? imgUrl : require('../../assets/upload/' + item.path)" alt="封面"></div>
                        <el-checkbox class="title" :label="item.name"></el-checkbox>
                    </el-card>
                </el-checkbox-group>
            </el-row>
            <template #footer>
            <span>
                <el-button type="primary" size="medium" v-on:click="closeDialog">关闭</el-button>
                <el-button type="primary" size="medium" v-on:click="gotoMark" v-if="ifTodo==true">标注</el-button>
                <el-button type="primary" size="medium" v-on:click="gotoShowMark" v-if="ifShown==true">查看</el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'TasksTodo',
        data () {
            return {
                tasks: [],
                dialogVisible: false,
                ifShown: false,
                todoTask: '',
                ifTodo: false,
                imgUrl: '',
                pictures: [],
                checkList: []
            }
        },
        mounted: function() {
            this.getTodoTasks()
        },
        methods: {
            getTodoTasks() {
                var _this = this
                this.$axios.post('/gettodotasks').then(successResponse => {
                    if(successResponse.data.code === 200) {
                        _this.tasks = successResponse.data.tasks
                    }
                })
            },
            showTask(taskname) {
                this.todoTask = taskname
                this.ifShown = true
                this.dialogVisible = true
                this.getTaskGraphs()
            },
            markTask(taskname) {
                this.todoTask = taskname
                this.ifTodo = true
                this.dialogVisible = true
                this.getTaskGraphs()
            },
            getTaskGraphs(){
                var _this = this
                this.$axios.post('gettaskgraphs', {
                    taskname: this.todoTask
                })
                .then(successResponse => {
                    if(successResponse.data.code === 200) {
                        _this.pictures = successResponse.data.pictures
                    }
                })
            },
            closeDialog(){
                this.todoTask = ''
                this.ifTodo = false
                this.ifShown = false
                this.dialogVisible = false
                this.pictures = []
            },
            withdrawTask(taskname) {
                this.$axios.post('/withdrawtask', {
                    taskname: taskname
                })
                .then(successResponse => {
                    if(successResponse.data.code === 200){
                        this.$message.success('取消成功')
                        this.getTodoTasks()
                    }
                })
            },
            submitTask(taskname) {
                this.$axios.post('/submittask', {
                    taskname: taskname
                })
                .then(successResponse => {
                    if(successResponse.data.code === 200){
                        this.$message.success('提交任务成功！')
                        this.getTodoTasks()
                    }else if(successResponse.data.code === 400){
                        this.$message.error('提交失败！当前还有未标注的图片')
                    }
                })
            },
            bindCheckBox(){
                if(this.checkList.length > 1){
                    this.checkList.splice(0,1)
                }
            },
            gotoMark(){
                this.$router.replace({name: 'Workbench', params: {graph: this.checkList, task: this.todoTask, ifMarked: 0}})
            },
            gotoShowMark(){
                this.$router.replace({name: 'Workbench', params: {graph: this.checkList, task: this.todoTask, ifMarked: 1}})
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
</style>
