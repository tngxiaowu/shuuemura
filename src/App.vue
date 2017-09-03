<template>
  <div id="app">
    <last-news></last-news>
    <my-header @log-on='login'></my-header>
   <!--  <tab></tab> -->
    <router-view></router-view>
    <my-footer></my-footer>

  <!--  登录组件 -->
   <log-form v-if='showLogform'
   >
   </log-form>

  <!-- 模态框组件 -->
   <madol-box v-if='showMadolBox'>
     
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
export default {
  name: 'app',
  data(){
    return{
      showLogform:false,
      showMadolBox: false,
    }
  },
  components:{
    MyHeader,
    Tab,
    LastNews,
    LogForm,
    MyFooter,
    MadolBox
  },
  methods:{
    login(){
      this.showLogform = true;
    }
  }
}
</script>


