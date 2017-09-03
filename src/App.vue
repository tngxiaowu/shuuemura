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
import './common/css/common.css'
import LastNews from './components/last-news.vue'
import MyHeader from './components/my-header.vue'
import Tab from './components/tab/tab.vue'
import LogForm from './components/LogForm/LogForm.vue'
import MyFooter from './components/myfooter/my-footer.vue'
import MadolBox from './components/Madol-Box/Modal-Box.vue'
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


