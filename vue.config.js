// 给路径起别名
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        api: '@/api',
        utils: '@/utils',
        views: '@/views'
      }
    }
  },
  publicPath: './',
  lintOnSave: true
}
