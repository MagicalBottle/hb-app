<template>
    <div id="footer">
        <van-tabbar v-model="active">
        <van-tabbar-item icon="wap-home-o" to="/home" >首页</van-tabbar-item>
        <van-tabbar-item icon="search" to="/search" dot>搜索</van-tabbar-item>
        <van-tabbar-item icon="contact" to="/profile" info="5">我</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import Vue from 'vue';
import { Tabbar, TabbarItem } from 'vant';
import { Button } from 'vant';

Vue.use(Button);
Vue.use(Tabbar).use(TabbarItem);
export default {
  data() {
    return {
      active: 0
    }
  },
   mounted(){
   }
}
</script>

<style scoped>

</style>