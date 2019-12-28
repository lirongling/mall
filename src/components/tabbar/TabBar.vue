<template>
  <div>
    <div class="flex tabbar">
     <div class="tabbar-item"></div>
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
.tabbar {
  width: 100%;
  height: 49px;
  box-shadow: 0 -2px 1px rgb(209, 208, 207);
  background: rgb(119, 95, 95);
  position:fixed;
  bottom: 0;
  left: 0;
  .tabbar-item{
    flex: 1
  }
}
</style>