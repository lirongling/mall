<template>
  <div>
    <div class="content flex" @click="addAddress">
      <div class="add"><span class="iconfont icon-add"></span>点击添加收获地址</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultAddress: null,
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
            this.defaultAddress = res.defaultAdd;
          }
          console.log(res);
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
            this.address = res.address;
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 跳转到地址
    addAddress(){
      this.$router.push('/address')
    }
  },
  mounted() {
    this.getDefaultAddress();
    this.getAddress();
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
   .add>span{
    font-size: 20px;
    margin-right: 10px;
  }
}
</style>