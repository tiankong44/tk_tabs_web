module.exports = {
  transpileDependencies: true,
  publicPath: './',
  //在根目录下创建vue.config.js,如下配置：
    devServer: {
      proxy: {
        '/tabs': {
          target: 'http://localhost:9001', //路径指向本地主机地址及端口号
          ws: true,
          changeOrigin: true,
          pathRewrite:{
            '^/tabs': '/tabs' //路径转发代理
          }
        }
      }
  },
}