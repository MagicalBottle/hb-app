import Vue from 'vue'
import {getStore,removeStore} from '../config/mUtils'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '../router/router'

let baseUrl = ''; 
let anonymousUrl=['/login'];

if (process.env.NODE_ENV == 'development') {
	baseUrl = '//elm.cangdu.org';

}else if(process.env.NODE_ENV == 'production'){
	baseUrl = '//elm.cangdu.org';
}

axios.defaults.baseURL= baseUrl;
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //加上验签
    
    //如果用户没有登录 跳转登录页
    let isAnonymous=false;
    anonymousUrl.forEach(url => {
        if(config.url===url){
            isAnonymous=true;
            return;
        }
    });
    if(isAnonymous) return config;
    if(getStore("token"))  return config;
    router.push("/login");
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //如果返回未登录或登录超时，跳转登录页
    if(response.code==='nologin'){
        removeStore("token");
        router.push("/login"); 
        return response;
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


Vue.use(VueAxios, axios)

export const getUser=()=>Vue.axios.get('/v1/user',{
    params: {
        user_id:getStore('user_id')
     }
 }).then(function(response) {  return response.data; });

export const getAddressList = (user_id) => {
    return Vue.axios.get('/v1/users/'+user_id+'/addresses')
}

/**
 * 获取首页默认地址
 */
export const cityGuess = () =>{
   return Vue.axios.get('/v1/cities',{
       params: {
            type:'guess'
        }
    });
}

/**
 * 获取首页热门城市
 */
export const hotcity = () =>{
    return Vue.axios.get('/v1/cities',{
        params: {
             type:'hot'
         }
     });
}

/**
 * 获取首页所有城市
 */
export const groupcity = () =>{
    return Vue.axios.get('/v1/cities',{
        params: {
             type:'group'
         }
     });
}


/**
 * 获取图片验证码
 */
export const getcaptchas = () =>{
    return  Vue.axios.post('/v1/captchas');
}

/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) =>{
    return  Vue.axios.post('/v2/login',{
        params: {
            username,
            password,
            captcha_code
         }
     });
}

/**
 * 获取当前所在城市
 */
export const currentcity = (number) =>{
    return  Vue.axios.get('/v1/cities/'+ number);       
}

/**
 * 获取搜索地址
 */
export const searchplace = (cityid,value) =>{
    return  Vue.axios.get('/v1/pois',{
        params: {
            type: 'search',
            city_id: cityid,
            keyword: value
         }
     });
}

export const login = () =>{
    return  Vue.axios.post('/login',{
     });
}
