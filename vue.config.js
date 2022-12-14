//创建vue.config.js文件
module.exports = {
  lintOnSave: false, //是否在保存时检查
  devServer: {
    host: 'localhost', //本机ip
    port: 8080, //本机端口
    open: true,
    proxy: {
      '/api': { //代理别名
        target: 'http://192.168.212.52:8080', //代理目标值
        changeOrigin: true,
        secure: true,
        pathRewrite: { //替换路径中的/api
          '^/api': ''
        }
        /*pathRequiresRewrite: {
          '^/api': ''
        }*/
      }
    },
    overlay: {
      warning: false,
      errors: true
    }
  }
}
