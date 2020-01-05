<template>
  <div>
    <!-- 顶部 -->
    <div class="top">
      <mallTop>
        <div slot="title">地址列表</div>
      </mallTop>
      <!-- 分割线 -->
      <div class="split">
        <van-divider />
      </div>
    </div>
    <!-- 没有收货地址 -->
    <div v-if="address.length===0">
      <div class="no-address flex">暂无收货地址哟~~</div>
      <div class="addBt">
        <van-button type="primary" block @click="addAddress">新增地址</van-button>
      </div>
    </div>
    <div v-else class="add-list">
      <van-address-list
        v-model="chosenAddressId"
        :list="address"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: [],
      chosenAddressId: "1"
    };
  },
  components: {},
  methods: {
    // 获取所有地址
    getAddress() {
      this.$api
        .getAddress()
        .then(res => {
          if (res.code === 200) {
            this.address = res.address;
            this.chosenAddress()
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 默认选中地址
    chosenAddress() {
      let flage=0
      this.address.map(item => {
        if(item.isDefault){
          flage++
          item.id='1'
        }
      });
      if(flage===0){
        this.address[0].id='1'
      }
    },
    //新增地址
    addAddress() {
      console.log('object');
      this.$router.push("/addressEdit");
    },
    onAdd() {
      // Toast("新增地址");
    },
    onEdit(item, index) {
      this.$router.push({name:'addressEdit',query:{addressItem:item}})
    }
  },
  mounted() {
    this.getAddress();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.top {
  position: fixed;
  top: 0;
}
.split {
  width: 100vw;
  margin-top: 44px;
}
.no-address {
  margin-top: 130px;
  font-size: 16px;
  justify-content: center;
}
.addBt {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.add-list {
  margin-top: 60px;
}
</style>