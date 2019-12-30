<template>
  <div>
    <div class="topBar flex">
      <div class="return flex">
        <slot name="left"><van-icon name="arrow-left" size="22" @click="back"/></slot>
      </div>
      <div class="title">
        <slot name="title"></slot>
      </div>
      <div>
          <slot name="right"></slot>
      </div>
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
    back(){
      this.$router.history.go(-1)
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.topBar {
  width: 100%;
  height: 44px;
  z-index: 2;
  position: fixed;
  top: 0;
}
.topBar > div:nth-child(1),
.topBar > div:nth-child(3) {
  flex: 1;
  display: flex;
  justify-content: center;
  font-size: 18px;

}
.topBar > div:nth-child(2) {
  flex: 4;
  text-align: center;
  font-size: 17px;
  color: rgb(18, 18, 19)
}
</style>