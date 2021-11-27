import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'

// 设置反向代理，前端请求默认发送到 http://localhost:8080/api
// var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8080/api'
axios.defaults.withCredentials = true
// 全局注册，之后可在其它组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
 // if (store.state.user.username && to.path.startsWith('/user')) {
 //   getUser(store)
 // }
  // // 已登录状态下访问 login 页面直接跳转到后台首页
  // if (store.state.user.username && to.path.startsWith('/login')) {
  //   next({
  //     path: 'user'
  //   })
  // }
  if(to.meta.requireAuth){
    if(store.state.user.username){
      axios.get('/authentication').then(resp => {
        if(resp) next()
      })
    }else{
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  }else{
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#cpp')
