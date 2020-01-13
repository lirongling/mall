<template>
  <div class="home">
    <!-- 顶部搜索 -->
    <div class="topSearch">
      <HomeTop :showPop="showPop"></HomeTop>
    </div>

    <!-- 刷新 -->
    <!-- <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh"> -->
    <!-- 滚动 -->
    <div>
      <HomeScroll class="wrapper">
        <div>
          <!-- 轮播图 -->
          <div class="wheel">
            <Wheel :slides.sync="recommend.slides"></Wheel>
          </div>
          <!-- 分类 -->
          <div class="category">
            <Category :category.sync="recommend.category"></Category>
          </div>

          <!-- 广告 -->
          <div class="advertising flex" v-if="recommend.advertesPicture">
            <img :src="recommend.advertesPicture.PICTURE_ADDRESS" class="advertising-img" />
          </div>
          <!-- 推荐 -->
          <div class="recommend">
            <Recommend :recommend.sync="recommend.recommend"></Recommend>
          </div>

          <!-- 楼层 -->
          <div v-if="recommend.floorName">
            <Floor
              :floor.sync="recommend.floor1"
              :num="'1'"
              :floorName="recommend.floorName.floor1"
            ></Floor>
          </div>
          <div v-if="recommend.floorName">
            <Floor
              :floor.sync="recommend.floor2"
              :num="'2'"
              :floorName="recommend.floorName.floor2"
            ></Floor>
          </div>
          <div v-if="recommend.floorName" class>
            <Floor
              :floor.sync="recommend.floor3"
              :num="'3'"
              :floorName="recommend.floorName.floor3"
            ></Floor>
          </div>
          <div class="hot recommend-bottom">
            <Hot :hotGoods.sync="recommend.hotGoods"></Hot>
          </div>
        </div>
      </HomeScroll>
    </div>
    <!-- </van-pull-refresh> -->
    <!-- pop弹出层 -->
    <div>
      <van-popup
        v-model="showPop"
        :overlay="isOverlay"
        position="right"
        :style="{ height: '93vh' ,width:'100%' ,marginTop:'4vh'}"
      >
        <Search></Search>
      </van-popup>
    </div>
  </div>
  <!-- <p>刷新次数: {{ count }}</p> -->
</template>

<script>
import HomeTop from "../../components/tabbar/HomeTop";
import Refresh from "../../components/Refresh";
import Wheel from "../../components/home/Wheel";
import Category from "../../components/home/Category";
import Recommend from "../../components/home/Recommend";
import Floor from "../../components/home/Floor";
import Hot from "../../components/home/Hot";
import Search from "../../components/home/Search";
import Scroll from "../../components/scroll/Scroll";
import HomeScroll from "../../components/scroll/HomeScroll";

export default {
  data() {
    return {
      recommend: {},
      count: 0,
      isLoading: false,
      showPop: false,
      isOverlay: false,
      flage: false
    };
  },
  components: {
    HomeTop,
    Wheel,
    Category,
    Recommend,
    Refresh,
    Floor,
    Scroll,
    Hot,
    Search,
    HomeScroll
  },
  methods: {
    getRecommend() {
      this.$api
        .recommend()
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.flage = true;
            this.recommend = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onRefresh() {
      setTimeout(() => {
        // this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    }
  },
  mounted() {
    this.getRecommend();

    // this.$nextTick(() => {
    //   this.scroll = new BScroll(this.$refs.wrapper, {});
    // });
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.topSearch {
  margin: 0;
  // display: flex;
  // top: 0;
  // left: 0;
}
.home {
  height: auto;
  background: #eeeeee;
  margin-top: -9px;
  .wheel {
    // margin-top: 54px;
    width: 100%;
    height: auto;
  }
  .category {
    width: 95%;
    margin: 5px auto;
    background: white;
    border-radius: 10px;
    // padding: 10px 0
  }
  .advertising {
    width: 100%;
    .advertising-img {
      width: 95%;
      margin: 3px auto;
    }
  }
  .recommend {
    width: 100%;
    height: auto;
    margin-top: 20px;
  }
}
.recommend-bottom {
  padding-bottom: 65px;
}
.wrapper {
  margin-top: 44px;
  // margin-bottom: 65px;
  height: 76vh;
}
</style>