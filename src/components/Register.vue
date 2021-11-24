<template>
    <body id="poster">
        <el-alert v-show="alertVisible" :title="errormsg" type="error" center show-icon :closable="false"></el-alert>
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
                errormsg: '',
                alertVisible: false
            }
        },
        methods: {
            register() {
                var _this = this
                this.$axios
                    .post('/register', {
                        username: this.registerForm.username,
                        password: this.registerForm.password,
                        email: this.registerForm.email
                    })
                    .then(successResponse => {
                        if(successResponse.data.code === 200){
                            this.$alert('注册成功，请登录', '提示', {
                                confirmButtonText: '确定'
                            })
                            this.$router.replace({path: '/login'})
                        }else if(successResponse.data.code === 401){
                            this.errormsg = '用户名已存在'
                            this.alertVisible = true
                            // console.log("用户名已存在");
                        }else if(successResponse.data.code === 402){
                            this.errormsg = '邮箱已被使用'
                            this.alertVisible = true
                            // console.log("邮箱已被使用");
                        }
                    })
                    .catch(failResponse => {
                        console.log(failResponse);
                    })
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