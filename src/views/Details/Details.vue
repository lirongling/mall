<template>
  <div>
    <!-- 顶部导航 -->
    <div>
      <mallTop></mallTop>
    </div>
    <Scroll class="wrapper">
      <div>
        <Wheel :images="images"></Wheel>
      </div>
      <div>
        <Contens :good.sync="good"></Contens>
      </div>
      <div class="bottom-tab">
        <BottomTab :good.sync="good" :comment.sync="comment"></BottomTab>
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
      good: {},
      comment: [],
      images: []
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
    // 获取商品数据
    getGoodOne() {
      this.$api
        .goodOne(this.$route.query.goodsId, 1)
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            console.log(res);
            this.comment = res.goods.comment.reverse();
            if (res.goods.goodsOne) {
              this.good = res.goods.goodsOne;
              for (let i = 1; i <= 4; i++) {
                this.images.push(this.good.image);
              }
              this.history();
            } else {
              this.$toast("暂无此数据");
            }

            // console.log(this.good);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 存历史浏览
    history() {
      if (JSON.parse(localStorage.getItem("loginMsg"))) {
        let loginMsg = JSON.parse(localStorage.getItem("loginMsg"));
        let historyShops = JSON.parse(localStorage.getItem("historyShops"));
        historyShops.map(item => {
          if (item.nickname === loginMsg.nickname) {
            console.log(
              !JSON.stringify(item.goods).includes(JSON.stringify(this.good.id))
            );
            if (
              !JSON.stringify(item.goods).includes(JSON.stringify(this.good.id))
            ) {
              this.good.add_time = new Date();
              item.goods.unshift(this.good);
            }
          }
        });
        localStorage.setItem("historyShops", JSON.stringify(historyShops));
      }
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
.bottom-tab {
  padding-bottom: 6vh;
}
.wrapper {
  // margin-bottom: 65px;
  height: 94vh;
  overflow: hidden;
}
</style>