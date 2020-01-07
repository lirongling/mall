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
      <div class="content-top flex">
        <div class="img">
          <img :src="goods.image_path" />
        </div>
        <div class="sore flex">
          <div>商品评分</div>
          <van-rate   allow-half v-model="sore" :size="22" color="#ee0a24" void-icon="star" void-color="#eee" />
        </div>
      </div>
      <!-- 分割线 -->
      <!-- <div class>
        <van-divider />
      </div>-->
      <div class="conten-center">
        <div>
          <van-cell-group>
            <van-field
              v-model="message"
              rows="4"
              autosize
              size="large"
              label="评价"
              type="textarea"
              maxlength="120"
              placeholder="请输入留言"
              show-word-limit
            />
          </van-cell-group>
        </div>
        <div class="addPic">
          <van-uploader v-model="fileList" multiple :max-count="5" upload-text="添加图片" />
        </div>
      </div>
      <div class="content-bottom">
        <van-checkbox v-model="checked">匿名评价</van-checkbox>
      </div>
    </div>
    <div class="bt">
      <van-button
        round
        size="large"
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="submit"
      >确认提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods: this.$route.query.goods,
      sore: 5,
      message: "",
      fileList: [],
      checked: false
    };
  },
  components: {},
  methods: {
    // 确认提交
    submit() {
      if (this.message.trim() === "") {
        this.$toast("评价内容不能为空");
      } else if (this.message.length < 2) {
        this.$toast("评价内容最少二个字符");
      } else {
        this.comment();
      }
    },
    //上传评价
    comment() {
      this.$api
        .comment({
          rate: this.sore,
          content: this.message,
          anonymous: this.checked,
          _id: this.goods._id,
          order_id: this.goods.order_id,
          image: [],
          id: this.goods.cid
        })
        .then(res => {
          if(res.code===200){
            this.$toast(res.msg)
            this.$router.history.go(-1)
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
/deep/ .van-rate__item {
  margin-right: 15px;
}
/deep/ .van-cell {
  background: rgb(243, 244, 245);
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
  margin-top: 50px;
  .content-top {
    .img {
      width: 100px;
      img {
        width: 80px;
      }
    }
    .sore {
      flex: 1;
      height: 70px;
      flex-direction: column;
      align-items: flex-start;
    }
  }
  .conten-center {
    background: rgb(243, 244, 245);
    margin-top: 10px;
    .addPic {
      margin-left: 10px;
    }
  }
  .content-bottom {
    margin: 12px;
    font-size: 17px;
  }
}
.bt {
  position: fixed;
  width: 80%;
  margin: 0 auto;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
}
</style>