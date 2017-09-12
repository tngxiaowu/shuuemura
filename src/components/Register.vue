<template>
  <div class="login-box">
    <div>
      <span>邮箱地址：</span>
      <input type="text" name="" placeholder="您的注册邮箱" v-model='registerEmail' @blur="checkEmail()">
      <em v-if='emailFormatError'>电子邮箱格式不正确</em>
      <em v-if='emailExistTip'>邮箱已经注册，请<a href="">登录</a>。</em>
      <em v-if='emailCorrectText'> 可以注册</em>
    </div>
  	<div>
      <span class="password">密码：</span>
      <input type="text" name="" placeholder="您的密码" v-model='registePassword1' @blur="checkPassword1()"> 
      <em v-if='passwordError1'>密码为6-10位</em> 
    </div>
    <div>
      <span class="password">确认密码：</span>
      <input type="text" name="" placeholder="您的密码" v-model='registePassword2' @blur="checkPassword2()"> 
      <em v-if='passwordError2'>密码为6-10位</em> 
       <em v-if='passwordSameError'>两次密码不一致</em> 
    </div>
  	<div>
      <input type="checkbox" name="" @cheked='keppLogin' class="keeplogin small-font-size">
      <span class="small-font-size rember-login-name">我愿意订阅植村秀电子报，及时接收植村秀最新资讯和促销信息。</span> <br>
      <input type="checkbox" name="" @cheked='keppLogin' class="keeplogin small-font-size">
      <span class="small-font-size rember-login-name">我已阅读和了解植村秀官网的使用条款和隐私声明，并且同意接受使用条款。</span> <br>
      <p class="small-font-size">您填写本页面信息，将被视为您同意植村秀（中国）品牌为向您提供更完善的服务和推介，将您的个人信息提供给品牌经销商或联盟企业。</p>
    </div>
  	<div>
       <!--  如果存在密码不符合的情况，禁止注册 -->
      <button class="login-in-btn" @click='register()'

      :class='{"login-in-btn-disable":(!registerEmail.length||!registePassword1.length||!registePassword2.length)||emailExistTip||emailFormatError||passwordError1||passwordError2||passwordSameError}'
      >立即注册 > </button> <br>
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
  name: 'register',
  data(){
  	return{
      registerEmail:'',
      registePassword1:'',
      registePassword2:'',
      emailFormatError: false,
      emailExistTip: false,
  		keepName:false,
      emalErrorText:false,
      emailCorrectText: false,
      passwordError1:false,
      passwordError2:false,
      passwordSameError:false,
      errorPassword: false,
      maxAge:1000*60*60,
  	}
  },
  computed:{
    nickName(){
      return this.$store.state.nickName;  
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
      //传参
      var param = {
        registerEmail: this.registerEmail
      }
      //验证是否通过正则
      if(reg.test(this.registerEmail)){
      //通过发送请求
        axios.get('/users/checkUserEmail',{params:param}).then((response)=>{
          var res = response.data;
          //用户名不存在
          if(res.status == '0'){
            this.emailCorrectText = true;
            this.emailExistTip = false;
            this.emailFormatError = false;
            console.log(res.msg);
          }else{
            //用户名不存在的情形
            if(res.status == '2'){
            this.emailExistTip = true;
            this.emailFormatError = false;
            this.emailCorrectText = false;
            }
          }
        })
      //不通过
      }else{
         this.emailFormatError = true;
         this.emailExistTip = false;
         this.emailCorrectText = false;
      }
    },

    //检查密码函数
    checkPassword1(){
      
      //正则：密码长度6-10位
      var reg = /^.{6,10}$/
      //如果通过
      if(reg.test(this.registePassword1)){
       this.passwordError1 = false;
      }
      //如果没有通过
      else{
         this.passwordError1 = true;
        
      }
    },

    checkPassword2(){
      
      //正则：密码长度6-10位
      var reg = /^.{6,10}$/
      //如果通过
      if(reg.test(this.registePassword1)){
       this.passwordError2 = false;
      }
      //如果没有通过
      else{
         this.passwordError2 = true;
        
      }

       if(this.registePassword1 != this.registePassword2){
        this.passwordSameError = true;
       }
       else{
        this.passwordSameError = false;
       }
    },
    
    //注册后自动登录
    login(){
        //当发送Post请求时，将用户名/密码/cookie设置的长度传给后台
        axios.post('/users/login',{userEmail: this.registerEmail,userPassword: this.registePassword1,maxAge: this.maxAge}).then((response)=>{
          var res = response.data;
          if(res.status == '0'){
            this.$store.commit('updateUserInfo',res.result)
            console.log(res.msg);
            this.$emit('log-success');
          }else{
            console.log(res.msg);
          }
        })
      },



    //注册
    register(){
        //当发送Post请求时，将用户名/密码/cookie设置的长度传给后台
        axios.post('/users/register',{registerEmail: this.registerEmail,registePassword: this.registePassword1}).then((response)=>{
          var res = response.data;
          if(res.status == '0'){
            //注册成功后 
            console.log(res.msg);
            //模态框消失
            this.$emit('reg-success')
            //进行登录
            this.login();
            //跳转到欢迎注册页
            this.$router.push({path:'/welcome',query:{'status':1,'email':this.registerEmail}})
          }else{
           
          }
        })
      }
  },


  mounted:function(){

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
		width: 563px;
    padding: 20px;
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

