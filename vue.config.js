module.exports = {
  configureWebpack: {
    outputDir: 'build',
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        network: '@/network',
        utils: '@/utils',
        views: '@/views'
      }
    }
  },
  lintOnSave: false
}
