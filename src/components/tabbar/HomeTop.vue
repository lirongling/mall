<template>
  <div>
    {{this.$store.state.city}}
    <div class="topBar flex">
      <div class="return flex">
        <div slot="left" @click="changeCity">
          <span v-if="this.$store.state.city!==0">{{this.$store.state.city}}</span>
          <span v-else>{{this.$store.state.cityLoad}}</span>
          <span class="iconfont icon-xiala ico"></span>
        </div>
      </div>
      <div class="title" >
        <div v-if="!showPop" class="search1">
          <van-search
            placeholder="请输入搜索关键词"
            v-model="searchText"
            @input="onInput"
            @click="turnPop"
          />
        </div>
        <div v-else>
          <van-search v-model="$store.state.searchText" placeholder="请输入搜索关键词" show-action @cancel="onCancel" />
        </div>

        <!-- <van-search
          v-model="searchText"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          @input="onInput"
          @click="turnPop"
        >
          <div slot="action" @input="onInput">搜索</div>
        </van-search>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText:this.$store.state.searchText,
      city: "定位中..."
    };
  },
  props: {
    showPop: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  methods: {
    back() {
      this.$router.history.go(-1);
    },
    // 切换城市
    changeCity() {
      this.$router.push("/city");
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
            _this.city = result.city;
            _this.$store.state.cityLoad = result.city;
          } else {
            _this.city = "查询失败";
          }
        });
      });
    },
    // 打开pop弹框
    turnPop() {
      this.$parent.showPop = true;
    },
    onCancel() {
      this.$parent.showPop = false;
    }
  },
  mounted() {
    this.getCity();
  },
  watch: {
    searchText(val) {
      this.$store.state.searchText=val
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
/deep/ .van-search--show-action {
  height: 10vh !important;
}
.search1{
  /deep/ .van-search{
    margin-top: 6px;
  }
}
// .title{
//   // vertical-align: middle
//   // display: flex;
//   // align-items: center;
// }
.topBar {
  width: 100%;
  z-index: 2;
  position: fixed;
  background: white;
  height: 10vh;
  // border:forestgreen 1px solid;
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
  height: 10vh;
}
.topBar > div:nth-child(2) {
  flex: 6;
  text-align: center;
  font-size: 17px;
  color: rgb(18, 18, 19);
  height: 10vh;
}
</style>