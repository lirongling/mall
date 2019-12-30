<template>
  <div class="login">
    <div>
      <mallTop></mallTop>
    </div>
    <div>
      <div class="welcome">
        <div>您好,</div>
        <div>欢迎注册南风优选</div>
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
          <van-field
            v-model="checkPass"
            clearable
            type="password"
            label="确认密码"
            placeholder="请再次输入密码"
            required
            @blur="checkPassBlur"
          />
          <div class="felx code">
            <van-field
              required
              v-model="user.code"
              label="验证码"
              placeholder="请输入验证码"
              @blur="codeBlur"
            />
                 <img src="api/verify" alt ref="captcha" class="img" @click="afreshCode"/>
          </div>
        </van-cell-group>
      </div>
      <div class="btn flex">
        <van-button type="primary" size="large" @click="registerJump">立即注册</van-button>
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
      codeImg: "",
      checkPass: "",
      flageName: false,
      flagePass: false,
      flageCheck: false,
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
    // 确认密码
    checkPassBlur() {
      this.flageCheck = false;
      if (this.checkPass === "") {
        // 警告通知
        this.$notify({ type: "warning", message: "密码不能为空" });
      } else if (this.user.password !== this.checkPass) {
        this.$notify({ type: "warning", message: "两次输入的密码不一致" });
      } else {
        this.flageCheck = true;
      }
    },
    // 获取验证码
    getCode() {
      this.$axios
        .req("verify")
        .then(res => {
          this.codeImg = res;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    registerJump() {
      if (this.flageName && this.flagePass && this.flageCheck) {
        this.$dialog
          .confirm({
            title: "标题",
            message: "是否确认注册"
          })
          .then(() => {
            this.getRegister();
          })
          .catch(() => {
            this.$toast("提示内容");
          });
      } else {
        this.$notify({ type: "warning", message: "请输入完整" });
      }
    },
    //调取接口验证注册
    getRegister() {
      this.$axios
       this.$api.register({
          nickname: this.user.username,
          password: this.user.password,
          verify: this.user.code
        })
        .then(res => {
          console.log(res);
          if (res.code === -2) {
            this.user.code=''
            this.afreshCode()
            this.$toast(res.msg);
          } else if (res.code === 200) {
            this.$router.push("/login");
            this.$toast.success(res.msg);
          } else if (res.code === -1) {
            this.user=''
            this.afreshCode()
            this.$toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 更新验证码
    afreshCode() {
      this.$refs.captcha.src = "api/verify?time=" + Date.now();
    }
  },
  mounted() {
    // this.getCode();
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
  flex: 1;
}
.code {
  display: flex;
  justify-content: space-between;
  /deep/ .van-cell {
    width: 210px;
  }
}
.login > div:nth-child(2) {
  margin: 0 auto;
  flex: 5.5;
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
  margin-top: 30px;
  margin-bottom: 50px;
}
</style>