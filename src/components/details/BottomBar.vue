<template>
  <div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" :info="this.$store.state.shopListNumber" @click="shopCar"/>
      <van-goods-action-icon icon="shop-o" text="店铺" info="12" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addShop" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
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
    }
  },
  components: {},
  methods: {
    // 加入购物车
    addShop() {
      this.$api.addShop(this.good.id).then(res => {
        if (res.code === -1) {
          this.$toast(res.msg);
        } else if (res.code === 200) {
          this.$toast(res.msg);
          this.$store.state.shopListNumber++
          
        }
        console.log(res);
      });
    },
    // 跳转到购物车
    shopCar(){
      this.$router.push('/shoppingCar')
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>