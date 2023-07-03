<template>
  <div class="header-container">
    <div class="l-content">
      <el-button style="margin-right: 20px"
                 icon="el-icon-menu"
                 @click="handleMenu"
                 size="mini"></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator=">">
        <el-breadcrumb-item v-for="item in tags"
                            :key="item.path"
                            :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img class="user"
               alt="用户"
               src="../assets/images/user.png">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>用户中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import Cookie from 'js-cookie'
export default {
  data() {
    return {
    }
  },
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    },
    handleClick(command) {
      if (command === 'cancel') {
        // Cookie.remove('token')
        localStorage.removeItem('token')
        // Cookie.remove('menu')
        localStorage.removeItem('menu')
        this.$router.push('login')
      }
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  }
}
</script>

<style lang="less" scoped>
.header-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .l-content {
    display: flex;
    align-items: center;
    /deep/ .el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: normal;
        color: #666;
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
        }
      }
    }
  }
  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>