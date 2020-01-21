<template>
    <div>
        <van-swipe :height="300" :autoplay="3000" >
            <van-swipe-item v-for="(image, index) in images" :key="index" >
                <img v-lazy="image" height="100%"/>
            </van-swipe-item>
        </van-swipe>
        <van-notice-bar left-icon="volume-o" text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"/>
        <van-grid :border="false">
            <van-grid-item icon="add-o" to="/add" text="添加客户" />
            <van-grid-item icon="orders-o" to="/list" text="客户列表" />
            <van-grid-item icon="delete" to="/delete" text="删除客户" />
            <van-grid-item icon="apps-o" text="更多" />
        </van-grid>
        <foot></foot>
    </div>
</template>

<script>
import foot from '../../components/footer/foot'
import Vue from 'vue';
import { Grid, GridItem } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';import { NoticeBar } from 'vant';

import {cityGuess} from '../../service/getData'

Vue.use(NoticeBar);
Vue.use(Grid).use(GridItem);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Lazyload);
export default {
    data(){
        return{
             images: [
                'https://img.yzcdn.cn/vant/apple-1.jpg',
                'https://img.yzcdn.cn/vant/apple-2.jpg',
                'https://img.yzcdn.cn/vant/apple-3.jpg',
                'https://img.yzcdn.cn/vant/apple-4.jpg'
            ]
        }
    },

	mounted(){
        // 获取当前城市
        cityGuess().then(res => {
            this.guessCity = res.name;
            this.guessCityid = res.id;
        })

       
    },

    components:{
        foot
    },

    computed:{
       
    },

    methods:{
        
    },
}

</script>
