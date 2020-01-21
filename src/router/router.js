
import VueRouter from 'vue-router'

const home=()=>import(/* webpackChunkName: "home" */ '../page/home/home')
const login=()=>import(/* webpackChunkName: "login" */ '../page/login/login')


export default new VueRouter({
    mode: 'history',//https://router.vuejs.org/zh/guide/essentials/history-mode.html
    routes:[
        {
            path:'/',
            redirect:'/home'
        },
        {
            path:'',
            redirect:'/home'
        },
        {
            path:'/home',
            component:home
        },
        {
            path:'/login',
            component:login
        }
    ]
  });