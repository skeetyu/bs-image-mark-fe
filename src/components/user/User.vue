<template>
    <el-container>
        <el-main>
            <el-descriptions title="个人信息" 
                direction="horizontal" :column="1" border class="table">
                <el-descriptions-item label="用户ID">bx319000100{{userinfo.id}}</el-descriptions-item>
                <el-descriptions-item label="用户昵称">{{userinfo.name}}</el-descriptions-item>
                <el-descriptions-item label="密码">
                    <el-button type="text" @click="dialogEditPasswordVisible=true">修改密码</el-button>
                        <el-dialog :visible.sync="dialogEditPasswordVisible" title="修改密码" width="400px" top="180px">
                            <el-form>
                                <el-form-item>
                                    <el-input type="password" v-model="password.oldpass" 
                                        auto-complete="off" placeholder="旧密码" :show-password='true'>
                                    </el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input type="password" v-model="password.newpass" 
                                        auto-complete="off" placeholder="新密码"
                                        :show-password='true' minlength="6">
                                    </el-input>
                                </el-form-item>
                            </el-form>
                            <template #footer>
                            <span class="dialog-footer"> 
                                <el-button @click="dialogEditPasswordVisible = false">取消</el-button>
                                <el-button type="primary" v-on:click="editpassword">确认</el-button>
                            </span>
                            </template>
                        </el-dialog>
                </el-descriptions-item>
                <el-descriptions-item label="手机号">尚未填写</el-descriptions-item>
                <el-descriptions-item label="邮箱">{{userinfo.email}}</el-descriptions-item>
                <el-descriptions-item label="地址">
                    <el-tag size="small">Zhejiang University, Xihu District, Hangzhou City, Zhejiang Province</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="个人简介">
                    <el-tag size="small">这个家伙很懒，什么都没留下</el-tag>
                </el-descriptions-item>
            </el-descriptions>
            <br>
            <div class="buttongroup">
                <el-button-group>
                    <el-button type="plain" size="medium" class="button" icon="el-icon-switch-button" v-on:click="logout">登出</el-button>
                    <el-button type="plain" size="medium" class="button" icon="el-icon-remove" @click="unsubscribeVisible=true">注销账号</el-button>
                        <el-dialog :visible.sync="unsubscribeVisible" title="确认注销？" append-to-body width="400px" top="180px">
                            <template #footer>
                            <span> 
                                <el-button @click="unsubscribeVisible = false">Cancel</el-button>
                                <el-button type="primary" v-on:click="unsubscribe">Confirm</el-button>
                            </span>
                            </template>
                        </el-dialog>
                </el-button-group>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: 'UserIndex',
        data(){
            return {
                dialogEditPasswordVisible: false,
                unsubscribeVisible: false,
                password: {
                    oldpass: '',
                    newpass: ''
                },
                userinfo: {
                    name: 'loading ... Please refresh the page',
                    id: '*',
                    email: 'loading ... Please refresh the page',
                }
            }
        },
        mounted: function () {
            this.getUser()
        },
        methods: {
            getUser() {
                var _this = this
                this.$axios.post('/getuser').then(successResponse => {
                    if(successResponse.data.username){
                        this.$message.success('成功刷新用户信息')
                        this.userinfo.name = successResponse.data.username
                        this.userinfo.id = successResponse.data.uid
                        this.userinfo.email = successResponse.data.email
                    }else{
                        this.$message.error('请先登录')
                        this.$router.replace('/login')
                    }
                })
            },
            logout() {
                var _this = this
                this.$axios.post('/logout').then(successResponse => {
                        if(successResponse.data.code === 200){
                            this.$message.success('登出成功')
                            _this.$store.commit('logout')
                            _this.$router.replace('/login')
                        }
                    })
            },
            unsubscribe() {
                var _this = this
                this.$axios.post('/unsubscribe').then(successResponse => {
                        if(successResponse.data.code === 200){
                            this.$message.success('注销成功')
                            _this.$store.commit('logout')
                            _this.$router.replace('/login')
                        }else{
                            this.$message.error('注销失败')
                        }
                    })
            },
            editpassword(){
                var _this = this
                _this.dialogEditPasswordVisible = false
                this.$axios.post('/editpassword', {
                        oldpassword: this.password.oldpass,
                        newpassword: this.password.newpass,
                    }).then(successResponse => {
                        if(successResponse.data.code === 200){
                            this.$message.success('修改成功')
                        }else if(successResponse.data.code === 400){
                            this.$message.error('修改失败（请检查密码输入是否正确')
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    .table{
        margin-top: 20px;
        margin-left: 40px;
        width: 800px;
    }
    .buttongroup{
        position: fixed;
        left: 60px;
    }
</style>