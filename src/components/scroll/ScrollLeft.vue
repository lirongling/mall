<template>
  <div class="core-containers1">
    <div class="wrappers1" ref="wrappers1">
      <slot class="width"></slot>
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
      this.bss = new BScroll(".wrappers1", {
        scrollX: true,
        // scrollY: true,
        probeType: 3 // listening scroll hook
      });
    }
  },
  mounted() {
    this.init();
    // const options = {
    //   click: true,
    //   tap: true
    // };
    // this.scroll = new BScroll(this.$refs.wrappers1, options);
  },
  beforeDestroy() {},
  watch: {},
  computed: {}
};
</script>

<style lang='scss' >
.core-containers1 {
  // display：inline
  .wrappers1 {
    // height: 200px;
    // width: 100%;
    overflow: hidden;
  }
}
</style>
