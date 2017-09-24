<template>
  <div class="login-box">
    <div>
      <span>邮箱地址：</span>
      <input type="text" name="" placeholder="您的注册邮箱" v-model='email' @input="checkEmail()">
      <em v-if='emalErrorText'>电子邮箱格式不正确</em>

    </div>
  	<div>
      <span class="password">密码：</span>
      <input type="text" name="" placeholder="您的密码" v-model='password' @input="checkPassword()"> 
      <em v-if='passwordError'>密码为6-10位</em> 
    </div>
  	<div>
      <input type="checkbox" name="" @cheked='keppLogin' class="keeplogin small-font-size">
      <span class="small-font-size rember-login-name">记住登录名</span> <span class="small-font-size forget-password"><a href="">忘记密码</a></span>  
    </div>
  	<div>

      <button class="login-in-btn" @click='login()' :class='{"login-in-btn-disable":(!email.length||!password.length)||(emalErrorText||passwordError)}'>确认登录 > </button> <br>
       <em v-if='errorPassword'>密码错误</em>
    </div>
    
  <!-- <hr> -->
  <!-- <div>
  	使用合作网站登录
  </div> -->
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'login',
  data(){
  	return{
      email:'',
      password:'',
  		keepName:false,
      emalErrorText:false,
      passwordError:false,
      errorPassword: false,
      maxAge:1000*60*60,
  	}
  },
  computed:{
    nickName(){
      return this.$store.state.nickName;  
    },
    result(){
      return (!this.email.length||!this.password.length)||(this.emalErrorText||this.passwordError)
    }

  },
  methods:{
  	keppLogin(){
  		this.keepName = !this.keepName;
  	},

    //检查Email函数
    checkEmail(){
      //邮箱的正则表达式
      var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if(reg.test(this.email)){
        this.emalErrorText = false;
      }else{
        this.emalErrorText = true;
      }
    },

    //检查密码函数
    checkPassword(){
      var reg = /^.{6,10}$/
      if(reg.test(this.password)){
        this.passwordError = false;
      }else{
        this.passwordError = true;
      }
    },


    //登录
    login(){
        if(!this.result){
        //当发送Post请求时，将用户名/密码/cookie设置的长度传给后台
        axios.post('/users/login',{userEmail: this.email,userPassword: this.password,maxAge: this.maxAge}).then((response)=>{
          var res = response.data;
          if(res.status == '0'){
            this.errorPassword = false;
            this.$store.commit('updateUserInfo',res.result)
            this.mergeCartList();
            console.log(res.msg);
            this.$emit('log-success');
            this.$router.push({path:this.$route.fullPath})
          }else{
            this.errorPassword = true;
            console.log(res.msg);
          }
        })
        }
      },

      inputSelected(){
        document.getElementsByClassName("keeplogin")[0].checked = true;
      },

    //合并购物车
  mergeCartList(){
    axios.post('/users/mergeCartList').then((response)=>{
      var res = response.data;
      if(res.status == '0'){
        console.log('合并成功')
        this.$store.commit('updateCartCount',res.result);
      }
    })
  }
  },


  




  mounted(){
    this.inputSelected();
  }
  
}
</script>

<style scoped>
  em{
    font-size: 12px;
  }

  a{
    text-decoration: none;
    color: #000000;
    cursor: pointer;
  }

  .small-font-size{
    font-size: 12px;
  }

  .login-in-btn{
    border: none;
    background-color: #e43d3c;
    color: #ffffff;
    margin-left: 130px;
    cursor: pointer;
  }

  .login-in-btn-disable{
    background-color: #cccccc;
    cursor: default;
  }

  

	.login-box{
		width: 500px;
    padding-left: 20px;
	}

  .login-box>div{
    padding-top: 10px;
    padding-bottom: 10px;
  }



  .login-box>div>span{
    display: inline-block;
    width: 104px;
    text-align: right;
    padding-right: 30px;
  }

  .login-box>div>.rember-login-name{
      width: auto;
  }
  .login-box>div>.forget-password{
      width: auto;
  }

  

  input{
    width: 163px;
  }

  .keeplogin{
    width: 20px;
    margin-left: 130px;
    font-size: 12px;
  }

	.router-link-active{
		color:red;
	}
</style>

