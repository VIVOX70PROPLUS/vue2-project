<template>
  <div class="login-container">
    <el-form :model="form"
             :rules="rules"
             :inline="true"
             ref="form"
             label-width="70px">
      <h3 class="login-title">登录页面</h3>
      <el-form-item label="用户名"
                    prop="username">
        <el-input v-model="form.username"
                  placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input v-model="form.password"
                  type="password"
                  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submit"
                   style="margin-left: 105px;margin-top: 10px;">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import Cookie from 'js-cookie'
import { getMenu } from '@/api'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: 'admin',
        password: 'admin'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form).then(({ data }) => {
            if (data.code === 20000) {
              // Cookie.set('token', data.data.token)
              localStorage.setItem('token', data.data.token)
              //获取菜单的数据，存入store中
              this.$store.commit('setMenu', data.data.menu)
              this.$store.commit('addMenu', this.$router)
              this.$router.push('/home')
            } else {
              this.$message.error(data.data.message)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  .login-title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }
  .el-input {
    width: 198px;
  }
}
</style>