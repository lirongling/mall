<template>
  <div>
    <!-- 顶部 -->
    <div class="top">
      <mallTop>
        <div slot="title">历史浏览</div>
      </mallTop>
      <!-- 分割线 -->
      <div class="split">
        <van-divider />
      </div>
    </div>
    <div class="no-collection" v-if="this.historyShops.length===0">
      <div>你的历史浏览还是空空的~~</div>
      <div>
        <van-button round plain hairline type="primary" @click="goShop">立即购物</van-button>
      </div>
    </div>
    <Scroll class="wrapper" v-if="this.historyShops.length>0">
      <div class="content">
        <div class="content-item" v-for="(item,index) in historyShops" :key="index">
          <div class="goods flex" >
            <div class="good-img flex">
              <img :src="item.image_path" />
            </div>
            <div class="good-de flex">
              <div class="good-name">{{item.name}}</div>
              <div class="good-price flex">
                <div class="price">￥{{(item.present_price).toFixed(2)}}</div>
                <div class="add-time">{{distanceTime(item.add_time)}}</div>
              </div>
            </div>
            <div class="bt flex" @click="cancelCollection(item,index)">
              <van-icon name="close" />
            </div>
          </div>
          <!-- 分割线 -->
          <div class>
            <van-divider />
          </div>
        </div>
      </div>
    </Scroll>
    <div v-if="this.historyShops.length>0" class="bottom flex">
      <van-button round size="large" plain hairline type="primary" @click="removeAll">全部移除</van-button>
    </div>
  </div>
</template>

<script>
import Scroll from "../../components/scroll/Scroll";
export default {
  data() {
    return {
      flage: true,
      num: 0,
      historyShops: [],
      historyShop: [],
      userHistory:[],
      userIndex:0,
    };
  },
  components: {
    Scroll
  },
  methods: {
    // 查询我的历史浏览
    getHistoryShops() {
      let loginMsg = JSON.parse(localStorage.getItem("loginMsg"));
      this.historyShop = JSON.parse(localStorage.getItem("historyShops"));
      this.historyShop.map((item,index) => {
        if (item.nickname === loginMsg.nickname) {
          this.userHistory=item
          this.historyShops=item.goods
          this.userIndex=index
        }
      });
    },
    // 计算时间
    distanceTime(oldTime) {
      let newTime = new Date();
      //  let time2 = this.$dayjs(newTime).format('YYYY-MM-DD hh:mm:ss')
      // valueOf是转换成时间戳
      let sputTme =
        this.$dayjs(newTime).valueOf() - this.$dayjs(oldTime).valueOf();
      let mounth = sputTme / (30 * 24 * 60 * 60 * 1000);
      let time = sputTme / (24 * 60 * 60 * 1000);
      let hour = sputTme / (60 * 60 * 1000);
      let minu = sputTme / (60 * 1000);
      if (mounth > 1) {
        return parseInt(mounth + 1) + "个月前";
      } else if (mounth < 1 && time >= 1) {
        return parseInt(time) + "天前";
      } else if (time < 1 && hour >= 1) {
        return parseInt(hour) + "小时前";
      } else if (hour < 1) {
        return parseInt(minu) + "分钟前";
      }
    },
    // 取消收藏
    cancelCollection(item, index) {
      this.userHistory.goods.splice(index, 1);
      this.historyShop.splice(this.userIndex,1, this.userHistory)
      localStorage.setItem("historyShops", JSON.stringify(this.historyShop));
      this.$toast('删除完成')
    },
    // 清空收藏
    removeAll() {
      this.historyShops=[]
      this.userHistory.goods=[];
      this.historyShop.splice(this.userIndex,1, this.userHistory)
      localStorage.setItem("historyShops", JSON.stringify(this.historyShop));
        if (this.userHistory.goods.length === 0) {
          this.$toast("清空完成");
        }
     
    },
    // 去购物
    goShop() {
      this.$router.push("/");
    }
  },
  beforeMount() {},
  mounted() {
    this.getHistoryShops();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
/deep/ .van-button {
  width: 120px;
  height: 40px;
  padding-top: -10px;
}
/deep/ .van-button--large {
  line-height: 6.8vh !important;
}
// /deep/.van-button__text {

// }
.top {
  position: fixed;
  top: 0;
  background: white;
  height: 44px;
  z-index: 99;
}
.split {
  width: 100vw;
  margin-top: 44px;
}
.no-collection {
  margin-top: 120px;
  text-align: center;
}
.no-collection > div:nth-child(1) {
  font-size: 17px;
  color: rgb(99, 99, 99);
}
.no-collection > div:nth-child(2) {
  font-size: 20px;
  margin-top: 40px;
}

.content {
  margin-top: 70px;
  .content-item {
    width: 90%;
    margin: 0 auto;
    .goods {
      .good-img {
        justify-content: flex-start;
        width: 100px;
        img {
          width: 80px;
        }
      }
    }
    .good-de {
      flex: 1;
      height: 80px;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;
      .good-name {
        width: 180px;
        font-size: 14px;
        color: rgb(68, 63, 59);
        word-break: keep-all; /* 不换行 */
        white-space: nowrap; /* 不换行 */
        overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow: ellipsis;
      }
      .good-price {
        .price {
          font-size: 15px;
          color: rgb(245, 58, 58);
          width: 70px;
        }
        .add-time {
          margin-left: 20px;
          font-size: 14px;
          color: rgb(107, 105, 105);
        }
      }
    }
    .bt {
      width: 50px;
      justify-content: center;
      font-size: 18px;
      color: rgb(112, 112, 112);
    }
  }
}
.bottom {
  position: fixed;
  bottom: 20px;
  width: 80%;
  margin: 0 auto;
  justify-content: center;
  left: 50%;
  transform: translateX(-50%);
}
.wrapper {
  margin-bottom: 65px;
  height: 76vh;
}
</style>