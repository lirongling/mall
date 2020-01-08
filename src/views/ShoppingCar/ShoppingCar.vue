<template>
  <div>
    <!-- 顶部导航 -->
    <div class="mall-top">
      <mallTop>
        <div slot="left"></div>
        <div slot="title">购物车</div>
      </mallTop>
    </div>
    <!-- 分割线 -->
    <div class="split0">
      <van-divider />
    </div>
    <div v-if="loginMsg===null||this.$store.state.shopListNumber===0">
      <NoLogin :shopList="shopList" :loginMsg="loginMsg"></NoLogin>
    </div>
    <div v-else class="shopCar">
      <!-- 顶部结算 -->
      <div class="top flex">
        <div class="top- flex">
          <div class="top-bar" @click="checkAll">
            <div v-if="!checkAllBt" class="bar-img"></div>
            <div v-else class="bar-imgs"></div>
            <div class="bar-text">全选</div>
          </div>
          <div class="top0"></div>
          <div class="top-right">
            <div class="top-price">
              合计:
              <span class="total-price">￥{{total.toFixed(2)}}</span>
            </div>
            <div class="top-operate flex">
              <van-button size="small" type="warning" @click="del">删除</van-button>
              <van-button size="small" type="primary" @click="settlement">结算</van-button>
            </div>
          </div>
        </div>
        <div class="split1">
          <van-divider />
        </div>
      </div>
      <!-- 滚动 -->
      <Scroll class="wrapper">
        <!-- 数据展示 -->
        <div class="contior">
          <div class="content flex" v-for="(item,index) in shopList" :key="index">
            <!-- <div></div> -->
            <div class="content-left" @click="checkOdd(item)">
              <div v-if="!item.check" class="bar-img"></div>
              <div v-else class="bar-imgs"></div>
            </div>
            <div class="content-right flex">
              <div class="img">
                <img :src="item.image_path" />
              </div>
              <div class="good flex">
                <div class="good-name">{{item.name}}</div>
                <div class="bottom flex">
                  <div class="price">￥{{(item.present_price).toFixed(2)}}</div>
                  <div class="amount">
                    <van-stepper v-model="item.count" integer min="1" @change="stepper(item)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
