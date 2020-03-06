import Vue from 'vue'
import {getStore} from '../config/mUtils'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '../router/router'
import hmacSHA256 from 'crypto-js/hmac-sha256';
import hex from 'crypto-js/enc-hex';




let baseUrl = ''; 
let loginUrl='/Account/login';

let Appid='123456';
let UserKey='sfdsafsdf';


if (process.env.NODE_ENV == 'development') {
	// baseUrl = '//elm.cangdu.org';
	baseUrl = 'http://localhost:5000/api';

}else if(process.env.NODE_ENV == 'production'){
	baseUrl = '//elm.cangdu.org';
}

Vue.use(VueAxios, axios);
axios.defaults.baseURL= baseUrl;
//axios.defaults.withCredentials= true;

//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //加上验签
    config.data.Appid=Appid;
    config.data.Nonce=new Date().getTime();

    let signStr = Object.keys(config.data).sort().reduce(function(total,currentKey){
        let val=config.data[currentKey];
        if(!(val==null||val==undefined||val=='')){
            total+=currentKey+"="+val+"&";
        }
        return total;
    },'');
    signStr=signStr.substring(0,signStr.length-1);
    let strs= hmacSHA256(signStr,UserKey);
    config.data.Sign=hex.stringify(strs);

    //header加上AccessToken    
    config.headers.AccessToken = getStore('AccessToken');   
    
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
        router.push("/login"); 
        return response;
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  
/**
 * 获取用户信息
 */
export const getUser=()=>{
    return Vue.axios.post('/Account/getUser',{
        AccessToken:getStore('AccessToken')
     });
}


/**
 * 获取图片验证码
 */
export const getcaptchas = () =>{
    return  Vue.axios.post('/v1/captchas');
}


/**
 * 登录
 */
export const login = (UserName,Password,Captcha) =>{
    return  Vue.axios.post(loginUrl,
        {'UserName':UserName,
        'Password':Password,
        'Captcha':Captcha
     });
}


/**
 * 退出登录
 */
export const signout=()=>{
    return Vue.axios.post('/Account/Logout',{
        AccessToken:getStore('AccessToken')
     });
}


