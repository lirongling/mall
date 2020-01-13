<template>
  <div>
    <!-- 顶部 -->
    <div class="top">
      <mallTop>
        <div slot="title">评价晒单</div>
      </mallTop>
      <!-- 分割线 -->
      <div class="split">
        <van-divider />
      </div>
    </div>
    <div class="content">
      <div class="content-top flex">
        <div class="top-left flex">
          <img :src="userInfo.avatar" />
          <div class="rate">
            <van-rate
              allow-half
              v-model="goods.rate"
              :size="16"
              color="#ee0a24"
              void-icon="star"
              void-color="#eee"
              readonly
            />
          </div>
        </div>
        <div class="top-right flex">{{goods.comment_time}}</div>
      </div>
      <div class="content-text">
        <div class="content-title">评价内容:</div>
        <div class="content-content">{{goods.content}}</div>
      </div>
    </div>
    <!-- 分割线 -->
    <div class>
      <van-divider />
    </div>
    <div class="goods flex">
      <div class="good-img flex">
        <img :src="goods.goods[0].image" />
      </div>
      <div class="good-de flex">
        <div class="good-name">{{goods.goods[0].name}}</div>
        <div class="good-price flex">
          <div class="price">￥{{Number(goods.goods[0].present_price).toFixed(2)}}</div>
          <div class="btn flex" @click="addShop(goods.goods[0])">
            <van-icon name="shopping-cart-o" />
          </div>
          <!-- <div class="add-time">{{distanceTime(item.add_time)}}</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods: this.$route.query.goods,
      userInfo: {}
    };
  },
  components: {},
  methods: {
    // 查询用户信息
    getUser() {
      if (!this.goods.anonymous) {
        this.$api
          .user(this.goods._id)
          .then(res => {
            if (res.code === 200) {
              this.userInfo = res.userInfo;
            }
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 加入购物车
    addShop(item) {
      this.$api.addShop(item.id).then(res => {
        if (res.code === -1) {
          this.$toast(res.msg);
        } else if (res.code === 200) {
          this.$toast(res.msg);
          this.$store.state.shopListNumber++;
        }
        console.log(res);
      });
    }
  },
  mounted() {
    this.getUser();
    console.log(this.goods);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.top {
  position: fixed;
  top: 0;
}
.split {
  width: 100vw;
  margin-top: 44px;
}
.content {
  margin-top: 50px;
  .content-top {
    width: 90%;
    margin: 0 auto;
    .top-left {
      img {
        width: 36px;
      }
      .rate {
        margin-left: 5px;
        /deep/ .van-rate__item {
          margin-left: 3px;
        }
      }
    }
    .top-right {
      justify-content: flex-end;
      font-size: 13px;
      color: rgb(119, 119, 119);
    }
  }
  .content-text {
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
    text-align: left;
    .content-title {
      font-size: 15px;
    }
    .content-content {
      margin: 10px 0;
      font-size: 14px;
      color: rgb(95, 95, 95);
    }
  }
}
.goods {
  width: 90%;
  margin: 0 auto;
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
    justify-content: space-between;
    width: 100%;
    .price {
      font-size: 15px;
      color: rgb(243, 158, 30);
      width: 70px;
    }
    .add-time {
      margin-left: 20px;
      font-size: 14px;
      color: rgb(107, 105, 105);
    }
  }
}
.btn {
  margin-right: 25px;
  width: 40px;
  height: 40px;
  background: #fce1df;
  border-radius: 50%;
  color: rgb(230, 18, 18);
  justify-content: center;
  font-size: 20px;
}
</style>