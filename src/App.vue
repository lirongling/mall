<template>
  <div class="app">
    <transition name="fade">
      <router-view class="rou" />
    </transition>
    <div v-show="this.$store.state.isLoading" class="loading">
      <van-overlay :show="this.$store.state.isLoading">
        <div class="wrappersss">
          <van-loading type="spinner" color="#1989fa" />
        </div>
      </van-overlay>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    // 请求购物车数据
    getCar() {
      this.$api
        .getCard()
        .then(res => {
          if (res.code === 200) {
            // console.log(res);
            this.$store.state.shopListNumber = 0;
            res.shopList.map(item => {
              this.$store.state.shopListNumber += item.count;
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getCar();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>
<style lang="scss">
@import url("//at.alicdn.com/t/font_1588350_nmi5yoytq9.css");
.app {
  font-size: 16px;
}
.loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 121;
  width: 100%;
  height: 100%;

  display: table-cell;
  vertical-align: middle;
  text-align: center;

  /deep/ .van-overlay {
    background-color: hsla(0, 0%, 100%, 0.9);
    z-index: 99999;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
}
* {
  margin: 0;
  padding: 0;
}
.loading {
  z-index: 99999999;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.fade-enter-active,
.fade-leave-avtive {
  transition: opacity 0.8s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.wrappersss {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
