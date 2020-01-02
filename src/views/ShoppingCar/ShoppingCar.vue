<template>
  <div>
    <!-- 顶部导航 -->
    <div>
      <mallTop>
        <div slot="left"></div>
        <div slot="title">购物车</div>
      </mallTop>
    </div>
    <!-- 分割线 -->
    <div class="split">
      <van-divider />
    </div>

    <div v-if="loginMsg===null||shopList.length===0">
      <NoLogin :shopList="shopList" :loginMsg="loginMsg"></NoLogin>
    </div>
    <div v-else>
      <van-tabs v-model="active" animated>
        <van-tab v-for="(item,index) in tabsName" :key="index" :title="item">
          <ShopCarList></ShopCarList>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import NoLogin from "../../components/shopCar/NoLogin";
import ShopCarList from "../../components/shopCar/ShopCarList";
export default {
  data() {
    return {
      loginMsg: {},
      shopList: [],
      tabsName:['全部','待支付','待发货','待收货','已完成'],
      active:0,
    };
  },
  components: {
    NoLogin,
    ShopCarList
  },
  methods: {
    getCar() {
      this.$api
        .getCard()
        .then(res => {
          if (res.code === 200) {
            this.shopList = res.shopList;
            console.log(this.shopList.length);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getCar();
  },
  mounted() {
    this.loginMsg = JSON.parse(localStorage.getItem("loginMsg"));
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.split {
  margin-top: 44px;
}
</style>