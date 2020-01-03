<template>
  <div>
    <van-tabs v-model="active" animated>
      <van-tab v-for="(item,index) in tabsName" :key="index" :title="item">
        <!-- <ShopCarList></ShopCarList> -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabsName:['全部','待支付','待发货','待收货','已完成'],
      active:0,
    };
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>