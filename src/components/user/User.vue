<template>
    <el-container>
        <el-main>
            <el-descriptions title="个人信息" 
                direction="horizontal" :column="1" border class="table">
                <el-descriptions-item label="用户ID">bx319000100{{uid}}</el-descriptions-item>
                <el-descriptions-item label="用户昵称">{{username}}</el-descriptions-item>
                <el-descriptions-item label="密码">
                    <el-button type="text" @click="dialogEditPasswordVisible=true">修改密码</el-button>
                        <el-dialog :visible.sync="dialogEditPasswordVisible" title="修改密码" width="400px" top="180px">
                            <el-form>
                                <el-form-item>
                                    <el-input type="text" v-model="password.oldpass" 
                                        auto-complete="off" placeholder="旧密码">
                                    </el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input type="password" v-model="password.newpass" 
                                        auto-complete="off" placeholder="新密码"
                                        :show-password='true' minlength="6">
                                    </el-input>
                                </el-form-item>
                                <!-- <el-form-item>
                                    <el-input type="password" v-model="password.newpass" 
                                        auto-complete="off" placeholder="再次确认新密码"
                                        :show-password='true' minlength="6">
                                    </el-input>
                                </el-form-item> -->
                            </el-form>
                            <template #footer>
                            <span class="dialog-footer"> 
                                <el-button @click="dialogEditPasswordVisible = false">Cancel</el-button>
                                <el-button type="primary" v-on:click="editpassword">Confirm</el-button>
                            </span>
                            </template>
                        </el-dialog>
                </el-descriptions-item>
                <el-descriptions-item label="手机号">尚未填写</el-descriptions-item>
                <el-descriptions-item label="邮箱">{{email}}</el-descriptions-item>
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
                            <span class="dialog-footer"> 
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
                    // repass: ''
                }
                // ,
                // userinfo: {
                //     name: 'kooriookami',
                //     id: '1',
                //     phone: '19883146907',
                //     email: '3190104803@zju.edu.cn',
                //     profile: '这个家伙很懒，什么都没留下',
                //     address: 'Zhejiang University, Xihu District, Hangzhou City, Zhejiang Province'
                // }
            }
        },
        methods: {
            logout() {
                var _this = this
                this.$axios
                    .post('/logout')
                    .then(successResponse => {
                        if(successResponse.data.code === 200){
                            _this.$store.commit('logout')
                            _this.$router.replace('/login')
                        }
                    })
                    .catch(failResponse => {
                        console.log(failResponse); 
                    })
            },
            unsubscribe() {
                var _this = this
                this.$axios
                    .post('/unsubscribe')
                    .then(successResponse => {
                        if(successResponse.data.code === 200){
                            this.$alert('注销成功', '提示', {
                                confirmButtonText: '确定'
                            })
                            _this.$store.commit('logout')
                            _this.$router.replace('/login')
                        }
                    })
                    .catch(failResponse => {
                        console.log(failResponse); 
                    })
            },
            editpassword(){
                var _this = this
                _this.dialogEditPasswordVisible = false
                this.$axios
                    .post('/editpassword', {
                        oldpassword: this.password.oldpass,
                        newpassword: this.password.newpass,
                    })
                    .then(successResponse => {
                        if(successResponse.data.code === 200){
                            this.$alert('修改成功', '提示', {
                                confirmButtonText: '确定'
                            })
                        }else if(successResponse.data.code === 400){
                            this.$alert('修改失败（可能是旧密码错误）', '提示', {
                                confirmButtonText: '确定'
                            })
                        }
                    })
                    .catch(failResponse => {
                        console.log(failResponse); 
                    })
            }
        },
        computed: {
            username(){
                return this.$store.state.userinfo.name
            },
            uid(){
                return this.$store.state.userinfo.id
            },
            email(){
                return this.$store.state.userinfo.email
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