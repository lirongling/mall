<template>
  <div class="rules">
    <p class="drop-down">松手刷新数据...</p>
    <div class="bscroll" ref="bscroll">
      <div class="bscroll-container">
        <slot class="height"></slot>
      </div>
    </div>
    <!-- <p class="more" v-if="showMore">加载更多...</p> -->
  </div>
</template>
 
<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      dropDown: true,
      showMore: false,
      showMore1: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.scrollFn();
    }, 500);
    const options = {
      click: true,
      tap: true
    };
    this.scroll = new BScroll(this.$refs.bscroll, options);
  },
  methods: {
    scrollFn() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.bscroll, {
            // click: true,
            scrollY: true,
            // scrollX: true,
            probeType: 3
          });
        } else {
          this.scroll.refresh();
        }
        this.scroll.on("scroll", pos => {
          // console.log(pos.y, this.dropDown);
          //如果下拉超过50px 就显示下拉刷新的文字
          if (pos.y > 0) {
            this.dropDown = true;
          } else if (pos.y > -10) {
            this.dropDown = false;
            this.dropDown1 = true;
          }
        });
        //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
        this.scroll.on("touchEnd", pos => {
          // 下拉动作
          if (pos.y > 0) {
            this.$parent.getRecommend();

            // console.log(this.$parent.fatherMethod());
            if (this.$parent.flage) {
              setTimeout(() => {
                this.$toast("下拉刷新成功");
                this.dropDown = false;
                this.dropDown1 = false;
              }, 400);
            }
          }
          //上拉加载 总高度>下拉的高度+10 触发加载更多
          if (this.scroll.maxScrollY > pos.y + 10) {
            this.showMore = true;
            console.log("加载更多");
            //使用refresh 方法 来更新scroll  解决无法滚动的问题
            this.scroll.refresh();
          }
          if (this.scroll.maxScrollY + 30 < pos.y) {
            this.showMore = false;
          }
          // console.log(this.scroll.maxScrollY + "总距离----下拉的距离" + pos.y);
        });
        // console.log(this.scroll.maxScrollY);
      });
    }
  }
};
</script>
 
 
<style lang='scss' scoped>
.rules {
  position: relative;
}
.bscroll {
  /* margin-top: 150px; */
  width: 100%;
  height: 93vh;
  overflow: hidden;
  /* padding-top: 20px; */
  margin-top: 43px;
}
/* .bscroll-container {
    background: #ff0000;
  } */
.drop-down {
  position: absolute;
  top: 10px;
  left: 0px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 0.8rem;
  color: #ccc;
}
.more {
  position: absolute;

  bottom: 80px;
  width: 100%;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 0.8rem;
  color: #ccc;
  background: #eeeeee;
}
</style>