<template>
  <div class="tag">
    <el-tag v-for="tag in tags"
            :key="tag.path"
            :closable="tag.name !== 'home'"
            @click="changeMenu(tag)"
            @close="handleClose(tag)"
            size="small"
            :effect="$route.name === tag.name ? 'dark' : 'plain'">
      {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CommonTag',
  data() {
    return {
    }
  },
  methods: {
    ...mapMutations(['deleteMenu']),
    //点击tag跳转
    changeMenu(tag) {
      if (this.$route.name !== tag.name) {
        this.$router.push({ name: tag.name })
      }
    },
    //点击tag删除键删除后更新面包屑数据和进行跳转
    handleClose(tag) {
      const index = this.tags.findIndex(item => item.name === tag.name)
      const length = this.tags.length
      if (tag.name !== this.$route.name) {
        this.deleteMenu(index)
        return
      }
      if (index === length - 1) {
        this.$router.push({ name: this.tags[index - 1].name })
      } else {
        this.$router.push({ name: this.tags[index + 1].name })
      }
      this.deleteMenu(index)
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
.tag {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>