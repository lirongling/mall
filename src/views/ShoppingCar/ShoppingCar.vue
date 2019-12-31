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
    <div v-if="loginMsg===null">
      <NoLogin></NoLogin>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import NoLogin from "../../components/shopCar/NoLogin";
export default {
  data() {
    return {
      loginMsg: ""
    };
  },
  components: {
    NoLogin
  },
  methods: {
    getCar() {
      this.$api
        .getCard()
        .then(res => {
          console.log(res);
          // if (res.code === 200) {
          //   this.recommend = res.data;
          // }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.loginMsg = JSON.parse(localStorage.getItem("loginMsg"));
   
    this.getCar()
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