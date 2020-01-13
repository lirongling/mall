<template>
  <div class="wheel">
    <van-swipe :autoplay="3000" indicator-color="white" :stop-propagation="propagation">
      <div v-for="(slide,index) in slides" :key="index">
        <van-swipe-item @click="jumpDeta(slide)">
          <img :src="slide.image" class="img" />
        </van-swipe-item>
      </div>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      propagation: false
    };
  },
  props: {
    slides: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {
    // 跳转到详情页
    jumpDeta(item) {
      this.$router.push({ name: "details", query: { goodsId: item.goodsId } });
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.wheel {
  padding-top: 12px;
  width: 100%;

  .img {
    width: 100%;
  }
}
</style>