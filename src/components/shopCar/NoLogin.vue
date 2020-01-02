<template>
  <div>
    <div class="ico">
      <div>
        <img src="../../assets/img/shop.png" />
      </div>
    </div>
    <div class="prompt">
      <span v-if="loginMsg===null"> 请先登录哟~~</span>
      <span v-else>你的购物车还是空空的哟</span>
     
    </div>
    <div class="login">
      <van-button round plain hairline type="primary" @click="goLogin">
        <span v-if="loginMsg===null">立即登录</span>
        <span v-else>立即购物</span>
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    shopList: {
      type: Array,
      default: () => []
    },
    loginMsg: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  methods: {
    goLogin() {
      if (this.loginMsg === null) {
        this.$router.push("/login");
      } else {
        this.$router.push("/");
      }
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
/deep/ .van-button {
  width: 120px;
  height: 40px;
}
.ico {
  width: 150px;
  height: 150px;
  background: #f5f5f5;
  margin: 0 auto;
  margin-top: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ico img {
  width: 90px;
}
.prompt {
  margin-top: 20px;
  text-align: center;
  font-size: 15px;
}
.login {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>