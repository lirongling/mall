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
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </div>
  </div>
</template>

<script>
import area from "../../assets/js/area";
export default {
  data() {
    return {
      areaList: area,
      searchResult: []
    };
  },
  components: {},
  methods: {
    // 保存地址
    onSave(content) {
      console.log(content);
      this.$api.postAddress({
        name: content.name,
        tel: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        addressDetail: content.addressDetail,
        areaCode: content.areaCode,
        isDefault: content.isDefault,
        address: content.province+content.city+content.county+content.addressDetail,
        chosenAddressId:content.isDefault ? '1':''
      }).then(res=>{
        if(res.code===200){
          this.toast(res.msg)
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    onDelete(content) {
      content.name=''
    },
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
    }
  },
  mounted() {
    console.log(this.$route.query.addressItem);
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