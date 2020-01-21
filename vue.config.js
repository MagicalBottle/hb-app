module.exports = {
  //lintOnSave: process.env.NODE_ENV === 'production',//https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint     
    configureWebpack: {
       //devtool: 'none',//https://www.webpackjs.com/configuration/devtool/
        resolve: {
            alias: {
              //https://cn.vuejs.org/v2/guide/installation.html
              'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
            }
          }
    }
  }