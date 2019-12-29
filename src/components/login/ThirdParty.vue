<template>
  <div class="bottom">
    <div>
      <van-divider>第三方登录</van-divider>
    </div>
    <div class="icon flex">
      <span class="iconfont icon-qq"></span>
      <span class="iconfont icon-weixin"></span>
      <span class="iconfont icon-weibo"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.bottom {
  width: 90%;
  height: 40px;
  margin: 0 auto;
  .icon {
    justify-content: center;
  }
  .icon > span {
    display: block;
    padding: 0 20px;
    font-size: 22px;
    color: rgb(105, 38, 38);
  }
  .icon > span:nth-child(1) {
    color: #4cafe9;
  }
  .icon > span:nth-child(2) {
    color: #3fcf77;
  }
  .icon > span:nth-child(3) {
    color: #e52425;
  }
}
</style>