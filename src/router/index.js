// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import User from '../views/User.vue'
// import Mall from '../views/Mall.vue'
// import PageOne from '../views/PageOne.vue'
// import PageTwo from '../views/PageTwo.vue'

const routes = [
  {
    path: '/',
    component: () => import('../views/Main.vue'),
    name: 'Main',
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/Home.vue')
      } //首页
      // { path: 'user', name: 'user', component: User }, //用户管理
      // { path: 'mall', name: 'mall', component: Mall }, //商品管理
      // { path: 'page1', name: 'page1', component: PageOne }, //页面1
      // { path: 'page2', name: 'page2', component: PageTwo } //页面2
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
    name: 'login'
  }
]

const router = new VueRouter({
  routes
})

export default router
