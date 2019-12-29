<template>
  <div class="login">
    <div>
      <mallTop></mallTop>
    </div>
    <div>
      <div class="welcome">
        <div>手机号登录</div>
      </div>
      <div class="input">
        <van-cell-group>
          <van-field
            v-model="user.phone"
            clearable
            label="手机号"
            type="tel"
            placeholder="请输入手机号"
            required
            @blur="phoneBlur"
            @input="phoneInput"
          />

          <van-field
            required
            clearable
            v-model="user.code"
            center
            label="短信验证码"
            placeholder="请输入短信验证码"
            @blur="codeBlur"
          >
            <van-button
              slot="button"
              size="small"
              type="primary"
              :disabled="disabled"
              @click="sendCodes"
            >{{sendCode}}</van-button>
          </van-field>
        </van-cell-group>
      </div>
      <div class="btn flex">
        <van-button type="primary" size="large" @click="loginJump">立即登录</van-button>
      </div>
    </div>
    <ThirdParty></ThirdParty>
  </div>
</template>

<script>
import ThirdParty from "../../components//login//ThirdParty";
export default {
  data() {
    return {
      user: {
        phone: "",
        code: ""
      },
      disabled: true,
      flage: 0,
      num: 1,
      flagePhone: false,
      flageCode: false,
      sendCode: "发送验证码"
    };
  },
  components: {
    ThirdParty
  },
  methods: {
    // 手机号验证
    phoneBlur() {
      this.flagePhone = false;
      let a = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (this.user.phone === "") {
        // 警告通知
        this.$notify({ type: "warning", message: "手机号不能为空" });
      } else if (!this.user.phone.match(a)) {
        this.$notify({ type: "warning", message: "手机号不合法" });
      } else {
        this.disabled = false;
        this.flagePhone = true;
        this.num = 2;
      }
    },
    phoneInput() {
      let a = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (this.user.phone.match(a)) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    // 验证码的验证
    codeBlur() {
      this.flageCode = false;
      if (this.user.code === "") {
        // 警告通知
        this.$notify({ type: "warning", message: "验证码不能为空" });
      } else if (this.user.code.length !== 4 && this.user.code.length !== 6) {
        this.$notify({ type: "warning", message: "验证码为4位或6位" });
      } else {
        this.flageCode = true;
      }
    },
    loginJump() {
      if (this.flageCode && this.flageCode && this.flagePhone) {
        this.$dialog
          .confirm({
            title: "标题",
            message: "是否确认注册"
          })
          .then(() => {
            // this.getPhone();
          })
          .catch(() => {
            this.$toast("提示内容");
          });
      } else {
        this.$notify({ type: "warning", message: "请输入完整" });
      }
    },
    // 发送验证码
    sendCodes() {
      this.getCode()
      var count = 6;
      var timer = setInterval(() => {
        count--;
        if (count <= 0) {
          this.sendCode = "重新获取";
          this.disabled = false;
          clearInterval(timer);
        } else {
          this.sendCode = "已发送" + count;
          this.disabled = true;
        }
      }, 1000);
    },
    //调用接口验证
    getCode() {
       this.$axios
        .req("sendCodeMsg",{phone:this.user.phone})
        .then(res => {
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
/deep/ .van-button--large {
  width: 90%;
  margin: 0 auto;
  height: 40px;
  line-height: 40px;
}
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
  width: 90%;
  margin: 0 auto;
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
.btn {
  // margin-top: 100px;
}
</style>