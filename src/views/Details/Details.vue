<template>
  <div>
    <div>
      <mallTop>
        <!-- <div slot="title">购物车</div> -->
      </mallTop>
    </div>
    {{this.$route.query.goodsId}}
    <div>
      <Wheel></Wheel>
    </div>
    <div></div>
  </div>
</template>

<script>
import Wheel from "../../components/details/Wheel";
export default {
  data() {
    return {
      good:[]
    };
  },
  components: {
    Wheel
  },
  methods: {
    getGoodOne() {
      this.$api
        .goodOne(this.$route.query.goodsId,  1)
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.good = res.goods.goodsOne;
            console.log(this.good);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getGoodOne()
    // this.$route.query.goodsId
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>