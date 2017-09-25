<template>
  <div id="app">
    <last-news></last-news>
    <my-header @log-on='login'></my-header>
    <tab></tab>
    <router-view></router-view>
    <my-footer></my-footer>


  <!-- 模态框组件 登录注册组件组件 -->
   <madol-box v-if='showMadolBox' @close-modal-box='closeLogForm()'>
      <div slot='brandHeader' class="brandHeader">
        <h1>
          <img src="./../static/img/base/logo.png" height="55" width="250">  
        </h1>
      </div>
      <div slot='content' class="content">
        <div class="tabOption">
          <span :class='{"selected": showInput == true}'  @click='showInput=true' >老用户登录</span><span 
          :class='{"selected": showInput != true}' 
          @click='showInput=false'>新用户注册</span>
        </div>
        <div class="wrap clearfix">
          <div class="content-left">
          <log-form @log-success='closeLogForm()' v-if='showInput'></log-form>  
          <register @reg-success='closeLogForm()' v-else></register>
        </div>
        <div class="content-right">
         <img src="./../static/img/base/whychoose.jpg" height="232" width="280">
        </div>
          
        </div>
        
        
      </div>
   </madol-box>

  </div>
</template>

<script>
//引入normalize样式
import './common/css/normalize.css'
//公共样式
// import './common/css/common.css'
import LastNews from './components/LastNews.vue'
import MyHeader from './components/MyHeader.vue'
import Tab from './components/Tab.vue'
import LogForm from './components/LogForm.vue'
import MyFooter from './components/MyFooter.vue'
import MadolBox from './components/ModalBox.vue'
import Register from './components/Register.vue'
export default {
  name: 'app',
  data(){
    return{
      showLogform:false,
      showMadolBox: false,
      showInput: true,
      showTest:false
    }
  },


  components:{
    MyHeader,
    Tab,
    LastNews,
    LogForm,
    MyFooter,
    MadolBox,
    Register
  },
  methods:{
    login(){
      this.showMadolBox = true;
    },
    closeLogForm(){
      this.showMadolBox = false;
      

    },
    select(item){

    }

  },
}
</script>

<style scoped>
  .clearfix:after {
      content:".";
      display:block;
      height:0;
      visibility:hidden;
      clear:both;
    }

    .clearfix {
      *zoom:1;
    }

  h1{
    margin: 0px;
    padding-top: 55px;
  }
  .brandHeader{
    width: 945px;
    height: 115px;
    background-color: #000000;
    text-align: center;
  }

  .content{
    margin-top: 45px;
    padding-left: 15px;
  }

  .wrap{

  }

  .tabOption{
    
  }

  .tabOption span{
    
    display: inline-block;
    height: 36px;
    width: 135px;
    
   line-height: 36px;
   font-size: 14px;
   text-align: center;
   border: 1px solid black;
  }
  .selected{
    background-color: black;
    color: white;

  }



  .content-left{
    float: left;
    width: 585px;
    border: 1px solid black;


  }

  .login-box{
    padding-top: 20px;
    
    height: 300px;
    margin-right: 0px;
  }

  .content-right{
    float: right;
    width: 330px;
    height: 500px;

  }
</style>


