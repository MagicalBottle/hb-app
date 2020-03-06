import {
    OUT_LOGIN,    
    GET_USERINFO,
    RECORD_USERINFO,
} from './mutation-types'
import { setStore,removeStore } from '../config/mUtils';


export default{
    [OUT_LOGIN](state){
        state.userInfo={};
        state.login=false;
        removeStore('AccessToken');
    },
    [GET_USERINFO](state,info){
        if(state.userInfo &&(state.userInfo.username!==info.username)){
            return;
        }
        if(state.login){
            return;
        }
        if(!info.message){
            state.userInfo={...info};
        }else{
            state.userInfo=null;
        }
        
    },
    [RECORD_USERINFO](state,info){
        state.userInfo=info;
        state.login=true;
        setStore('AccessToken',info.AccessToken);
    }
}