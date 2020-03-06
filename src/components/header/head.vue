<template>
    <header id='head_top'>
        <van-nav-bar

  :title="headTitle"
  left-text="返回"
  :right-text="loginText"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>        
    </header>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';
import {mapState, mapActions} from 'vuex'

Vue.use(NavBar);
export default {
    data(){
        return{
            loginText:""
        }
    },
    mounted(){
        //获取用户信息
         this.getUserInfo().then(()=>{
            if(this.userInfo&&this.userInfo.UserName){
                 this.loginText="";
             }else{
                 this.loginText="登录/注册";
             }
         });

    },
    props: ['headTitle'],
    computed: {
        ...mapState([
            'userInfo'
        ]),
    },
    methods: {
        ...mapActions([
            'getUserInfo'
        ]),
        onClickLeft(){
            this.$router.go(-1);
        },
        onClickRight() {
            if(this.userInfo&&this.userInfo.UserName){
                this.loginText=""
            }else{
                this.$router.push('/login');
            }
        }
    },

}

</script>
