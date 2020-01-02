<template>
  <div>
    <van-tabs @click="onClick">
      <van-tab title="商品详情">
        <div v-html="good.detail"></div>
      </van-tab>
      <van-tab title="商品评论">容 内2</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    good: {
      type: Object,
      default: () => {}
    },
  },
  components: {},
  methods: {
    onClick(name, title) {
      this.$toast(title);
    },
    // 查询商品评论
    evaluateOne(){
      this.$api.evaluateOne(this.good._id).then(res=>{
        console.log(res);
      })
    }
  },
  mounted() {
    this.evaluateOne()
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>