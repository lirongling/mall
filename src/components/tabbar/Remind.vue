<template>
  <div>
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {
    this.$dialog
      .confirm({
        title: "提示",
        message: "您暂未登录,是否去登录?"
      })
      .then(() => {
        this.$router.push("/login");
      })
      .catch(() => {});
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>