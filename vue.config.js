module.exports = {
  outputDir: 'build',
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
  lintOnSave: false
}
