<template>
  <div>
    <div class="content flex" @click="addAddress" v-if="defaultAddress.length===0">
      <div class="add">
        <span class="iconfont icon-add"></span>点击添加收获地址
      </div>
    </div>
    <div v-else class="address">
      <van-address-list :list="defaultAddress" @edit="addAddress" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultAddress: [],
      address: []
    };
  },
  components: {},
  methods: {
    //  获取默认地址
    getDefaultAddress() {
      this.$api
        .getDefaultAddress()
        .then(res => {
          if (res.code === 200) {
            if (res.defaultAdd !== null) {
              this.defaultAddress.push(res.defaultAdd);
              console.log(this.defaultAddress);
            } else {
              this.getAddress();
            }
            if (this.$store.state.defaultAddress.name) {
              this.defaultAddress = [];
              this.defaultAddress.push(this.$store.state.defaultAddress);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取所有地址
    getAddress() {
      this.$api
        .getAddress()
        .then(res => {
          if (res.code === 200) {
            console.log(res);
            this.$emit("send", this.address);
            this.defaultAddress = [];
            this.defaultAddress.push(res.address[res.address.length - 1]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 跳转到地址
    addAddress() {
      this.$router.push("/address");
    }
  },
  mounted() {
    this.getDefaultAddress();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.content {
  width: 100%;
  height: 110px;
  justify-content: center;
  align-items: center;

  // vertical-align: middle;
  .add {
    // height: 100%;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .add > span {
    font-size: 20px;
    margin-right: 10px;
  }
}
.address {
  /deep/ .van-address-item .van-radio__icon--checked .van-icon,
  .van-address-item__edit {
    width: 0 !important;
    height: 0 !important;
  }
}
</style>