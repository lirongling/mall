<template>
  <div class="login">
    <div>
      <mallTop>
        <div slot="right" @click="register">注册</div>
      </mallTop>
    </div>
    <div>
      <div class="welcome">
        <div>您好,</div>
        <div>欢迎来到南风优选</div>
      </div>
      <div class="input">
        <van-cell-group>
          <van-field
            v-model="user.username"
            clearable
            label="用户名"
            placeholder="请输入用户名"
            required
            @blur="nameBlur"
          />
          <van-field
            v-model="user.password"
            clearable
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
            @blur="passBlur"
          />
          <div class="felx code">
            <van-field
              required
              v-model="user.code"
              label="验证码"
              placeholder="请输入验证码"
              @blur="codeBlur"
            />
            <img src="api/verify" alt ref="captcha" class="img" @click="afreshCode" />
          </div>
        </van-cell-group>
      </div>
      <div class="btn flex">
        <van-button type="primary" @click="phoneJump">手机号登录</van-button>
        <van-button type="info" @click="loginJump">立即登录</van-button>
      </div>
    </div>
    <ThirdParty></ThirdParty>
  </div>
</template>

<script>
import ThirdParty from "../../components/login/ThirdParty";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        code: ""
      },
      flage: 0,
      codeImg: "",
      flageName: false,
      flagePass: false,
      flageCode: false
    };
  },
  components: {
    ThirdParty
  },
  methods: {
    // 用户名验证
    nameBlur() {
      this.flageName = false;
      let a = /^[\u4e00-\u9fa5]{0,}$/;
      if (this.user.username === "") {
        // 警告通知
        this.$notify({ type: "warning", message: "用户名不能为空" });
      } else if (this.user.username.match(a)) {
        this.$notify({ type: "warning", message: "用户名不能有中文" });
      } else {
        this.flageName = true;
      }
    },
    // 密码验证
    passBlur() {
      this.flagePass = false;
      if (this.user.password === "") {
        // 警告通知
        this.$notify({ type: "warning", message: "密码不能为空" });
      } else if (this.user.password.length < 6) {
        this.$notify({ type: "warning", message: "密码不能小于6位" });
      } else {
        this.flagePass = true;
      }
    },
    // 验证码的验证
    codeBlur() {
      this.flageCode = false;
      if (this.user.code === "") {
        // 警告通知
        this.$notify({ type: "warning", message: "验证码不能为空" });
      } else if (this.user.code.length !== 4) {
        this.$notify({ type: "warning", message: "验证码为4位" });
      } else {
        this.flageCode = true;
      }
    },
    // 手机登录
    phoneJump() {
      this.$router.push("/phoneLogin");
    },
    // 立即登录
    loginJump() {
      if (this.flageCode && this.flageName && this.flagePass) {
        this.$dialog
          .confirm({
            title: "标题",
            message: "是否确认登录"
          })
          .then(() => {
            this.getLogin();
          })
          .catch(() => {
            this.$toast("提示内容");
          });
      } else {
        this.$notify({ type: "warning", message: "请输入完整" });
      }
    },
    register() {
      this.$router.push("/register");
    },
    // 获取验证码
    getCode() {
      this.$axios
        .req("verify")
        .then(res => {
          this.codeImg = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取验证码
    getCode() {
      this.$api.getAverify

        .then(res => {
          console.log(res);
          this.codeImg = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取接口验证用户信息
    getLogin() {
      this.$api
        .login({
          nickname: this.user.username,
          password: this.user.password,
          verify: this.user.code
        })
        .then(res => {
          console.log(res);
          if (res.code === -2) {
            this.user.code = "";
            this.afreshCode();
            this.$toast(res.msg);
          } else if (res.code === 200) {
            this.$router.push("/");
            this.$toast.success(res.msg);
            localStorage.setItem("loginMsg", JSON.stringify(res.userInfo));
            this.$store.state.userInfo = res.userInfo;
            this.history(res);
          } else if (res.code === -1) {
            this.user = "";
            this.afreshCode();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 更新验证码
    afreshCode() {
      this.$refs.captcha.src = "api/verify?time=" + Date.now();
    },
    // 保存历史纪录用户
    history(res) {
      if (JSON.parse(localStorage.getItem("historyShops"))) {
        let historyShops = JSON.parse(localStorage.getItem("historyShops"));

        let flage = historyShops.every(item => {
          return item.nickname !== res.userInfo.nickname;
        });
        if (flage) {
          historyShops.push({
            nickname: res.userInfo.nickname,
            goods: [],
            search: []
          });
          localStorage.setItem("historyShops", JSON.stringify(historyShops));
        }
      } else {
        let historyShops = [];
        historyShops.push({
          nickname: res.userInfo.nickname,
          goods: [],
          search: []
        });
        localStorage.setItem("historyShops", JSON.stringify(historyShops));
      }
    }
  },
  mounted() {
    //  this.getCode()
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.login {
  flex-direction: column;
  width: 100vm;
  height: 100vh;
  display: flex;
  margin: 0;
  padding: 0;

  justify-content: space-between;
  align-items: flex-start;
}
.login > div:nth-child(1) {
  flex: 1.5;
}
.login > div:nth-child(2) {
  margin: 0 auto;
  flex: 5;
}
.login > div:nth-child(3) {
  flex: 1.5;
}
.welcome {
  padding: 0 30px 20px 10px;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
}
.input {
  margin-top: 40px;
  margin-bottom: 50px;
}
.code {
  display: flex;
  justify-content: space-between;
  /deep/ .van-cell {
    width: 210px;
  }
}
.btn {
  width: 80%;
  margin: 0 auto;
  padding-top: 20px;
}
.bottom {
  width: 90%;
  height: 40px;
  margin: 0 auto;
  .icon {
    justify-content: center;
  }
  .icon > span {
    display: block;
    padding: 0 20px;
    font-size: 22px;
    color: rgb(105, 38, 38);
  }
  .icon > span:nth-child(1) {
    color: #4cafe9;
  }
  .icon > span:nth-child(2) {
    color: #3fcf77;
  }
  .icon > span:nth-child(3) {
    color: #e52425;
  }
}
</style>