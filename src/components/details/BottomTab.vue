<template>
  <div>
    <van-tabs @click="onClick">
      <van-tab title="商品详情">
        <div v-html="good.detail"></div>
      </van-tab>
      <van-tab title="商品评论">
        <div class="no-comment" v-if="comment.length===0">暂无数据~~</div>
        <div class="comment" v-else>
          <div class="comment-item" v-for="(item,index) in comment" :key="index">
            <div class="comment-content">
              <div class="content-top flex">
                <div class="img">
                  <div v-if="item.anonymous">
                    <img :src="item.comment_avatar" />
                  </div>
                  <div v-else-if="item.user">
                    <img :src="item.user[0].avatar" />
                  </div>
                </div>
                <div class="content-user flex">
                  <div class="content-name flex">
                    <div v-if="item.anonymous">匿名</div>
                    <div v-else-if="item.user">{{item.user[0].nickname}}</div>
                    <div class="rate">
                      <van-rate
                        allow-half
                        v-model="item.rate"
                        :size="16"
                        color="#ee0a24"
                        void-icon="star"
                        void-color="#eee"
                        readonly
                      />
                    </div>
                  </div>
                  <div class="content-time">{{item.comment_time}}</div>
                </div>
                <div class="bt flex">
                  <van-icon name="bars" @click="chose" />
                </div>
              </div>
              <div class="content-center">{{item.content}}</div>
            </div>
            <!-- 分割线 -->
            <div class>
              <van-divider />
            </div>
            <div class="show-pop">
              <van-popup v-model="show" round position="bottom" :style="{ height: '13%' }">
                <div class="show">
                  <div class="show-top">我要举报</div>
                  <!-- 分割线 -->
                  <div class="show-split">
                    <van-divider />
                  </div>
                  <div class="show-bottom" @click="cancel">取消</div>
                </div>
              </van-popup>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  props: {
    good: {
      type: Object,
      default: () => {}
    },
    comment: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {
    onClick(name, title) {
      // this.$toast(title);
    },
    // 打开弹框
    chose() {
      this.show = true;
    },
    // 取消
    cancel() {
      this.show = false;
    }
    // // 查询商品评论
    // evaluateOne() {
    //   this.$api
    //     .evaluateOne(this.good._id)
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  },
  mounted() {
    // this.evaluateOne();
    // console.log(this.comment);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
/deep/ .van-divider {
  margin: 8px auto;
  border: 0 solid #bebebe;
}
// .show-pop{
//   z-index: 99999;
// }
.comment {
  .comment-item {
    width: 90%;
    margin: 10px auto;
    .content-top {
      justify-content: flex-start;
      height: 60px;
      .img {
        img {
          width: 40px;
        }
      }
      .content-user {
        margin-left: 10px;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        height: 60px;
        .content-name {
          justify-content: flex-start;
          margin-top: 5px;
        }
        .content-time {
          font-size: 14px;
          color: rgb(132, 133, 133);
        }
      }
      .bt {
        flex: 1;
        justify-content: flex-end;
      }
    }
    .content-center {
      width: 90%;
      margin: 10px auto;
      font-size: 15px;
      margin-left: 50px;
    }
  }
}
.show {
  width: 100%;
  height: 90%;
  font-size: 15px;
  text-align: center;
  display: flex;
  justify-items: center;
  flex-direction: column;
  align-items: center;
  // padding-top: 5px;
  margin-top: 8px;
  .show-split {
    width: 100%;
    // height: ;
  }
}
.no-comment {
  margin-top: 20px;
  width: 100%;
  text-align: center;
  font-size: 16px;
}
</style>