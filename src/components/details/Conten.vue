<template>
  <div class="content">
    <div class="title">{{good.name}}</div>
    <div class="price">
      <span>￥{{good.present_price}}</span>
      <span>{{good.orl_price}}</span>
    </div>
    <div class="mount flex">
      <div>运费：{{good.__v}}</div>
      <div>剩余：{{good.amount}}</div>
      <div v-show="!flage" class="favorite">
        <span>收藏:</span>
        <span class="iconfont icon-shoucang" @click="favorite"></span>
      </div>
      <div v-show="flage" class="favorite">
        <span>已收藏:</span>
        <span class="iconfont icon-shoucangshixin icon-s" @click="favorite"></span>
      </div>
    </div>
    <div class="store flex">
      <div class="store-left">
        <span class="iconfont icon-dianpu"></span>
        <span>有赞的店</span>
        <span>官方</span>
      </div>
      <div class="store-right">
        <span>进入店铺</span>
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flage: false
    };
  },
  props: {
    good: {
      type: Object,
      default: () => {}
    },
    // flage: {
    //   type: Boolean,
    //   default: true
    // }
  },
  components: {},
  methods: {
    // 检查是否收藏
    isCollection() {
      this.$api
        .isCollection(this.good.id)
        .then(res => {
          if (res.code === 200) {
            if (res.isCollection === 1) {
              this.flage=true
              // this.$emit("update:flage", true);
            } else if (res.isCollection === 0) {
              this.flage=false
              // this.$emit("update:flage", false);
            }
          } else if (res.code === -1) {
            // this.$toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 收藏
    collection() {
      this.$api.collection(this.good).then(res => {
        if (res.code === 200) {
           this.flage=true
          // this.$emit("update:flage", true);
          // this.isCollection();
          this.$toast(res.msg);
        }
      });
    },
    // 取消收藏
    cancelCollection() {
      // console.log(this.good.id);
      this.$api
        .cancelCollection(this.good.id)
        .then(res => {
          if (res.code === 200) {
            this.isCollection();
             this.flage=false
            // this.$emit("update:flage", false);
            this.$toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击
    favorite() {
      this.$api
        .isCollection(this.good.id)
        .then(res => {
          if (res.code === 200) {
            if (res.isCollection === 1) {
              this.cancelCollection();
            } else if (res.isCollection === 0) {
              this.collection();
            }
          } else if (res.code === -1) {
            this.$toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {},
  watch: {
    good(val) {
      this.isCollection();
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.content {
  width: 90%;
  margin: 15px auto;
  .title {
    font-size: 17px;
  }
  .price {
    margin: 15px auto;
  }
  .price > span:nth-child(1) {
    font-size: 18px;
    color: rgb(175, 71, 11);
  }
  .price > span:nth-child(2) {
    margin-left: 10px;
    font-size: 15px;
    text-decoration: line-through;
    // color: rgb(175, 71, 11);
  }
  .mount {
    font-size: 16px;
    .favorite {
      display: flex;
      justify-content: flex-start;
    }
    .favorite > span:nth-child(1) {
      display: block;
      width: 55px;
    }
  }
  .store {
    margin: 15px auto;
  }
  .store-left {
    display: flex;
    justify-content: flex-start;
    align-content: center;
  }
  .store-left > span:nth-child(1) {
    font-size: 18px;
  }
  .store-left > span:nth-child(2) {
    font-size: 16px;
    margin: 0 5px;
  }
  .store-left > span:nth-child(3) {
    display: block;
    font-size: 16px;
    width: 40px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    background: rgb(206, 61, 17);
    color: white;
  }
  .store-right {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 16px;
    color: rgb(95, 95, 95);
  }
}
.icon-s{
  color: firebrick
}
</style>