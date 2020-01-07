<template>
  <div>
    <!-- 顶部 -->
    <div class="top">
      <mallTop>
        <div slot="title">个人资料</div>
      </mallTop>
      <!-- 分割线 -->
      <div class="split">
        <van-divider />
      </div>
    </div>
    <div class="content">
      <div class="avatar flex">
        <div class="avatar-title">头像</div>
        <div class="avatar-img flex">
          <van-uploader :after-read="afterRead">
            <div class="avatar-img flex">
              <img :src="loginMsg.avatar" />
              <span class="back">
                <van-icon name="arrow" />
              </span>
            </div>
          </van-uploader>
        </div>
      </div>
      <!-- 分割线 -->
      <div class>
        <van-divider />
      </div>
      <div class="nickname flex">
        <van-field v-model="loginMsg.nickname" label="昵称" placeholder="请输入昵称" />
      </div>
      <!-- 分割线 -->
      <div class>
        <van-divider />
      </div>
      <div class="nickname flex">
        <van-field v-model="loginMsg.username" disabled label="用户名" placeholder="请输入用户名" />
      </div>
      <!-- 分割线 -->
      <div class>
        <van-divider />
      </div>
      <div class="nickname flex">
        <div class="sex flex">
          <div class="sex-title">性别</div>
          <div>
            <van-radio-group v-model="loginMsg.gender" class="flex">
              <van-radio name="男">男</van-radio>
              <van-radio name="女">女</van-radio>
            </van-radio-group>
          </div>
        </div>
      </div>
      <!-- 分割线 -->
      <div class>
        <van-divider />
      </div>
      <div class="nickname flex">
        <van-field v-model="loginMsg.email" label="邮箱" placeholder="请输入邮箱" />
      </div>
      <!-- 分割线 -->
      <div class>
        <van-divider />
      </div>
      <div class="nickname date-time flex">
        <div class="sex flex">
          <div class="sex-title">出生年月</div>
          <div
            v-if="!showTime"
            @click="choseTime"
          >{{loginMsg.year}}年{{loginMsg.month}}月{{loginMsg.day}}日</div>
          <van-popup v-model="showTime" position="bottom" :style="{ height: '40%' }">
            <van-datetime-picker
              v-model="currentDate"
              type="date"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="confirm"
              @cancel="cancel"
            />
          </van-popup>
          <!-- <div class="time-date" v-if="showTime"></div> -->
        </div>
      </div>
      <div class="bt">
        <div class="bt-sure">
          <van-button
            round
            size="large"
            color="linear-gradient(to right, #4bb0ff, #6149f6)"
            @click="sureUser"
          >确认修改</van-button>
        </div>
        <van-button round size="large" color="#7232dd" plain @click="loginOut">退出登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginMsg: {},
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      showTime: false
      // fileList: [{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }]
    };
  },
  components: {},
  methods: {
    // 选择日期
    choseTime() {
      this.showTime = true;
    },
    // 确认
    confirm(value) {
      this.loginMsg.year = this.$dayjs(value).format("YYYY");
      this.loginMsg.month = this.$dayjs(value).format("MM");
      this.loginMsg.day = this.$dayjs(value).format("DD");
      this.showTime = false;
    },
    // 取消
    cancel() {
      this.showTime = false;
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      this.loginMsg.avatar = file.content;
    },
    // 返回布尔值
    beforeRead(file) {
      if (file.type !== "image/jpeg") {
        Toast("请上传 jpg 格式图片");
        return false;
      }

      return true;
    },
    // 退出登录
    loginOut() {
      this.$api
        .loginOut()
        .then(res => {
          if (res.code === 0) {
            this.$toast("退出成功");
            localStorage.removeItem("loginMsg");
            this.$router.history.go(-1);
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 确认修改
    sureUser() {
      console.log(this.loginMsg);
      let a = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (this.loginMsg.nickname == "" || this.loginMsg.email == undefined) {
        this.$toast("用户信息不能为空");
      } else if (!this.loginMsg.email.match(a)) {
        this.loginMsg.email = "";
        this.$toast("邮箱格式输入有误");
      } else {
        this.$api
          .saveUser({
            gender: this.loginMsg.gender,
            email: this.loginMsg.email,
            year: this.loginMsg.year,
            month: this.loginMsg.month,
            day: this.loginMsg.day,
            nickname: this.loginMsg.nickname,
            id: this.loginMsg._id
          })
          .then(res => {
            if (res.code === 200) {
              this.$toast(res.msg);
              this.loginMsg = res.user;
              localStorage.setItem("loginMsg", JSON.stringify(res.user));
              this.$router.history.go(-1);
              // this.$router.push({
              //   name: "my",
              //   query: { loginMsg: this.loginMsg }
              // });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 获取用户信息
    getUser() {
      this.$api
        .user()
        .then(res => {
          if (res.code === 200) {
            this.loginMsg = res.userInfo;
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getUser();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
/deep/ .van-picker__columns {
  width: 100% !important;
}
/deep/ .van-uploader__preview-image,
.van-uploader__input {
  border-radius: 50% !important;
  width: 35px !important;
  height: 35px !important;
}


.top {
  position: fixed;
  top: 0;
}
.split {
  width: 100vw;
  margin-top: 44px;
}
.back {
  font-size: 20px;
  color: rgb(122, 122, 122);
}
.bt-sure {
  margin: 10px auto;
  margin-top: 60px;
}
.content {
  width: 90%;
  margin: 10px auto;
  margin-top: 70px;
  font-size: 16px;

  .avatar {
    .avatar-title {
      margin-left: 18px;
    }
    .avatar-img {
      justify-content: flex-start;
      height: 35px;
    }
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
  }
  .sex-title {
    margin-left: 18px;
    margin-right: 50px;
  }
  .time-date {
    margin-left: -20px;
  }
}
</style>