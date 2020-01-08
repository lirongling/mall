<template>
  <div class="wheel">
    <van-swipe :autoplay="3000" indicator-color="white">
      <div v-for="(slide,index) in slides" :key="index">
        <van-swipe-item>
          <img :src="slide.image" class="img" />
        </van-swipe-item>
      </div>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    slides: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.wheel {
  margin-top: 54px;
  width: 100%;

  .img {
    width: 100%;
  }
}
</style>