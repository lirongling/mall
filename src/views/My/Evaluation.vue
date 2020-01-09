<template>
  <div>
    <!-- 顶部 -->
    <div class="top">
      <mallTop>
        <div slot="title">评价中心</div>
      </mallTop>
      <!-- 分割线 -->
      <div class="split">
        <van-divider />
      </div>
    </div>
    <div class="content">
      <div class="img">
        <img src="../../assets/img/evaluate.jpg" />
      </div>
      <div class="tabs" @click="clickTabs">
        <van-tabs v-model="active">
          <van-tab title="待评价" name="notRated"></van-tab>
          <van-tab title="已评价" name="reviewed"></van-tab>
        </van-tabs>
      </div>
      <!-- 滚动 -->
      <Scroll class="wrapper">
        <div class="review">
          <div v-if="this.active==='notRated'">
            <NotRated :comment="comment"></NotRated>
          </div>
          <div v-else>
            <Reviewed :reviewed="reviewed"></Reviewed>
          </div>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
NotRated;
import NotRated from "../../components/evaluation/NotRated";
import Reviewed from "../../components/evaluation/Reviewed";
import Scroll from "../../components/scroll/Scroll";
export default {
  data() {
    return {
      active: "notRated",
      comment: [],
      reviewed: [],
      review: []
    };
  },
  components: {
    NotRated,
    Reviewed,
    Scroll
  },
  methods: {
    // 切换tabs
    clickTabs(name, title) {
      // console.log(name,title);
      console.log(this.active);
      if (this.active === "reviewed") {
        this.review = this.reviewed;
      } else {
        this.review = this.comment;
      }
      console.log(this.review);
    },
    // 查询待评价
    tobeEvaluated() {
      this.$api
        .tobeEvaluated()
        .then(res => {
          if (res.code === 200) {
            this.comment = res.data.list;
            // this.comment.reverse();
            this.review = this.comment;
            this.review.reverse();
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 查询出已评价
    alreadyEvaluated() {
      this.$api
        .alreadyEvaluated()
        .then(res => {
          if (res.code === 200) {
            this.reviewed = res.data.list;
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.tobeEvaluated();
    this.alreadyEvaluated();
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
/ddep/ .van-tabs__wrap {
  border-radius: 10px !important;
}
/deep/ .van-button {
  width: 120px;
  height: 25px;
  // padding-top: -10px;
  line-height: 7.2vw;
}
/deep/ .van-button--large {
  line-height: 6.8vh !important;
}
.top {
  position: fixed;
  top: 0;
}
.split {
  width: 100vw;
  margin-top: 44px;
}
.content {
  margin-top: 44px;
  .img {
    width: 100%;
    z-index: 99999 !important;
    background: white;
    height: 214px;
    img {
      width: 100%;
    }
  }
  .tabs {
    width: 65%;
    height: 44px;
    margin: 0 auto;
    box-shadow: rgb(102, 102, 102) 0px 0px 2px;
    border-radius: 10px !important;
    margin-top: -30px;
    z-index: 99;
    position: relative;
    background: white;
    padding: 5px;
  }
}
.wrapper {
  // margin-bottom: 65px;
  height: 56vh;
  overflow: hidden;
}
</style>