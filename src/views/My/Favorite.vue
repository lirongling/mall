<template>
  <div>
    <!-- 顶部 -->
    <div class="top">
      <mallTop>
        <div slot="title">我的收藏</div>
      </mallTop>
      <!-- 分割线 -->
      <div class="split">
        <van-divider />
      </div>
    </div>
    <div class="no-collection" v-if="this.collection.length===0">
      <div>你的收藏还是空空的~~</div>
      <div>
        <van-button round plain hairline type="primary" @click="goShop">立即购物</van-button>
      </div>
    </div>

    <div class="content">
      <ScrollPullup
        class="wrapper"
        v-if="this.collection.length>0"
        @func="getCollection"
        :noList="noList"
      >
        <div class="content-item" v-for="(item,index) in collection" :key="index">
          <div class="goods flex">
            <div class="good-img flex" @click="jumpDeta(item.cid)">
              <img :src="item.image_path" />
            </div>
            <div class="good-de flex">
              <div class="good-name" @click="jumpDeta(item.cid)">{{item.name}}</div>
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
      </ScrollPullup>
    </div>

    <!-- <div v-if="this.collection.length>0" class="bottom flex">
      <van-button round size="large" plain hairline type="primary" @click="removeAll">全部移除</van-button>
    </div>-->
  </div>
</template>

<script>
import ScrollPullup from "../../components/scroll/ScrollPullup";
export default {
  data() {
    return {
      collection: [],
      flage: true,
      num: 0,
      page: 0,
      noList: true
    };
  },
  components: {
    ScrollPullup
  },
  methods: {
    // 查询我的收藏
    getCollection() {
      this.page++;
      this.$api
        .getCollection(this.page)
        .then(res => {
          if (res.code === 200) {
            this.collection = this.collection.concat(res.data.list);
            if (res.data.list.length === 0) {
              this.noList = false;
            } else {
              this.noList = true;
            }
          }
        })
        .catch(err => {
          console.log(err);
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
      // console.log(this.good.id);
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否确认删除?"
        })
        .then(() => {
          this.$api
            .cancelCollection(item.cid)
            .then(res => {
              if (res.code === 200) {
                if (this.flage) {
                  this.$toast(res.msg);
                  this.collection.splice(index, 1);
                }
                this.num++;
              }
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 清空收藏
    removeAll() {
      this.flage = false;
      this.num = 0;
      this.collection.map((item, index) => {
        this.cancelCollection(item, index);
      });
      setTimeout(() => {
        if (this.collection.length === this.num) {
          this.collection = [];
          this.$toast("清空完成");
        }
      }, 1000);
    },
    // 去购物
    goShop() {
      this.$router.push("/");
    },
    // 跳转到详情页
    jumpDeta(id) {
      this.$router.push({ name: "details", query: { goodsId: id } });
    }
  },
  mounted() {
    this.getCollection();
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
  margin-top: 44px;
  // padding-top: 54px;
  .content-item {
    width: 95%;
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
  height: 93.1vh;
}
</style>