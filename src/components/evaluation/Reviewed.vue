<template>
  <div>
    <div class="review-item" v-for="(item,index) in reviewed" :key="index">
      <div class="goods flex">
        <div class="good-img flex">
          <img :src="item.goods[0].image" />
        </div>
        <div class="good-de flex">
          <div class="good-name">{{item.goods[0].name}}</div>
          <div class="good-price flex">
            <div class="price">
              <span>{{distanceTime(item.comment_time)}}评价</span>
            </div>
            <div class="btn">
              <van-button
                round
                icon="search"
                plain
                hairline
                type="default"
                @click="orderDe(item)"
              >查看评价</van-button>
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
    reviewed: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {
    // 计算时间
    distanceTime(oldTime) {
      let newTime = new Date();
      //  let time2 = this.$dayjs(newTime).format('YYYY-MM-DD hh:mm:ss')
      // valueOf是转换成时间戳
      let sputTme =
        this.$dayjs(newTime).valueOf() - this.$dayjs(oldTime).valueOf();
      let mounth = sputTme / (30 * 24 * 60 * 60 * 1000);
      let time = sputTme / (24 * 60 * 60 * 1000);
      let hour = sputTme / (60 * 60 * 1000);
      let minu = sputTme / (60 * 1000);
      if (mounth > 1) {
        return parseInt(mounth + 1) + "个月前";
      } else if (mounth < 1 && time >= 1) {
        return parseInt(time) + "天前";
      } else if (time < 1 && hour >= 1) {
        return parseInt(hour) + "小时前";
      } else if (hour < 1) {
        return parseInt(minu) + "分钟前";
      }
    },
    // 查看详情
    orderDe(item) {
      this.$router.push({ name: "evaluationDetails", query: { goods: item } });
    }
  },
  mounted() {
    console.log(this.reviewed);
  },
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
        width: 100px;
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