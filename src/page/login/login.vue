<template>
    <div>
        <van-form @submit="onSubmit">
            <van-field
                v-model="UserName"
                name="UserName"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="Password"
                type="password"
                name="Password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>

import {login} from '../../service/getData'
import md5 from 'crypto-js/md5';
import hex from 'crypto-js/enc-hex';
import Vue from 'vue';
import { mapMutations } from 'vuex';
import { Field } from 'vant';
import { Form } from 'vant';
import { Button } from 'vant';
import { Dialog } from 'vant';


Vue.use(Dialog);
Vue.use(Field);
Vue.use(Form);
Vue.use(Button);
export default {
    data(){
        return{
            Id:null,
            UserName: null, //用户名
            Password: null, //密码
            Captcha: null, //验证码
            AccessToken:null,
        }
    },

	mounted(){
        this.OUT_LOGIN();
    },

    components:{
        
    },

    computed:{
       
    },

    methods:{
         ...mapMutations([
                'OUT_LOGIN',
                'RECORD_USERINFO',
            ]),
         onSubmit() {
             login(this.UserName,hex.stringify(md5(this.Password)),this.Captcha).then(res => {
            if(res.data.Code=="Success"){
                var data=res.data.Data;
                this.RECORD_USERINFO(data);
                this.$router.go(-1);
            }else{
                //给予提示信息
                Dialog.alert({
                    title: '错误信息',
                    message: res.data.Message
                    }).then(() => {
                    // on close
                    });
            }
        })
        }
    },
}

</script>
