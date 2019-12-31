<template>
  <div>
    <div>
      <van-swipe @change="onChange">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
        <div class="custom-indicator" slot="indicator">{{ current + 1 }}/4</div>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0
    };
  },
  components: {},
  methods: {
    onChange(index) {
      this.current = index;
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>