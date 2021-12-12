<template>
    <el-menu
        class="sidemenu"
        :default-active="$route.path"
        router
        active-text-color="coral">
        <el-menu-item v-for="(item,i) in sideList" :key="i" :index="item.name" :class="item.icon">
            {{ item.sideItem }}
        </el-menu-item>
        <el-menu-item></el-menu-item>
        <el-menu-item>
            <el-upload 
                action="http://localhost:8080/api/uploadpictures"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="handleSuccess"
                :before-upload="beforeUploadPictures"
                multiple
                :with-credentials='true'
                :limit="3"
                :on-exceed="handleExceedPictures"
                :file-list="fileList">
                <el-button type="primary" plain size="mini" class="el-icon-upload">
                图片上传
                </el-button>
            </el-upload>

            <el-upload 
                action="http://localhost:8080/api/uploadvideo"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="handleSuccess"
                :before-upload="beforeUploadVideo"
                :with-credentials='true'
                :file-list="fileList">
                <el-button type="primary" plain size="mini" class="el-icon-video-camera-solid">
                视频上传
                </el-button>
            </el-upload>
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: 'SideMenu',
        data(){
            return {
                sideList: [
                    {name: '/graph', sideItem: '我的图片', icon: 'el-icon-picture-outline'}
                ],
                fileList: [],
                url: ''
            }
        },
        methods: {
            // upload(){
            // },
            beforeUploadPictures(file) {
                const isJPG = file.type === 'image/jpeg'
                const isPNG = file.type === 'image/png'
                const isLt1M = file.size / 1024 / 1024 < 5

                if (!isJPG && !isPNG) {
                    this.$message.error('上传图片必须为JPG或PNG格式！')
                }
                if (!isLt1M) {
                    this.$message.error('上传图片大小不得超过1MB！')
                }
                return (isJPG || isPNG) && isLt1M
            },
            beforeUploadVideo(file){
                const isMP4 = file.type === 'video/mp4'
                const isLt50M = file.size / 1024/ 1024 < 50

                if(!isMP4){
                    this.$message.error('上传视频必须为MP4格式！')
                }
                if(!isLt50M){
                    this.$message.error('上传视频大小不得超过50MB！')
                }
                return isMP4 && isLt50M
            },
            handleRemove (file, fileList) {
            },
            handlePreview (file) {
            },
            handleExceedPictures (files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
            },
            beforeRemove (file, fileList) {
                // return this.$confirm(`确定移除 ${file.name}？`)
            },
            handleSuccess (response) {
                if(response.code === 200){
                    this.$message.success('上传成功！请刷新[我的图片]进行查看')
                }else if(response.code === 201){
                    this.$message.success('解析视频提取图片成功！请选择要上传的图片')
                    console.log(response.graphs)
                    this.$router.replace({name: 'Video', params: {graphs: response.graphs}})
                }else{
                    this.$message.error('上传失败')
                }
            },
            clear () {
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
</style>

