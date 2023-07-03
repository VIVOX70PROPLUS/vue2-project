const { defineConfig } = require('@vue/cli-service')
const CompressionPlugin = require('compression-webpack-plugin') //gzip加速

module.exports = defineConfig({
  assetsDir: 'static', //解决打包后资源文件找不到
  parallel: false, //解决打包后资源文件找不到
  publicPath: './', //解决打包后资源文件找不到
  transpileDependencies: true,
  lintOnSave: false, //关闭eslint校验
  configureWebpack: {
    // productionGzip: false, //关闭gzip加速（开启 gzip 压缩只对真正的服务器端传输数据有用。如果你没有服务器，那么无法在本地测试开启 gzip 压缩的效果。）
    //gzip加速
    plugins: [
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  },
  chainWebpack: config => {
    config.externals({
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      echarts: 'echarts',
      'element-ui': 'element-ui'
    })
  }
})
