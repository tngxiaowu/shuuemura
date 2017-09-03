import Vue from 'vue'
import Router from 'vue-router'
import Index from './../views/index.vue'
import ItemDetail from './../views/itemdetail.vue'

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
    }
  ]
})
