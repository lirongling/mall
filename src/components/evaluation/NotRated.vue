<template>
  <div>
    <div class="review-item" v-for="(item,index) in comment" :key="index">
      <div class="goods flex">
        <div class="good-img flex">
          <img :src="item.image_path" />
        </div>
        <div class="good-de flex">
          <div class="good-name">{{item.name}}</div>
          <div class="good-price flex">
            <div class="price">￥{{Number(item.present_price).toFixed(2)}}</div>
            <div class="btn">
              <van-button
                round
                icon="chat-o"
                plain
                hairline
                type="danger"
                @click="sunOrder(item)"
              >评论晒单</van-button>
            </div>
            <!-- <div class="add-time">{{distanceTime(item.add_time)}}</div> -->
          </div>
        </div>
      </div>
      <!-- 分割线 -->
      <div class>
        <van-divider />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    comment: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {
    // 评论晒单
    sunOrder(item) {
      
      this.$router.push({ name: "sunOrder", query: { goods: item } });
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.review-item {
  width: 90%;
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
  .bt {
    width: 50px;
    justify-content: center;
    font-size: 18px;
    color: rgb(112, 112, 112);
  }
}
</style>