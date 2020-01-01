<template>
  <div class="core-container">
    <div class="wrapper" ref="wrapper">
      <div class="scroll-content">
        <slot class="height"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {
    init() {
      this.bs = new BScroll(".wrapper", {
        scrollY: true,
   
        probeType: 3 // listening scroll hook
      });
      
    }
  },
  mounted() {
    this.init();
     const options = {
      click: true,
      tap: true
    };
    this.scroll = new BScroll(this.$refs.wrapper, options);
  },
  beforeDestroy() {},
  watch: {},
  computed: {}
};
</script>

<style lang='scss' scoped>
.core-container {
  .wrapper {
    padding-top: 54px;
    height: 84vh;
    overflow: hidden;
  }
}
</style>
