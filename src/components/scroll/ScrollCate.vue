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
        click: true,
        probeType: 3 // listening scroll hook
      });
    }
  },
  mounted() {
    this.init();
    const options = {
      // click: true,
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
// /deep/ .scroll-content {
//   transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1)!important;
//   transition-duration: 0ms!important;
//   transform: translate(0px, -14px) scale(1) translateZ(0px) !important;
// }
.core-container {


  // padding-top: -50px;
  .wrapper {
    padding-top: 54px;
    height: 70vh;
    overflow: hidden;
  }
}
</style>
