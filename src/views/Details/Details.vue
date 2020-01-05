<template>
  <div>
    <!-- 顶部导航 -->
    <div>
      <mallTop></mallTop>
    </div>
    <Scroll class="wrapper">
      <div>
        <Wheel :image="good.image"></Wheel>
      </div>
      <div>
        <Contens :good.sync="good"></Contens>
      </div>
      <div>
        <BottomTab :good.sync="good"></BottomTab>
      </div>
     
    </Scroll>
     <div class="bottom-bar">
        <BottomBar :good.sync="good"></BottomBar>
      </div>
  </div>
</template>

<script>
import Wheel from "../../components/details/Wheel";
import Contens from "../../components/details/Conten";
import BottomBar from "../../components/details/BottomBar";
import BottomTab from "../../components/details/BottomTab";
import Scroll from "../../components/scroll/Scroll";
export default {
  data() {
    return {
      good: {}
    };
  },
  components: {
    Wheel,
    Contens,
    BottomBar,
    BottomTab,
    Scroll
  },
  methods: {
    getGoodOne() {
      this.$api
        .goodOne(this.$route.query.goodsId, 1)
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.good = res.goods.goodsOne;

            // console.log(this.good);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getGoodOne();
    // this.$route.query.goodsId
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.bottom-bar {
  // margin-bottom: 10vh;
}
.wrapper {
  // margin-bottom: 65px;
  height: 60vh;
}
</style>