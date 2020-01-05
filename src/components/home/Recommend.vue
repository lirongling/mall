<template>
  <div class="recommend">
    <div class="title">商品推荐</div>
    <ScrollLeft>
      <div class="recommend-content">
        <div v-for="(recommends,index) in recommend" :key="index" class="recommend-item">
          <div class="recommend-img">
            <img :src="recommends.image" class="img" />
          </div>
          <div class="goodPrice">
            <div>￥{{recommends.mallPrice}}</div>
            <div>{{recommends.price}}</div>
          </div>
          <div class="recommends-bottom">
            <div class="flex" @click="addShop(recommends)">
              <van-icon name="shopping-cart-o" />
            </div>
            <div class="flex" @click="jumpDeta(recommends)">查看详情</div>
          </div>
        </div>
      </div>
    </ScrollLeft>
  </div>
</template>

<script>
import ScrollLeft from "../scroll/ScrollLeft";

export default {
  data() {
    return {};
  },
  components: {
    ScrollLeft
  },
  props: {
    recommend: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 跳转到详情页
    jumpDeta(item) {
      this.$router.push({ name: "details", query: { goodsId: item.goodsId } });
    },
    // 加入购物车
    addShop(item) {
      this.$api.addShop(item.goodsId).then(res => {
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
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.recommend {
  // width: auto;
  height: 100%;
  background: white;
  .title {
    padding: 10px;
  }
  .recommend-content {
    // overflow: auto;
    display: flex;
    width: 2140px;
    .recommend-item {
      width: 124px;
      border-right: rgb(199, 199, 199) 1px solid;
      border-top: rgb(199, 199, 199) 1px solid;
      .recommend-img {
        width: 124px;
        .img {
          width: 90%;
        }
      }
      .recommends-bottom {
        width: 80%;
        margin: 10px auto;
        height: 30px;
        border-radius: 5px;
        background: blanchedalmond;
        display: flex;
      }
      .recommends-bottom > div:nth-child(1) {
        flex: 2;
        justify-content: center;
        background: #feca3a;
        border-radius: 5px 0 0 5px;
        color: white;
      }
      .recommends-bottom > div:nth-child(2) {
        flex: 5;
        justify-content: center;
        background: #ff4c38;
        border-radius: 0 5px 5px 0;
        font-size: 13px;
      }
    }
  }
}
.goodPrice {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  padding-bottom: 3px;
  align-content: center;
}
.goodPrice > div:nth-child(1) {
  font-size: 17px;
  color: #0c0c0c;
  font-weight: 500;
}
.goodPrice > div:nth-child(2) {
  font-size: 15px;
  color: #464343;
  display: flex;
  align-items: center;
  margin-left: 10px;
  text-decoration: line-through;
}
</style>