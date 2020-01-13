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
        @select="clickItem"
      />
    </div>
  </div>
</template>

<script>
import Scroll from "../../components/scroll/Scroll";
export default {
  data() {
    return {
      address: [],
      chosenAddressId: "1",
      addressDe: {},
      from: ""
    };
  },
  components: {
    Scroll
  },
  methods: {
    // 获取所有地址
    getAddress() {
      this.$api
        .getAddress()
        .then(res => {
          if (res.code === 200) {
            this.address = res.address;
            if (this.address.length > 0) {
              this.chosenAddress();
            }
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 排序
    reverse() {
      this.address.reverse();
      this.address.unshift(this.addressDe);
    },
    // 默认选中地址
    chosenAddress() {
      let flage = 0;
      let b = 1;
      this.address.map((item, index) => {
        if (item.isDefault) {
          flage++;
          item.id = "1";
          this.addressDe = item;
          this.address.splice(index, 1);
          console.log(this.address);
          this.reverse();
        } else {
          b++;
          item.id = b;
        }
      });
      if (flage === 0) {
        if (this.address.length > 0) {
          this.address[this.address.length - 1].id = "1";
        }
      }
    },
    //新增地址
    addAddress() {
      // console.log("object");
      this.$router.push("/addressEdit");
    },
    // 点击切换
    clickItem(item, index) {
      this.$store.state.defaultAddress = item;
      if (this.$store.state.from === "settlement") {
        this.$router.history.go(-1);
      }
    },
    onAdd() {
      this.$router.push("/addressEdit");
    },
    onEdit(item, index) {
      this.$router.push({ name: "addressEdit", query: { addressItem: item } });
    }
  },
  mounted() {
    this.getAddress();
  },
  watch: {
    address(val) {
      if (val.length === 0) {
        this.$store.state.defaultAddress = "";
      }
    }
  },
  computed: {},
  beforeRouteEnter(to, from, next) {
    // 注意，在路由进入之前，组件实例还未渲染，所以无法获取this实例，只能通过vm来访问组件实例
    next(vm => {
      console.log(from.name);
      if (from.name === "settlement" || from.name === "my") {
        vm.$store.state.from = from.name;
      }
    });
  }
};
</script>

<style scoped lang='scss'>
// /deep/ .van-address-list__bottom {
//   width: 0 !important;
//   height: 0!important;
//   position: fixed !important;
//   bottom: 0;
//   width: 0;
// }
.top {
  position: fixed;
  top: 0;
  background: white;
  z-index: 999;
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
// .wrapper {
//   // margin-bottom: 65px;
//   height: 90vh;
//   overflow: hidden;
// }
</style>