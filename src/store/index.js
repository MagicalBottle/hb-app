import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state={
    login: false,//是否登录
    userInfo: null, //用户信息
    removeAddress:[],//移除地址
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})