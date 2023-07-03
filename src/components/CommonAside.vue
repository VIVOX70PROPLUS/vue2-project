<template>
  <el-menu :default-active="$route.name"
           class="el-menu-vertical-demo"
           :collapse="isCollapse"
           background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b">
    <h3>{{ isCollapse ? '系统' : '智能手机用户管理系统'}}</h3>
    <el-menu-item v-for="item in noChildren"
                  :key="item.name"
                  :index="item.name"
                  @click="clickMenu(item)">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren"
                :key="item.label"
                :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children"
                          :key="subItem.name">
        <el-menu-item :index="subItem.name"
                      @click="clickMenu(subItem)">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

  </el-menu>

</template>

<script>
// import Cookie from 'js-cookie'
export default {
  data() {
    return {
    }
  },
  methods: {
    //点击菜单
    clickMenu(item) {
      if (this.$route.path !== item.path && !(item.path === '/' && this.$route.path === '/home')) {
        this.$router.push(item.path)
      }
      this.$store.commit('selectMenu', item)
    }
  },
  computed: {
    //没有子菜单
    noChildren() {
      return this.menuData.filter(item => !item.children)
    },
    //有子菜单
    hasChildren() {
      return this.menuData.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    menuData() {
      // return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
      return JSON.parse(localStorage.getItem('menu')) || this.$store.state.tab.menu
    }
  }
}
</script>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border-right: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
