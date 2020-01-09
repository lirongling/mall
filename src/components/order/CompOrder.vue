<template>
  <div>
    <div class="content">
      <div class="content-item1" v-for="(items,index) in orderList" :key="index">
        <div class="order_id">
          订单编号:
          <span>{{items.order_id}}</span>
        </div>
        <!-- 分割线 -->
        <div class>
          <van-divider />
        </div>
        <div class="content-item" v-for="(item,index) in items.order_list" :key="index">
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
          <div class="split1">
            <van-divider />
          </div>
        </div>
        <div class="add_time">
          创建时间
          <span>{{items.add_time}}</span>
        </div>
        <div class="add_time">
          收货地址:
          <span>{{items.address}}</span>
        </div>
        <div class="add_time">
          <span>共{{getMount(items.order_list)}}件商品 合计:￥{{Number(items.mallPrice).toFixed(2)}}</span>
        </div>
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
    orderList: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {
    getMount(items) {
      let count = 0;
      items.map(item => {
        count += item.count;
      });
      return count;
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.content-item1 {
  width: 90%;
  padding: 10px;
  background: rgb(245, 241, 245);
  margin: 15px auto;
  border-radius: 10px;
  .order_id {
    font-size: 16px;
    color: #3f3f3f;
  }
  .order_id > span {
    margin-left: 10px;
    font-size: 15px;
  }
  /deep/ .van-divider {
    border: 0 solid #9c9c9c;
  }
}
.good {
  width: 100%;
  height: 100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

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
      width: 236px;
      font-size: 16px;
      color: rgb(80, 76, 76);
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
.split1:nth-last-child() {
  height: 0;
}
.add_time {
  text-align: right;
  font-size: 13px;
  margin-bottom: 10px;
  color: #3f3f3f;
}
</style>