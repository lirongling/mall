<template>
  <div>
    <!-- 顶部导航 -->
    <div class="top-bar">
      <mallTop>
        <div slot="left"></div>
        <div slot="title">个人中心</div>
        <div slot="right" @click="jumpMenu('/information')">
          <van-icon name="setting-o" />
        </div>
      </mallTop>
    </div>
    <!-- 头像 -->
    <div class="top">
      <div class="img">
        <div v-if="loginMsg===null"></div>
        <div v-else>
          <img :src="loginMsg.avatar" />
        </div>

        <!-- {{loginMsg}} -->
      </div>
      <div class="welcome" v-if="loginMsg!==null">
        <span>欢迎您!</span>
        <span>{{loginMsg.nickname}}</span>
      </div>
      <div v-else class="welcome">
        <span>暂未登录</span>
        <span @click="jumpLogin">点击即可登录</span>
      </div>
    </div>
    <!-- 订单 -->
    <div class="order flex">
      <van-tabbar v-model="active" @change="onChange" :fixed="false" active-color="#7d7e80">
        <van-tabbar-item class="iconfont icon-daifukuan" @click="jumpOrder(1)">代付款</van-tabbar-item>
        <van-tabbar-item class="iconfont icon-yiwancheng" @click="jumpOrder(2)">待发货</van-tabbar-item>
        <van-tabbar-item class="iconfont icon-tubiaolunkuo-" @click="jumpOrder(3)">待收货</van-tabbar-item>
        <van-tabbar-item
          class="iconfont icon-daishouhuo"
          :info="evaluationNumber"
          @click="jumpMenu('/evaluation')"
        >评价</van-tabbar-item>
        <van-tabbar-item class="iconfont icon-weibiaoti527" @click="jumpOrder(4)">已完成</van-tabbar-item>
      </van-tabbar>
    </div>
    <!-- 分割线 -->
    <div class="split">
      <van-divider />
    </div>
    <!-- 菜单栏 -->
    <div class="menu">
      <div class="menu-item flex" @click="jumpOrder(0)">
        <div class="item-left iconfont icon-dingdan">
          <span>全部订单</span>
        </div>
        <div class="item-right iconfont icon-iconfontzhizuobiaozhun19"></div>
      </div>
      <div class="split">
        <van-divider />
      </div>
      <div class="menu-item flex" @click="jumpMenu('/favorite')">
        <div class="item-left iconfont icon-shoucang1">
          <span>收藏商品</span>
        </div>
        <div class="item-right iconfont icon-iconfontzhizuobiaozhun19"></div>
      </div>
      <div class="split">
        <van-divider />
      </div>
      <div class="menu-item flex" @click="jumpMenu('/address')">
        <div class="item-left iconfont icon-dizhi">
          <span>地址管理</span>
        </div>
        <div class="item-right iconfont icon-iconfontzhizuobiaozhun19"></div>
      </div>
      <div class="split">
        <van-divider />
      </div>
      <div class="menu-item flex" @click="jumpMenu('/history')">
        <div class="item-left iconfont icon-zuijinliulan">
          <span>最近浏览</span>
        </div>
        <div class="item-right iconfont icon-iconfontzhizuobiaozhun19"></div>
      </div>
      <div class="split">
        <van-divider />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginMsg: "",
      active: 0,
      comment: []
    };
  },
  components: {},
  methods: {
    // 退出登录
    loginOut() {
      this.$api
        .loginOut()
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 立即登录
    jumpLogin() {
      this.$router.push("/login");
    },
    // 跳转页面
    jumpMenu(path) {
      if (this.loginMsg !== null) {
        this.$router.push(path);
      } else {
        this.isLogin();
      }
    },
    // 跳转到订单页面
    jumpOrder(num) {
      if (this.loginMsg !== null) {
        this.$router.push({ name: "allOrder", query: { num: num } });
      } else {
        this.isLogin();
      }
    },
    // 跳转到用户修改页面
    editUser() {
      // console.log('object');
      this.$router.push("/information");
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
    onChange() {},
    // 查询待评价
    tobeEvaluated() {
      this.$api
        .tobeEvaluated()
        .then(res => {
          if (res.code === 200) {
            this.comment = res.data.list;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.tobeEvaluated();
    this.loginMsg = JSON.parse(localStorage.getItem("loginMsg"));
  },
  mounted() {},
  watch: {},
  computed: {
    evaluationNumber() {
      if (this.comment.length > 0) {
        return this.comment.length;
      } else {
        return null;
      }
    }
  }
};
</script>

<style scoped lang='scss'>
/deep/ .van-info {
  top: -20px;
  right: -10px;
}
/deep/ .icon-daifukuan:before,
.icon-yiwancheng:before,
.icon-tubiaolunkuo-:before,
.icon-daishouhuo:before,
.icon-weibiaoti527:before {
  font-size: 28px;
  color: rgb(22, 21, 21);
}
.order {
  padding: 5px 3px;
  /deep/ .van-tabbar-item {
    font-size: 16px;
    color: rgb(22, 21, 21) !important;
  }
}
.top-bar {
  background: rgb(97, 23, 146);
  z-index: 999;
}
.top {
  width: 100%;
  height: 200px;
  background: rgb(97, 23, 146);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  .img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: azure;
  }
  .img img {
    width: 100%;
    border-radius: 50%;
  }
  .welcome {
    margin-top: 10px;
    font-size: 18px;
    color: rgb(202, 187, 187);
    font-weight: 600;
  }
  .welcome > span:nth-child(2) {
    margin-left: 10px;
    color: rgb(45, 149, 180);
  }
}
.menu-item {
  width: 90%;
  margin: 6px auto;
  .item-left {
    font-size: 20px;
  }
  .item-left > span {
    font-size: 17px;
    font-weight: 520;
    padding-left: 8px;
  }
}
.menu {
  margin-bottom: 50px;
}
</style>