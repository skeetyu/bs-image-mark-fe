<template>
    <body id="poster">
        <el-form class="login-container" laber-position="left" labe-width="0px">
            <h2 class="welcome-title">欢迎来到您的图像标注基地</h2>
            <h3 class="login-title">用户登录</h3>
            <el-form-item>
                <el-input type="text" v-model="loginForm.username" 
                    auto-complete="off" placeholder="用户名">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" v-model="loginForm.password" 
                    auto-complete="off" placeholder="密码"
                    :show-password='true' minlength="6">
                </el-input>
            </el-form-item>
            <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 40%; background: #3892db; 
                    border:none" round v-on:click="login">登录</el-button>
            </el-form-item>
            <router-link to="/register">没有账号？点此注册</router-link>
        </el-form>
    </body>
</template>


<script>
    export default {
        name: 'Login',
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            login() {
                var _this = this
                this.$axios.post('/login', {
                        username: this.loginForm.username,
                        password: this.loginForm.password
                })
                .then(successResponse => {
                    if(successResponse.data.code === 200){
                        this.$message.success('登录成功！')
                        _this.$store.commit('login', _this.loginForm)
                        var path = this.$route.query.redirect
                        this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
                    }else if(successResponse.data.code === 400){
                        this.$message.error('用户名或密码错误！')
                        this.loginForm.username = ''
                        this.loginForm.password = ''
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
        padding: 20px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .login-title {
        margin: 0px auto 20px auto;
        text-align: center;
        color: #505458;
    }
    .welcome-title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #6f99c4;
    }
</style>