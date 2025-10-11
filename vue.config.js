const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.VUE_APP_BASE_URL,
  
  // Thay đổi title của trang web
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Trung tâm Anh ngữ Việt Anh Quốc';
      return args;
    });
  }
})
