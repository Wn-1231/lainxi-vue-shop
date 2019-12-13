const px2rem = require('postcss-px2rem')
// 配置postcs-px2rem
const postcss = px2rem({
  remUnit: 64 //设计稿等分之后的值，等分的比例同页面rem的比例是一致的
})

let path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  runtimeCompiler: true, // 模板解析
  lintOnSave: false, // 关闭EsLint的规则
  css: { // 添加postcss配置
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  },
  configureWebpack: { // 当前配置需要写入该选项中
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        // 'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'), // 设置文件查找路径，可简写文件查找路径
        'components': resolve('src/components'),
      }
    }
  },
  
  // 开发服务器的配置
  devServer: {
    // open: true, // 自动打开浏览器
    // // quiet: true, // 不做太多日志输出
    proxy: {
      // 处理以/api开头路径的请求
      // '/api': 'http://localhost:4000'   // http://localhost:4000/api/search/users
      '/api': {
        target: 'http://localhost:4000', // 转发的目标地址
        pathRewrite: {
          '^/api' : ''  // 转发请求时去除路径前面的/api
        },
      },
    },

    // historyApiFallback: true, // 任意的 404 响应都被替代为 index.html
    // devtool: 'cheap-module-eval-source-map',
  },
}