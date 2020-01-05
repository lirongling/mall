<template>
  <div>
    <!-- 顶部 -->
    <div class="top">
      <mallTop>
        <div slot="title">订单详情</div>
      </mallTop>
      <!-- 分割线 -->
      <div class="split">
        <van-divider />
      </div>
    </div>
    <!-- 地址选择 -->
    <div class="address">
      <Address></Address>
    </div>
    <!-- 分割 -->
    <div class="split0"></div>
  </div>
</template>

<script>
import Address from "../../components/settlement/Address";
export default {
  data() {
    return {};
  },
  components: {
    Address,
  },
  methods: {},
  mounted() {
    console.log(this.$route.params.shopLists);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.top {
  position: fixed;
  top: 0;
}
.split {
  width: 100vw;
  margin-top: 44px;
}
.address{
  width: 100%;
  height: 110px;
  margin-top: 44px;
}
.split0{
  width: 100%;
  height: 10px;
  background: url('../../assets/img/caitiao.jpg')
}
</style>