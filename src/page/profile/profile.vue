<template>
    <div>
        <head-top :headTitle=profileTitle>

        </head-top>
        <van-panel title="个人信息" desc="描述信息" status="">
            <van-grid :column-num="1">
                <van-grid-item>                    
                    <p>UserName:{{UserName}}</p>
                </van-grid-item>
                <van-grid-item>                    
                    <p class="token">AccessToken:{{AccessToken}}</p>
                </van-grid-item>
            </van-grid>
            <div v-if="(this.userInfo&&this.userInfo.UserName)">
                 <van-button  round size="large" type="primary" @click="loginout">退出登录</van-button>
            </div>
        </van-panel>
        <foot :activeIndex="active"></foot>
    </div>
</template>

<script>

import headTop from '../../components/header/head'
import foot from '../../components/footer/foot'
import Vue from 'vue';
import { mapActions } from 'vuex';
import { Panel } from 'vant';
import { Button } from 'vant';
import { mapState } from 'vuex'
import router from '../../router/router';
import { Dialog } from 'vant';
import { Grid, GridItem } from 'vant';

Vue.use(Grid);
Vue.use(GridItem);

Vue.use(Dialog);
Vue.use(Panel);
Vue.use(Button);
export default {
    data(){
        return{
            active:2,
            profileTitle:'我的',
            UserName: null,
            AccessToken:null,
        }
    },

	mounted(){
          this.initData() ;
    },

    components:{
        headTop,
        foot
    },

    computed:{
       ...mapState([
           'userInfo'
       ])
    },

    methods:{
        ...mapActions([
            'usersignout'
        ]),
        initData:function(){
            if(this.userInfo&&this.userInfo.UserName){
                this.UserName=this.userInfo.UserName;
                this.AccessToken=this.userInfo.AccessToken;
            }
        },
        loginout:function(){
            this.usersignout().then((res)=>{
                if(res.data.Code=="Success"){
                    router.push('/login');
                }else{
                //给予提示信息
                Dialog.alert({
                    title: '错误信息',
                    message: res.data.Message
                    }).then(() => {
                    // on close
                    });
                }
            });
        }
    },
    watch: {
        userInfo: function (){
            this.initData()
        }
    }
}

</script>

<style  scoped>
.token{
    width: 100%;  
    height: auto;  
    word-wrap:break-word;  
    word-break:break-all;  
    overflow: hidden;  
    /*font-size: 28px;*/
    color:#323232;
    /*font-family: "微软雅黑";*/
}
</style>