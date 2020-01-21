import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router/router'
//import home from './page/home/home.vue'
import store from './store/index'
import './config/rem'


Vue.config.productionTip = false

Vue.use(VueRouter);

new Vue({
  router,
  //render: h => h(home)
  store
}).$mount('#app')
