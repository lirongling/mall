<template>
  <div>
    <div class="topBar flex">
      <div class="return flex">
        <div slot="left">
          {{city}}
          <span class="iconfont icon-xiala ico"></span>
        </div>
      </div>
      <div class="title">
        <van-search
          v-model="searchText"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          @input="onInput"
        >
          <div slot="action" @input="onInput">搜索</div>
        </van-search>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
      city: ""
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.history.go(-1);
    },
    // 搜索
    onInput() {},
    // 获取城市
    getCity() {
      let _this = this;
      AMap.plugin("AMap.CitySearch", function() {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function(status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            _this.city=result.city
          }else{
            _this.city='查询失败'
          }
        });
      });
    }
  },
  mounted() {
    this.getCity();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.topBar {
  width: 100%;
  z-index: 2;
  position: fixed;
  background: white;
  height: 10vh;
  top: 0;
}
.ico {
  font-size: 14px;
}
.topBar > div:nth-child(1),
.topBar > div:nth-child(3) {
  flex: 1.5;
  display: flex;
  justify-content: center;
  font-size: 14px;
}
.topBar > div:nth-child(2) {
  flex: 6;
  text-align: center;
  font-size: 17px;
  color: rgb(18, 18, 19);
}
</style>