<template>
  <div>
    <div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" :info="shopListNumber" @click="shopCar" />
        <van-goods-action-icon icon="shop-o" text="店铺" info="12" />
        <van-goods-action-button type="warning" text="加入购物车" @click="addShop" />
        <van-goods-action-button type="danger" text="立即购买" @click="buyShop" />
      </van-goods-action>
    </div>
    <div>
      <van-popup v-model="show" round position="bottom" :style="{ height: '40%' }">
        <div class="content">
          <div class="good-top flex">
            <div class="good-img">
              <img :src="good.image" />
            </div>
            <div class="good-de flex">
              <div class="good-name">{{good.name}}</div>
              <div class="flex good-mount">
                <div class="good-price">
                  ￥
                  <span>{{Number(good.present_price).toFixed(2)}}</span>
                </div>
                <div class="good-amount">
                  剩余:
                  <span>{{good.amount}}</span>件
                </div>
              </div>
            </div>
          </div>
          <div class="good-center flex">
            <div class="good-number">
              <div>购买数量:</div>
              <div>每人限购三件</div>
            </div>
            <div>
              <van-stepper v-model="amount" integer max="3" async-change @change="onChange" />
            </div>
          </div>
          <div class="good-bottom">
            <van-goods-action>
              <van-goods-action-button type="warning" text="加入购物车" @click="addShop" />
              <van-goods-action-button type="danger" text="立即购买" @click="buyGoods" />
            </van-goods-action>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      amount: 1
    };
  },
  props: {
    good: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  methods: {
    // 加入购物车
    addShop() {
      this.$api.addShop(this.good.id).then(res => {
        if (res.code === -1) {
          this.isLogin();
        } else if (res.code === 200) {
          this.$toast(res.msg);
          this.$store.state.shopListNumber++;
        }
        console.log(res);
      });
    },
    // 跳转到购物车
    shopCar() {
      this.$router.push("/shoppingCar");
    },
    //立即购买
    buyShop() {
      this.show = true;
    },
    // 登录提醒
    isLogin() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "您暂未登录,是否去登录?"
        })
        .then(() => {
          this.$router.push("/login");
        })
        .catch(() => {});
    },
    // 购买
    buyGoods() {
      if (!localStorage.getItem("loginMsg")) {
        this.isLogin();
      } else {
        this.good.count = this.amount;
        // this.$store.state.shopListss = this.good;
        // console.log(this.good);
        this.$router.push({
          name: "settlement",
          query: { shopLists: JSON.stringify(this.good) }
        });
      }
    },
    // 修改商品数量
    onChange(amount) {
      if (amount >= 3) {
        this.$toast("每个人限购三件哟");
      } else if (amount <= 1) {
        this.$toast("最少选择一件");
      }
    }
  },

  mounted() {},
  watch: {},
  computed: {
    shopListNumber() {
      if (this.$store.state.shopListNumber > 0) {
        return this.$store.state.shopListNumber;
      } else {
        return null;
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.content {
  width: 90%;
  margin: 10px auto;
}
.good-top {
  width: 100%;
  margin: 10px auto;
  justify-content: flex-start;
  .good-img {
  }
  img {
    width: 100px;
  }
  .good-de {
    height: 80px;
    margin-left: 10px;
    font-size: 15px;
    color: rgb(56, 56, 56);
    flex-direction: column;
    align-items: flex-start;
    .good-name {
      word-break: keep-all; /* 不换行 */
      white-space: nowrap; /* 不换行 */
      overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
      text-overflow: ellipsis;
    }
    .good-mount {
      margin-bottom: 10px;
      .good-price {
        color: rgb(207, 81, 7);
        span {
          font-size: 18px;
        }
      }
      .good-amount {
        margin-left: 50px;
        font-size: 14px;
      }
    }
  }
}
.good-center {
  margin-top: 30px;
  .good-number {
    font-size: 16px;
  }
  .good-number > div:nth-child(2) {
    margin-top: 5px;
    font-size: 14px;
    color: rgb(207, 81, 7);
  }
}
</style>