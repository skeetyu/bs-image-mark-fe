<template>
    <div>
        <el-row style="left:180px; top:20px; height:840px">
            <el-table class="table-border" stripe :data="tasks">
                <el-table-column prop="tid" label="编号" width="200"></el-table-column>
                <el-table-column prop="name" label="名称" width="200"></el-table-column>
                <el-table-column prop="publisher" label="发布者" width="200"></el-table-column>
                <el-table-column prop="accepter" label="领取者" width="200"></el-table-column>
                <el-table-column prop="tid" label="状态" width="180">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.state==0">待领取</el-tag>
                        <el-tag type="info" v-if="scope.row.state==1">待完成</el-tag>
                        <el-tag type="success" v-if="scope.row.state==2">已完成</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="text" v-if="scope.row.state==2" v-on:click="showTask(scope.row.name)">查看</el-button>
                        <el-button type="text" v-if="scope.row.state==1" v-on:click="markTask(scope.row.name)">标注</el-button>
                        <el-button type="text" v-if="scope.row.state==1" v-on:click="withdrawTask(scope.row.name)">取消领取</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-dialog :visible.sync="ifTodo" :title="todoTask" width="800px" top="150px">
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
                <el-button type="primary" size="medium" v-on:click="closeMark">关闭</el-button>
                <el-button type="primary" size="medium" v-on:click="gotoMark">标注</el-button>
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
                shownTask: '',
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
                    if(successResponse && successResponse.data.code === 200) {
                        _this.tasks = successResponse.data.tasks
                    }
                })
            },
            showTask(taskname) {
                this.$message.warning('需要展示标注后的图片，还有待开发')
            },
            markTask(taskname) {
                this.todoTask = taskname
                this.ifTodo = true
                this.getUnmarkedGraphs()
            },
            getUnmarkedGraphs(){
                var _this = this
                this.$axios.post('gettaskgraphs', {
                    taskname: this.todoTask
                })
                .then(successResponse => {
                    if(successResponse && successResponse.data.code === 200) {
                        _this.pictures = successResponse.data.pictures
                    }
                })
            },
            closeMark(){
                this.todoTask = ''
                this.ifTodo = false
                this.pictures = []
            },
            withdrawTask(taskname) {
                var _this = this
                this.$axios.post('/withdrawtask', {
                    taskname: taskname
                })
                .then(successResponse => {
                    if(successResponse && successResponse.data.code === 200){
                        this.$message.success('取消成功')
                        this.getTodoTasks()
                    }
                })
            },
            bindCheckBox(){
                console.log('bindcheckbox')
                console.log(this.checkList)
                if(this.checkList.length > 1){
                    this.checkList.splice(0,1)
                }
            },
            gotoMark(){
                this.$message.warning('去 标 注 ！')
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
