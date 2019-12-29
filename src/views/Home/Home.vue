<template>
  <div class="home">
    <HomeTop></HomeTop>
  </div>
</template>

<script>
import HomeTop from '../../components/tabbar/HomeTop'
export default {
  data() {
    return {};
  },
  components: {
    HomeTop
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.home {
  width: 100vm;
  height: 100vh;
  background: antiquewhite;
}
</style>