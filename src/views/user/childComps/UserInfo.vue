<template>
  <div id="user-info">
    <div class="left">
      <img src="../../../assets/img/user/avatar.svg" alt="" width="60">
    </div>
<div class="text left">
  <div @click="loginbtn">登录/注册</div>
  <div name="user-phone">暂无绑定手机号</div>
</div>

  </div>
</template>

<script>
	export default {
		name: "UserInfo",
    data(){
		  return{
		    name:null
      }
    },
    created() {
    },
    methods:{
		  loginbtn(){
		    this.$router.push('/login')
      }

    }
	}
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    height: 80px;
    padding: 15px;
    margin-top: -5px;
    box-shadow:-10px 0 rgba(0,0,0,.5);
  }

  #user-info .privateImage-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }

  .left {
    float: left;
  }
  .text{
    margin: 10px auto;
  }




</style>
