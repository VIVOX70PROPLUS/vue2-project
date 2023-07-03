// import Cookie from 'js-cookie'

export default {
  state: {
    isCollapse: false, //控制左侧菜单的展开与收起
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home'
      }
    ], //面包屑数据
    menu: []
  },
  mutations: {
    //修改菜单展开收起的方法
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    //更新面包屑数据
    selectMenu(state, val) {
      if (val.name !== 'home') {
        const index = state.tabsList.findIndex(item => item.name === val.name)
        if (index === -1) {
          state.tabsList.push(val)
        }
      }
    },
    //删除tag数据
    deleteMenu(state, index) {
      state.tabsList.splice(index, 1)
    },
    //设置menu的数据
    setMenu(state, val) {
      state.menu = val
      // Cookie.set('menu', JSON.stringify(val))
      localStorage.setItem('menu', JSON.stringify(val))
    },
    //动态注册路由？？
    addMenu(state, router) {
      //判断缓存中是否有数据
      // if (!Cookie.get('menu')) return
      if (!localStorage.getItem('menu')) return
      // const menu = JSON.parse(Cookie.get('menu'))
      const menu = JSON.parse(localStorage.getItem('menu'))
      state.menu = menu
      //组装动态路由的数据
      const menuArray = []
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`../views/${item.url}`)
            return item
          })
          menuArray.push(...item.children)
        } else {
          item.component = () => import(`../views/${item.url}`)
          menuArray.push(item)
        }
      })
      //路由的动态添加
      menuArray.forEach(item => {
        //添加一条新的路由规则记录作为现有路由的子路由。如果该路由规则有 name，并且已经存在一个与之相同的名字，则会覆盖它。
        //addRoute(parentName: string, route: RouteConfig): () => void
        router.addRoute('Main', item)
      })
    }
  }
}
