<template>
  <div>
    <!-- 顶部 -->
    <div class="top">
      <mallTop>
        <div slot="title">订单详情</div>
      </mallTop>
      <!-- 分割线 -->
      <div class="split">
        <van-divider />
      </div>
    </div>
    <!-- 地址选择 -->
    <div class="address">
      <Address @send="send" ref="addressChild"></Address>
    </div>
    <!-- 分割 -->

    <div class="split0"></div>
    <!-- 滚动 -->
    <Scroll class="wrapper">
      <div class="content">
        <div class="content-item" v-for="(item,index) in shopLists" :key="index">
          <div class="good flex">
            <div class="good-img">
              <img :src="item.image_path" />
            </div>
            <div class="good-de flex">
              <div class="good-name">{{item.name}}</div>
              <div class="good-bottom flex">
                <div class="good-price">￥{{(item.present_price*item.count).toFixed(2)}}</div>
                <div class="good-count">X{{item.count}}</div>
              </div>
            </div>
          </div>
          <!-- 分割线 -->
          <div class>
            <van-divider />
          </div>
        </div>
      </div>
    </Scroll>

    <!-- 底部按钮 -->
    <div class="submit">
      <van-submit-bar :price="total*100" button-text="提交订单" @submit="onSubmit" />
    </div>
  </div>
</template>

<script>
import Address from "../../components/settlement/Address";
import Scroll from "../../components/scroll/Scroll";
export default {
  data() {
    return {
      shopLists: [],
      shopListss: [],
      address: [],
      orderId: [],
      count: 0,
      flage: false
    };
  },
  components: {
    Address,
    Scroll
  },
  methods: {
    // 提交订单
    onSubmit() {
      if (this.$refs.addressChild.defaultAddress.length === 0) {
        this.$toast("请选择收获地址");
      } else {
        this.getOrderId();
        this.placeOrder();
      }
    },
    // 请求数据
    placeOrder() {
      this.$api
        .placeOrder({
          address: this.$refs.addressChild.defaultAddress[0].address,
          tel: this.$refs.addressChild.defaultAddress[0].tel,
          orderId: this.orderId,
          count: this.shopLists[0].count,
          idDirect: this.flage
        })
        .then(res => {
          if (res.code === 200) {
            this.$router.history.go(-1);
            this.$toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 子传父
    send(val) {
      this.address = val;
      console.log(val);
    },
    //获取商品id和count
    getOrderId() {
      if (this.flage) {
        this.orderId.push(this.shopLists[0].id);
      } else {
        this.shopLists.map(item => {
          this.orderId.push(item.cid);
          this.count += item.count;
        });
      }
    }
  },
  mounted() {
    this.shopLists = this.$store.state.shopLists;
    if (this.$route.query.shopLists) {
      this.flage = true;
      this.shopLists = [];
      this.shopLists.push(JSON.parse(this.$route.query.shopLists));
    }
  },
  watch: {},
  computed: {
    // 计算总价
    total() {
      return this.shopLists.reduce((preval, item) => {
        return preval + item.count * item.present_price;
      }, 0);
    }
  }
};
</script>

<style scoped lang='scss'>
/deep/ .van-address-list__bottom {
  width: 0 !important;
  height: 0 !important;
  bottom: -200px;
}
.top {
  position: fixed;
  top: 0;
}
.split {
  width: 100vw;
  margin-top: 44px;
}
.address {
  width: 100%;
  height: 110px;
  margin-top: 44px;
}
.split0 {
  width: 100%;
  height: 10px;
  background: url("../../assets/img/caitiao.jpg");
}
.good {
  width: 95%;
  height: 100px;
  margin: 0 auto;

  .good-img {
    width: 100px;
    img {
      width: 80px;
    }
  }
  .good-de {
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 80%;
    .good-name {
      font-size: 16px;
      width: 256px;
      word-break: keep-all; /* 不换行 */
      white-space: nowrap; /* 不换行 */
      overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
      text-overflow: ellipsis;
    }
    .good-bottom {
      margin-top: 26px;
      width: 90%;
      font-size: 16px;
      .good-price {
        font-size: 18px;
        color: rgb(207, 81, 7);
        color: rgb(207, 81, 7);
      }
    }
  }
}
.wrapper {
  margin-bottom: 65px;
  height: 65.7vh;
  overflow: hidden;
}
</style>