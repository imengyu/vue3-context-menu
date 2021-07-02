const path = require('path')

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'examples/index.html',
      filename: 'index.html'
    }
  },
  publicPath: './',
  chainWebpack: config => {
    config.module
    .rule('js')
    .include
      .add(resolve('src'))
      .end()
    .use('babel')
      .loader('babel-loader')
      .tap(option => {
        return option
      })
  }
}