module.exports = {
  outputDir: 'build',
  configureWebpack: {
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
