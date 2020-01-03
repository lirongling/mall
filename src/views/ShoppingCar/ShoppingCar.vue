<template>
  <div>
    <!-- 顶部导航 -->
    <div>
      <mallTop>
        <div slot="left"></div>
        <div slot="title">购物车</div>
      </mallTop>
    </div>
    <!-- 分割线 -->
    <div class="split">
      <van-divider />
    </div>
    <div v-if="loginMsg===null||this.$store.state.shopListNumber===0">
      <NoLogin :shopList="shopList" :loginMsg="loginMsg"></NoLogin>
    </div>
    <div v-else class="shopCar">
      <div class="top flex">
        <div class="top-bar">
          <div class="bar-img"></div>
          <div class="bar-text">全选</div>
        </div>
        <div class="top0"></div>
        <div class="top-price">合计:</div>
      </div>
      <div class="split">
        <van-divider />
      </div>
      <div class="content flex" v-for="(item,index) in shopList">
        <div class="content-left">
          <div class="bar-img"></div>
        </div>
        <div class="content-right flex">
          <div class="img">
            <img :src="item.image_path" />
          </div>
          <div class="good">
            <div class="good-name">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoLogin from "../../components/shopCar/NoLogin";
import ShopCarList from "../../components/shopCar/ShopCarList";
export default {
  data() {
    return {
      loginMsg: {},
      shopList: []
    };
  },
  components: {
    NoLogin,
    ShopCarList
  },
  methods: {
    getCar() {
      this.$api
        .getCard()
        .then(res => {
          if (res.code === 200) {
            this.shopList = res.shopList;
            console.log(this.shopList.length);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getCar();
  },
  mounted() {
    this.loginMsg = JSON.parse(localStorage.getItem("loginMsg"));
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.split {
  margin-top: 44px;
}
.top {
  width: 90%;
  margin: 10px auto;
  .top-bar {
    flex: 2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .top-price {
    flex: 4;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .top0 {
    flex: 1;
  }
}
.content {
  width: 90%;
  height: 80px;
  margin: 10px auto;
  .content-left {
    flex: 1;
  }
  .content-right {
    flex: 5;
    height: 100%;
    background: bisque;
    .img {
      flex: 1.2;
    }
    .good {
      flex: 4;
      padding: 3px 10px;
      .good-name{
        font-size: 13px;
        color: rgb(221, 100, 19);
      //   word-break: keep-all; /* 不换行 */
      // white-space: nowrap; /* 不换行 */
      // overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
      // text-overflow: ellipsis; 
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
.bar-text {
  margin-left: 8px;
  font-size: 16px;
}
</style>