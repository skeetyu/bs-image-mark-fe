<template>
    <el-menu
        class="sidemenu"
        :default-active="$route.path"
        router
        active-text-color="coral">
        <el-menu-item v-for="(item,i) in sideList" :key="i" :index="item.name" :class="item.icon">
            {{ item.sideItem }}
        </el-menu-item>
        <el-menu-item>
            <el-upload 
                action="http://localhost:8080/api/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="handleSuccess"
                :before-upload="beforeUpload"
                multiple
                :with-credentials='true'
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button type="primary" plain size="mini" class="el-icon-upload" v-on:click="upload">
                图片上传
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
                    {name: '/graph', sideItem: '所有图片', icon: 'el-icon-tickets'},
                    {name: '/graph/unpublished', sideItem: '未发布的', icon: 'el-icon-dish'}
                ],
                fileList: [],
                url: ''
            }
        },
        methods: {
            upload(){
                console.log("hello")
            },
            beforeUpload(file) {
                const isJPG = file.type === 'image/jpeg'
                const isPNG = file.type === 'image/png'
                const isLt1M = file.size / 1024 / 1024 < 1

                if (!isJPG && !isPNG) {
                    this.$message.error('Avatar picture must be JPG or PNG format!')
                }
                if (!isLt1M) {
                    this.$message.error('Avatar picture size can not exceed 1MB!')
                }
                return (isJPG || isPNG) && isLt1M
            },
            handleRemove (file, fileList) {
            },
            handlePreview (file) {
            },
            handleExceed (files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
            },
            beforeRemove (file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`)
            },
            handleSuccess (response) {
                console.log(response);
                // this.url = response
                // this.$emit('onUpload')
                this.$message.success('上传成功')
            },
            clear () {
                // this.$refs.upload.clearFiles()
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

