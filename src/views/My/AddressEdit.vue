<template>
  <div>
    <!-- 顶部 -->
    <div class="top">
      <mallTop>
        <div slot="title">编辑地址</div>
      </mallTop>
      <!-- 分割线 -->
      <div class="split">
        <van-divider />
      </div>
    </div>
    <div class="content">
      <van-address-edit
        v-model="value"
        :area-list="areaList"
        show-delete
        show-set-default
        show-search-result
        :address-info="AddressInfo"
        @change-area="onChange"
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </div>
    <!-- {{value}} -->
  </div>
</template>

<script>
import area from "../../assets/js/area";
export default {
  data() {
    return {
      areaList: area,
      searchResult: [],
      show: false,
      content: [],
      value: [],
      AddressInfo: {}
    };
  },
  components: {},
  methods: {
    // 保存地址
    onSave(content) {
      console.log(content);
      this.$api
        .postAddress({
          name: content.name,
          tel: content.tel,
          province: content.province,
          city: content.city,
          county: content.county,
          addressDetail: content.addressDetail,
          areaCode: content.areaCode,
          isDefault: content.isDefault,
          address:
            content.province +
            content.city +
            content.county +
            content.addressDetail,
          chosenAddressId: content.isDefault ? "1" : "",
          id: this.show ? this.AddressInfo._id : undefined
        })
        .then(res => {
          if (res.code === 200) {
            this.$router.history.go(-1);
            this.$toast(res.msg);
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除按钮
    onDelete() {
      if (this.show) {
        this.$dialog
          .confirm({
            title: "提醒",
            message: "是否确认删除?"
          })
          .then(() => {
            this.$api
              .deleteAddress(this.AddressInfo._id)
              .then(res => {
                if (res.code === 200) {
                  this.$router.history.go(-1);
                  this.$toast(res.msg);
                }
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    // 自动提示
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "东方广场C座",
            address: "成都市锦江区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    },
    // 修改地址
    onChange(values) {
      console.log(values);
      values = this.$route.query.addressItem;
    }
    // 获取默认地址
  },
  mounted() {
    if (this.$route.query.addressItem) {
      this.AddressInfo = this.$route.query.addressItem;
      this.show = true;
    }
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
.content {
  margin-top: 60px;
}
</style>