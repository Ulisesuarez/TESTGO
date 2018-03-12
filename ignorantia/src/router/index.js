import Vue from 'vue'
import Router from 'vue-router'
import Header2 from '@/components/Header2'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'header2',
      component: Header2
    }

  ]
})
