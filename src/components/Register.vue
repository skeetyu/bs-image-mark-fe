<template>
    <body id="poster">
        <el-form class="login-container" laber-position="left" labe-width="0px">
            <h3 class="login-title">用户注册</h3>
            <el-form-item>
                <el-input type="text" v-model="registerForm.username" 
                    auto-complete="off" placeholder="用户名" required>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" v-model="registerForm.password" 
                    auto-complete="off" placeholder="密码" 
                    :show-password='true' minlength="6" required>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="email" v-model="registerForm.email" 
                    auto-complete="off" placeholder="邮箱" required>
                </el-input>
            </el-form-item>
            <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 40%; background: #3892db; 
                    border:none" round v-on:click="register">注册</el-button>
            </el-form-item>
            <router-link to="/login">已有账号？点此登录</router-link>
        </el-form>
    </body>
</template>


<script>
    export default {
        name: 'Register',
        data() {
            return {
                registerForm: {
                    username: '',
                    password: '',
                    email: ''
                },
            }
        },
        methods: {
            register() {
                var _this = this
                var uPattern = /^[a-zA-Z0-9]{6,16}$/;
                var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[a-zA-Z]).*$/
                var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
                var flag = true
                if(!uPattern.test(this.registerForm.username)){
                    this.$message.error('用户名须为6-16位，包含字母或数字')
                    this.registerForm.username = ''
                    flag = false
                }
                if(flag && !pPattern.test(this.registerForm.password)){
                    this.$message.error('密码长度至少为6位，且必须同时包含字母与数字')
                    this.registerForm.password = ''
                    flag = false
                }
                if(flag && !ePattern.test(this.registerForm.email)){
                    this.$message.error('邮箱格式不正确')
                    this.registerForm.email = ''
                    flag = false
                }
                if(flag){
                    this.$axios.post('/register', {
                        username: this.registerForm.username,
                        password: this.registerForm.password,
                        email: this.registerForm.email
                    })
                    .then(successResponse => {
                        if(successResponse.data.code === 200){
                            this.$message.success('注册成功！')
                            // this.$router.replace({path: '/login'})
                        }else if(successResponse.data.code === 401){
                            this.$message.error('用户名已存在！')
                            this.registerForm.username = ''
                        }else if(successResponse.data.code === 402){
                            this.$message.error('邮箱已存在！')
                            this.registerForm.email = ''
                        }
                    })
                    .catch(failResponse => {
                        console.log(failResponse);
                    })
                }
            }
        }
    }
    
</script>

<style>
    #poster {
        background: url("../assets/login4.jpg") no-repeat;
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }
    body{
        margin: 0px;
    }
    .login-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 150px auto;
        width: 400px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .login-title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
</style>