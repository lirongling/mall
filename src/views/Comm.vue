<template>
  <div>
    <!-- 底部导航 -->
    <div>
      <van-tabbar v-model="active" @change="onChange">
        <van-tabbar-item icon="home-o" replace to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="qr" replace to="/category">分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" :info="mount" replace to="/shoppingCar">购物车</van-tabbar-item>
        <van-tabbar-item icon="user-o" replace to="/my">我的</van-tabbar-item>
      </van-tabbar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import TabBar from "../components/tabbar/TabBar";
export default {
  data() {
    return {
      active: 0,
      mount: 0,
    };
  },
  components: {
    TabBar
  },
  methods: {
    onChange(index) {
      // Notify({ type: "primary", message: index });
     
    },
    change(){
       if (this.$route.name === 'home') {
        this.active=0
      } else if (this.$route.name === 'category') {
        this.active=1
      } else if (this.$route.name === 'shoppingCar') {
       this.active=2
      } else if (this.$route.name === 'my') {
        this.active=3
      }
    }
  },
  mounted() {
    this.change()
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>