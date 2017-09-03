<template>
  <div class="login-box">
  <div>
  	我已经是注册用户
  </div>
  <div>
  	<input type="text" name="" placeholder="您的注册邮箱"><span>立即注册</span><br>
  	<input type="text" name="" placeholder="您的密码"><button>登录</button><br>
  	<input type="checkbox" name="" @cheked='keppLogin' >记住登录名
  </div>
  <div>
  	<span> x </span>
  </div>
  <hr>
  <dir>
  	使用合作网站登录
  </dir>
  </div>
</template>

<script>
export default {
  name: 'login',
  data(){
  	return{
  		keepName:false

  	}
  },
  methods:{
  	login(){
  		this.$emit('log-in')
  	},
  	keppLogin(){
  		this.keepName = !this.keepName;
  	}
  }
  
}
</script>

<style type="text/css">
	.login-box{
		width: 290px;
	}

	.router-link-active{
		color:red;
	}
</style>

