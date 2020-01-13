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
      <van-tabs v-model="active" animated swipeable>
        <van-tab v-for="(item,index) in tabsName" :key="index" :title="item">
          <!-- 滚动 -->
          <Scroll class="wrapper">
            <div class="all">
              <div v-if="active===0">
                <div class="comp">全部订单:</div>
                <CompOrder :orderList.sync="orderList"></CompOrder>
                <div class="no-list" v-if="orderList.length===0">暂无数据~~</div>
              </div>
              <div v-if="active===1">
                <div class="comp">待支付订单:</div>
                <div class="no-list">暂无数据~~</div>
              </div>
              <div v-if="active===2">
                <div class="comp">待发货订单:</div>
                <div class="no-list">暂无数据~~</div>
              </div>
              <div v-if="active===3">
                <div class="comp">待收货订单:</div>
                <div class="no-list">暂无数据~~</div>
              </div>
              <div v-if="active===4">
                <div class="comp">已完成订单:</div>
                <CompOrder :orderList.sync="orderList"></CompOrder>
                <div class="no-list" v-if="orderList.length===0">暂无数据~~</div>
              </div>
            </div>
            <!-- <ShopCarList></ShopCarList> -->
          </Scroll>
        </van-tab>
        <div></div>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import CompOrder from "../../components/order/CompOrder";
import Scroll from "../../components/scroll/Scroll";
export default {
  data() {
    return {
      tabsName: ["全部", "待支付", "待发货", "待收货", "已完成"],
      active: this.$route.query.num,
      orderList: []
    };
  },
  components: {
    CompOrder,
    Scroll
  },
  methods: {
    // 查询订单
    getMyOrder() {
      this.$api
        .getMyOrder()
        .then(res => {
          if (res.code === 200) {
            this.orderList = res.list;
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.getMyOrder();
  },
  mounted() {
    console.log(this.$route.query.num);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
/deep/ .van-tabs__nav {
  position: fixed;
  width: 100%;
  top: 44px;
  background: white;
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
  // width: 95%;
  // margin: 0 ;
  margin-top: 50px;
}
.wrapper {
  padding-bottom: 65px;
  height: 72.9vh;
  // overflow: hidden;
}
.all {
  padding-bottom: 80px;
}
.comp {
  margin: 20px;
  font-size: 16px;
}
.no-list {
  margin: 20px;
  font-size: 16px;
  text-align: center;
}
</style>