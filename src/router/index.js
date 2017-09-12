import Vue from 'vue'
import Router from 'vue-router'
import Index from './../views/index.vue'
import ItemDetail from './../views/itemdetail.vue'
import Welcome from './../views/welcome.vue'
import MyAccount from './../views/myaccount/index.vue'
import Profileindex from './../views/myaccount/Profileindex.vue'
import MyProfile from './../views/myaccount/MyProfile.vue'
import OrderHistory from './../views/myaccount/OrderHistory.vue'
import Subscription from './../views/myaccount/Subscription.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
          path: '/',
          component: Index
    },
    {
          path: '/itemdetail',
          component: ItemDetail
    },
    {
          path:'/welcome',
          component: Welcome
    },
    {
          path:'/myaccount',
          redirect:'/myaccount/Profileindex',
          component:MyAccount,
          children:[
          {
            path:'Profileindex',
            component:Profileindex
            
          },
          {
            path:'MyProfile',
            component:MyProfile
            
          },
          {
            path:'OrderHistory',
            component:OrderHistory
          },
          {
            path:'Subscription',
            component:Subscription
            
          }
          ]

    }
  ]
})
