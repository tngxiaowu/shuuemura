<template>
  <div class="navheader">
   	<div class="logo">
   		<a href="##">
   			<img src="./../../static/img/base/logo.png" height="55" width="250">	
   		</a>
   	</div>

   	<div class="nav-right">
   		<ul>
   			<li class="maggize">
   				<a href="##">
   					订阅电子杂志	
   				</a>
   				<!-- <div class="subcribe">
   					获取植秀村最新资讯<br>
   					<input type="text" name=""><br>
   						<button>提交</button>
   					
   				</div> -->
   				
   			</li>
   			<li class="login">
   				<a href="##" @click='getLogin'>
   					登录	
   				</a>
   			</li>
   			<li class="style">
   				|
   			</li>
   			<li class="register">
   				<a href="">
   					注册	
   				</a>
   				
   			</li>
   			<li>
   				<span class="shoppingbag">
   					<img src="./../../static/img/index/shopping-bag.jpg" height="14" width="13">
   				</span>
   				<a href="">
   					我的购物袋 （ {{ shoppingBag }} ）
   				</a>
   				
   			</li>
   		</ul>
   	</div>
  </div>
</template>

<script>
export default {
  name: 'navhader',
  data(){
  	return{
  		shoppingBag:1
  	}
  },
  methods:{
  	getLogin(){
  		this.$emit('log-on');
  	}
  }
}
</script>

<style scoped>
	a{
		text-decoration: none;
		color: #999999;
	}
	.logo a{
		display: block;
		height: 55px;
	}
	.navheader{
		width: 1280px;
		height: 90px;
		background-color: #000000;
		margin: 0 auto;
		font-size: 14px;
		font-weight: bold;
	}

	.logo{
		float: left;
		margin-top:34px;
		margin-left: 40px; 
	}

	.nav-right{
		float: right;
		
	}

	.nav-right ul {
		margin-right: 30px;		

	}

	.nav-right ul li{
		list-style: none;
		float: left;
		color: #999999;
		margin-top: 16px;
		padding-top: 20px;
		padding-bottom: 20px;
		margin-left: 20px;
		padding-left: 10px;
		padding-right: 10px;

	}
	
	.nav-right ul li a:hover{
		text-decoration: underline;
		color: #ffffff;

	}

	.nav-right ul .maggize:hover{
		
		background-color: #212121;
		color: #999999;
	}

	.nav-right ul .maggize a:hover{
		text-decoration: none;
		color: #999999;

	}

	.nav-right ul .login{
		margin-right: 2px;
		padding-left: 0px;
		padding-right: 0px;
	}



	.nav-right ul .register{
		margin-left:2px;
		padding-left: 0px;
		padding-right: 0px;
	}

	.nav-right ul .style{
		margin-left:   0px;
		margin-right:  0px;
		

	}

	.shoppingbag{
		display: inline-block;
		margin-right: 8px;
	}

	.subcribe{
		position: absolute;
		top: 138px;
		right: 130px;
		background-color: #000000;
		text-align: left;
		width: 180px;
		height: 80px;
		padding-left: 10px;
	}

	.subcribe button{
		
		background-color: #000000;
		color: #ffffff;
		border: none;
	}


</style>

