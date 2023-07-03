// import Vue from 'vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import mock from './api/mock.js'
// import Cookie from 'js-cookie'
import VueLazyload from 'vue-lazyload' //vue-lazyload 插件

Vue.config.productionTip = false
Vue.use(VueLazyload) //图片懒加载

router.beforeEach((to, from, next) => {
  // const token = Cookie.get('token')
  const token = localStorage.getItem('token')
  if (!token && to.name !== 'login') {
    next('login')
  } else if (token && to.name === 'login') {
    next('home')
  } else {
    next()
  }
})

new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
