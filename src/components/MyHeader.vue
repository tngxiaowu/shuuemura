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
   			</li>
   			<li class="login" v-if='!nickName'>
   				<a href="##" @click='openMoadlBox()'>
   					登录	
   				</a>
   			</li>
   			<li v-if='nickName'> 
   					<a href="##">
   						{{ nickName }} 	
   					</a>
   				</li>
   			<li class="style">
   				|
   			</li>
   			<li class="register" v-if='nickName'>
   				<a @click='turntoPage'>
   					个人中心
   				</a>
   			</li>
   			<li class="register" v-if='!nickName'>
   				<a href="">
   					注册	
   				</a>
   			</li>
   			<li class="style" v-if='nickName'>
   				|
   			</li>
   			<li class="quit" v-if='nickName'>
   				<a @click='logout()'>
   					退出
   				</a>
   			</li>

   			<li>
   				<span class="shoppingbag">
   					<img src="./../../static/img/index/shopping-bag.jpg" height="14" width="13">
   				</span>
          <router-link to='/shopCart'>
            我的购物袋 （ {{ shoppingBag }} ）
          </router-link>
   			</li>

   		</ul>
   	</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'navhader',
  data(){
  	return{
  		shoppingBag:1
  	}
  },
   computed:{
    nickName(){
      return this.$store.state.nickName;  
    }
    
  },
  methods:{
  	openMoadlBox(){
  		this.$emit('log-on');
  	},

    turntoPage(){
      this.$router.push({path:'/myaccount'});
    },
  	//检查是否登录
  	checkLogin(){
      axios.post('/users/checkLogin').then((response)=>{
        var res = response.data;
        if( res.status == '0'){
        	this.$store.commit('updateUserInfo',res.result)
        }else{
        	console.log(res.msg);
        }
      })
    },

    //登出
    logout(){
    	axios.post('/users/logout').then((response)=>{
    		console.log('点击成功');
    		var res = response.data;
    		if(res.status == '0'){
    			console.log(res.result);
    			this.$store.commit('updateUserInfo',res.result)
          location.reload();
    			console.log(res.msg);
    		}else{
    			console.log(res.msg);
    		}
    	})
    }
  },
  
  mounted:function(){
  	this.checkLogin();
  },
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

	.nav-right ul .quit{
		margin-left: 5px;
		padding-left: 5px;
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

