<template>
    <div id="main">
        <div id="maxbox">
            <h1>LOGIN</h1>
            <div class="inputbox">
                <div class="inputText">
                    <input type="text" id="user" v-model="loginForm.username" placeholder="用户名">
                </div>
                <div class="inputText">
                    <input type="password" id="password" v-model="loginForm.password" placeholder="密码">
                </div>
                <span style="display: block; color: white;" id='msg'></span>
                <input class="inputButton" @click="login" type="button" value="登录">
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "login",
        data(){
            return {
                loginForm: {
                    username: '',
                    password: ''
                }
            }
        },
        methods:{
            login () {
                let _this = this;
                if (this.loginForm.username === '' || this.loginForm.password === '') {
                    alert('账号或密码不能为空');
                } else {
                    if(this.loginForm.username ==='admin'&&this.loginForm.password === 'admin'){
                        sessionStorage.setItem('token',this.loginForm.token)
                        alert('登录成功');
                        this.$router.push('/home')
                    }else{
                        alert('账号或密码错误');
                    }
                }
            }
        }
    }
</script>

<style scoped>
@import "../assets/css/style.css";
    #main{
        background: url("../assets/img/login.jpg");
        background-size: 100% 100%;
        height: 100%;
        position: fixed;
        width: 100%
    }
</style>
