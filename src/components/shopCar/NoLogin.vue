<template>
  <div>
    <div class="ico">
      <div>
        <img src="../../assets/img/shop.png" />
      </div>
    </div>
    <div class="prompt">请先登录哟~~</div>
    <div class="login">
      <van-button round  plain hairline type="primary" @click="goLogin">立即登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    goLogin(){
      this.$router.push('/login')
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
/deep/ .van-button{
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
.login{
  display:flex;
  justify-content: center;
  margin-top: 20px;
}
</style>