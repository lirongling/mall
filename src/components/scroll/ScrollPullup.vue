<template>
  <div class="pullup">
    <div ref="scroller" class="pullup-bswrapper">
      <div class="pullup-scroller">
        <slot class="height"></slot>
        <div class="pullup-wrapper">
          <div v-if="!isPullUpLoad" class="before-trigger">
            <span class="pullup-txt">{{more}}</span>
          </div>
          <div v-else class="after-trigger">
            <van-loading size="24px">加载中...</van-loading>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";

BScroll.use(Pullup);

export default {
  data() {
    return {
      isPullUpLoad: false,
      data: 30,
      more: "加载更多"
    };
  },
  props: {
    getCollection: {
      //筛选条件
      type: Object,
      default: function() {
        return {};
      }
    },
    noList: {
      type: Boolean,
      default: true
    }
  },

  created() {
    this.bscroll = null;
  },
  mounted() {
    this.initBscroll();
  },
  methods: {
    // 滑动效果
    initBscroll() {
      this.bscroll = new BScroll(this.$refs.scroller, {
        scrollY: true,
        pullUpLoad: true,
        click: true
      });

      this.bscroll.on("pullingUp", this.pullingUpHandler);
    },

    async pullingUpHandler() {
      this.isPullUpLoad = true;
      // this.$parent.getCollection();
      console.log(this.noList);

      this.$emit("func");
      await this.requestData();

      this.bscroll.finishPullUp();
      this.bscroll.refresh();
      this.isPullUpLoad = false;
    },
    async requestData() {
      try {
        const newData = await this.ajaxGet(/* url */);
        this.data += newData;
      } catch (err) {
        // handle err
        console.log(err);
      }
    },
    ajaxGet(/* url */) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(20);
        }, 1000);
      });
    }
  },
  computed() {},
  watch: {
    noList(val) {
      if (val) {
        this.more = "加载更多";
      } else {
        this.more = "没有更多了~~";
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.pullup {
  height: 100%;
}

.pullup-bswrapper {
  height: 100%;
  padding: 0 10px;
  border: 1px solid #ccc;
  overflow: hidden;
}
.pullup-list {
  padding: 0;
}

.pullup-list-item {
  padding: 10px 0;
  list-style: none;
  border-bottom: 1px solid #ccc;
}

.pullup-wrapper {
  padding: 20px;
  text-align: center;
  color: #999;
}
</style>