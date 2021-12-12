<template>
    <div class="workbench">
        <el-container>
            <el-header>
                <el-row style="left:74px; top:10px; height:60px;">
                    <el-button type="primary" size="small" style="float:left" v-on:click="clearNotation" v-if="role==0">清空标注</el-button>
                    <el-button type="primary" size="small" style="float:left" v-on:click="clearNotation" v-if="role==1" disabled>清空标注</el-button>
                    <el-button type="primary" size="small" style="float:left" v-on:click="withdrawNotation" v-if="role==0">撤回上一条标注</el-button>
                    <el-button type="primary" size="small" style="float:left" v-on:click="withdrawNotation" v-if="role==1" disabled>撤回上一条标注</el-button>
                    <el-button type="primary" size="small" style="float:left" v-on:click="isDrawing=true" v-if="isDrawing==false && role==0">绘制矩形</el-button>
                    <el-button type="primary" size="small" style="float:left" v-on:click="isDrawing=true" v-if="isDrawing==false && role==1" disabled>绘制矩形</el-button>
                    <el-button type="info" size="small" style="float:left" v-on:click="isDrawing=false" v-if="isDrawing==true">取消绘制</el-button>
                    
                    <el-select v-model="tag" size="small" filterable allow-create default-first-option placeholder="请选择标注集的标签(可多选,可手动输入)" 
                        multiple style="float:left; margin-left:10px; width:280px;" v-if="role==0">
                        <el-option v-for="item in tagoptions" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                    <el-select v-model="tag" size="small" filterable allow-create default-first-option placeholder="请选择标注集的标签(可多选,可手动输入)" 
                        multiple style="float:left; margin-left:10px; width:280px;" v-if="role==1" disabled>
                        <el-option v-for="item in tagoptions" :key="item" :label="item" :value="item"></el-option>
                    </el-select>

                    <el-input v-model="description" :autosize="{minRows:1, maxRows:2}" type="textarea" placeholder="请输入对标注集的描述：" 
                        style="float:left; margin-left:10px; width:300px" v-if="role==0"/>
                    <el-input v-model="description" :autosize="{minRows:1, maxRows:2}" type="textarea" placeholder="请输入对标注集的描述：" 
                        style="float:left; margin-left:10px; width:300px" v-if="role==1" disabled/>
                    <el-button type="primary" size="small" style="float:left; margin-left:10px" v-on:click="submitMark" v-if="role==0">提交</el-button>
                    
                    <el-select v-model="annotationtype" size="small" default-first-option placeholder="请选择导出数据集格式" 
                        style="float:left; margin-left:10px; width:180px;" v-if="role==1">
                        <el-option label="PASCAL VOC(.xml)" value="PASCAL VOC(.xml)"></el-option>
                        <el-option label="COCO(.txt)" value="COCO(.txt)"></el-option>
                    </el-select>
                    <el-button type="primary" size="small" style="float:left; margin-left:5px" v-on:click="exportMark" v-if="role==1">导出</el-button>
                </el-row>
            </el-header>
            <el-main>
                <canvas 
                    id="canvas"
                    @mousedown="canvasDown($event)"
                    @mouseup="canvasUp($event)"
                    @mousemove="canvasMove($event)">
                </canvas>
            </el-main>
        </el-container>

        <el-dialog :visible.sync="dialogInputNotationNameVisible" title="请输入标注的名称" width="400px" top="180px" append-to-body>
            <el-input type="text" v-model="notationname"></el-input>
            <template #footer>
            <span class="dialog-footer"> 
                <el-button @click="dialogInputNotationNameVisible = false">取消</el-button>
                <el-button type="primary" v-on:click="pushNotation">确认</el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'Workbench',
        data () {
            return {
                task: '',
                state: 1,
                role: 0,

                img: new Image(),
                graph: '',
                path: '',
                imgUrl: '',

                context: {},
                // lineWidth: 2,
                moving: false,
                rectPos: {
                    x: 0,
                    y: 0,
                    nx: 0,
                    ny: 0,
                },
                size: {
                    w: 0,
                    h: 0,
                },
                isDrawing: false,

                dialogInputNotationNameVisible: false,
                drawPos: {
                    x: 0,
                    y: 0,
                    nx: 0,
                    ny: 0,
                },
                notationname: '',
                notation: [],
                notationstring: '',
                tagoptions: ['自然', '人物', '建筑', "动漫"],
                tag: [],
                tagstring: '',
                description: '',
                annotationtype: []
            }
        },
        mounted() {
            if(this.$route.params.graph){
                this.graph = this.$route.params.graph[0]
                this.task = this.$route.params.task
                this.role = this.$route.params.ifMarked
                this.$axios.post('/getmarkgraph', {
                    taskname: this.task,
                    graphname: this.graph
                })
                .then(successResponse => {
                    if(successResponse.data.code === 200){
                        this.path = successResponse.data.path
                        this.state = successResponse.data.state
                        this.notationstring = successResponse.data.notation
                        this.tagstring = successResponse.data.tag
                        this.description = successResponse.data.description
                        this.notation = this.notationstring.split(',')
                        this.tag = this.tagstring.split(',')
                    }else if(successResponse.data.code === 201){
                        this.path = successResponse.data.path
                        this.state = successResponse.data.state
                    }
                    this.imgUrl = require('../../assets/upload/' + this.path)
                    this.img.src = this.imgUrl
                    this.img.onload = this.initDraw
                })
            }else{
                this.$message.warning('请前往【我的待办】中选择要标注的图片！')
            }
        },
        methods: {
            initDraw(){
                const canvas = document.getElementById('canvas')
                this.context = canvas.getContext('2d')

                canvas.width = 1040
                canvas.height = 560
                let kw = canvas.width / this.img.width
                let kh = canvas.height / this.img.height
                let k = kw < kh ? kw : kh
                this.size.w= this.img.width * k
                this.size.h = this.img.height * k

                this.context.lineWidth = 2
                this.context.strokeStyle = "red"
                this.context.fillStyle="yellow";
                this.context.font = "20px Arial"
                this.drawNotation()
            },
            canvasDown(e) {
                if(this.isDrawing){
                    this.moving = true
                    const { target } = e
                    const canvasX = e.clientX - target.offsetLeft - 101
                    const canvasY = e.clientY - target.offsetTop - 80
                    this.rectPos.x = canvasX
                    this.rectPos.y = canvasY
                    this.context.beginPath()
                }
            },
            canvasMove(e) {
                if(this.isDrawing){
                    if (this.moving) {
                        this.drawNotation()
                        const { target } = e
                        this.rectPos.nx = e.clientX - target.offsetLeft - 101
                        this.rectPos.ny = e.clientY - target.offsetTop - 80
                        this.context.strokeRect(this.rectPos.x, this.rectPos.y, this.rectPos.nx-this.rectPos.x, this.rectPos.ny-this.rectPos.y)
                    }
                }
            },
            canvasUp(e){
                if(this.isDrawing){
                    if (this.moving) {
                        const { target } = e
                        this.rectPos.nx = e.clientX - target.offsetLeft - 101
                        this.rectPos.ny = e.clientY - target.offsetTop - 80
                        this.drawNotation()
                        this.moving = false
                        this.isDrawing = false
                        this.dialogInputNotationNameVisible = true
                    }
                }
            },
            drawNotation(){
                this.context.clearRect(0, 0, canvas.width, canvas.height)
                this.context.drawImage(this.img, 0, 0, this.size.w, this.size.h)
                for(let i = 0; i * 5 < this.notation.length; i++){
                    this.drawPos.x = parseInt(this.notation[i*5])
                    this.drawPos.y = parseInt(this.notation[i*5+1])
                    this.drawPos.nx = parseInt(this.notation[i*5+2])
                    this.drawPos.ny = parseInt(this.notation[i*5+3])
                    this.notationname = this.notation[i*5+4]
                    this.context.strokeRect(this.drawPos.x, this.drawPos.y, this.drawPos.nx-this.drawPos.x, this.drawPos.ny-this.drawPos.y)
                    this.context.fillText(this.notationname, (this.drawPos.x + this.drawPos.nx) / 2 - 10, (this.drawPos.y + this.drawPos.ny) / 2 + 10)
                }
            },
            clearNotation(){
                this.notation = []
                this.drawNotation()
            },
            withdrawNotation(){
                this.notation.pop()
                this.notation.pop()
                this.notation.pop()
                this.notation.pop()
                this.notation.pop()
                this.drawNotation()
            },
            pushNotation(){
                this.notation.push(this.rectPos.x)
                this.notation.push(this.rectPos.y)
                this.notation.push(this.rectPos.nx)
                this.notation.push(this.rectPos.ny)
                this.notation.push(this.notationname)
                this.dialogInputNotationNameVisible = false
                this.drawNotation()
            },
            submitMark(){
                this.notationstring = this.notation.toString()
                this.tagstring = this.tag.toString()
                this.$axios.post('/submitmark', {
                    state: this.state,
                    task: this.task,
                    graph: this.graph,
                    tag: this.tagstring,
                    notation: this.notationstring,
                    description: this.description
                })
                .then(successResponse => {
                    if(successResponse.data.code === 200){
                        this.$message.success('提交标注成功！')
                    }else{
                        this.$message.error('提交失败！')
                    }
                })
            },
            exportMark(){
                if(this.notation.length !== 0){
                    this.$axios.post('/exportmark', {
                        task: this.task,
                        graph: this.graph,
                        path: this.path,
                        width: this.img.width,
                        height: this.img.height,
                        type: this.annotationtype
                    })
                    .then(successResponse => {
                        if(successResponse.data.code === 200){
                            this.$message.success('导出成功！')
                        }else{
                            this.$message.error('导出失败！')
                        }
                    })
                }else{
                    this.$message.warning('当前还没有数据集可导出')
                }
            }
        }
    }
</script>

<style scoped>
    .workbench{
        position: fixed;
        left: 100px;
        top: 80px;
        width: 80%;
        height: 85%;
    }

    .input-area{
        position: fixed;
        right: 240px;
        top: 160px;
        width: 240px;
        border: 5px solid aliceblue;
        /* color:aliceblue */
    }
</style>