import NoLogin from "../../components/shopCar/NoLogin";
import ShopCarList from "../../components/shopCar/ShopCarList";
import Scroll from "../../components/scroll/Scroll";
export default {
  data() {
    return {
      loginMsg: {},
      shopList: [],
      shopLists: [],
      checkAllBt: false
    };
  },
  components: {
    NoLogin,
    ShopCarList,
    Scroll
  },
  methods: {
    // 获取购物车的数据
    getCar() {
      this.$api
        .getCard()
        .then(res => {
          if (res.code === 200) {
            this.shopList = res.shopList;
            this.$store.state.shopListNumber = 0;
            res.shopList.map(item => {
              this.$store.state.shopListNumber += item.count;
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 单选
    checkOdd(item) {
      item.check = !item.check;
      this.checkAllBt = this.shopList.every(items => {
        return items.check;
      });
    },
    // 全选
    checkAll() {
      this.checkAllBt = !this.checkAllBt;
      this.shopList.map(item => {
        item.check = this.checkAllBt;
      });
    },
    //加减商品数量
    stepper(item) {
      this.$api
        .editCart(item.count, item.cid, item.mallPrice)
        .then(res => {
          if (res.code === 200) {
            this.$toast(res.msg);
            this.$api.getCard().then(res => {
              if (res.code === 200) {
                this.$store.state.shopListNumber = 0;
                res.shopList.map(item => {
                  this.$store.state.shopListNumber += item.count;
                });
              }
            });
            // this.$store.state.shopListNumber
          }
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除
    del() {
      this.shopLists = this.shopList.filter(item => {
        return item.check;
      });
      if (this.shopLists.length === 0) {
        this.$toast("你还未选择删除的商品哟");
      } else {
        this.$dialog
          .confirm({
            title: "提醒",
            message: "是否确认删除？"
          })
          .then(() => {
            this.shopLists.map(item => {
              if (item.check) {
                this.$api
                  .deleteShop(item.cid)
                  .then(res => {
                    if (res.code === 200) {
                      this.$toast(res.msg);
                      this.getCar();
                    }
                    // console.log(res);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
            });
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    //结算
    settlement() {
      this.shopLists = this.shopList.filter(item => {
        return item.check;
      });
      this.$store.state.shopLists = this.shopLists;
      if (this.shopLists.length > 0) {
        this.$router.push("/settlement");

        // this.$router.push({
        //   name: "settlement",
        //   params: { shopLists: this.shopLists }
        // });
      } else {
        this.$toast("你还未选择结算的商品哟");
      }
      // this.$api.placeOrder();
    }
  },
  created() {
    this.getCar();
  },
  mounted() {
    this.loginMsg = JSON.parse(localStorage.getItem("loginMsg"));
  },
  watch: {},
  computed: {
    // 计算总价
    total() {
      return this.shopList
        .filter(item => item.check)
        .reduce((preval, item) => {
          return preval + item.count * item.present_price;
        }, 0);
    }
  }
};
</script>

<style scoped lang='scss'>
.mall-top {
  z-index: 99;
  background: white;
  position: fixed;
  width: 100%;
  height: 44px;
  top: 0;
}
.split0 {
  position: fixed;
  top: 30px;
  z-index: 999;
  width: 100%;
}
.split {
  margin-top: 44px;
}
.split1 {
  // margin-top: 40px;
  width: 100%;
  height: 2px !important;
}
.top- {
  width: 90%;
  margin: 10px auto;
}
.top {
  width: 100%;
  margin: 10px auto;
  position: fixed;
  left: 50%;
  top: 33px;
  transform: translateX(-50%);
  background: white;
  z-index: 99;
  /deep/ .van-divider {
    height: 2px !important;
    margin-top: 0px;
  }

  .top-bar {
    flex: 2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .top-right {
    flex: 4;
    margin-left: 30px;
  }
  .top-price {
    flex: 4;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 15px;
    .total-price {
      color: rgb(245, 58, 58);
      margin-left: 10px;
    }
  }
  .top0 {
    flex: 1;
  }
  .top-operate {
    margin-top: 10px;
    width: 90%;
  }
}
.contior {
  margin-top: 155px;
  // padding-top: 40px;
  padding-bottom: 40px;
}
.content {
  width: 90%;
  height: 80px;
  margin: 15px auto;
  // margin-top: 80px;
  border-bottom: rgb(228, 228, 228) 1px solid;
  .content-left {
    flex: 1;
  }
  .content-right {
    flex: 5;
    height: 100%;
    .img {
      flex: 1.5;
    }
    .good {
      width: 200px;
      height: 60px;
      padding: 1px 3px;
      flex-direction: column;
      justify-content: space-between;
      // align-self:left;
      .good-name {
        width: 200px;
        font-size: 13px;
        color: rgb(221, 100, 19);
        word-break: keep-all; /* 不换行 */
        white-space: nowrap; /* 不换行 */
        overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow: ellipsis;
      }
      .bottom {
        justify-content: space-around;
        width: 100%;
        .price {
          color: rgb(245, 58, 58);
        }
      }
    }
    .img img {
      width: 100%;
    }
  }
}
.bar-img {
  width: 15px;
  height: 15px;
  background: url("../../assets/img/icon_checkbox.png") 0 -25px;
}
.bar-imgs {
  width: 15px;
  height: 15px;
  background: url("../../assets/img/icon_checkbox.png") 0 0px;
}
.bar-text {
  margin-left: 8px;
  font-size: 16px;
}
.wrapper {
  margin-bottom: 65px;
  height: 76vh;
}
</style>