<template>
  <div class="core-containers">
    <div class="wrappers" ref="wrappers">
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
      this.bs = new BScroll(".wrappers", {
        scrollX: true,
        scrollY: true,

        probeType: 3 // listening scroll hook
      });
    }
  },
  mounted() {
    this.init();
    const options = {
      tap: true
    };
    this.scroll = new BScroll(this.$refs.wrappers, options);
  },
  beforeDestroy() {},
  watch: {},
  computed: {}
};
</script>

<style lang='scss' >
.core-containers {
  display：inline .wrappers {
    // height: 200px;
    width: 110%;
    overflow: hidden;
  }
}
</style>
