<template>
  <div>
    <div class="topBar flex">
      <div class="return flex">
         {{city}}
        <div slot="left">
         
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
    onInput(){

    },
    // 获取城市
    getCity() {
      let _this = this;
      var map = new AMap.Map("container", {
        resizeEnable: true
      });
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          buttonPosition: "RB", //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "err", onError);
      });
      //解析定位结果
      function onComplete(data) {
        _this.city = data.addressComponent.city;
        console.log(data);
      }
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
  top: 0;
}
.topBar > div:nth-child(1),
.topBar > div:nth-child(3) {
  flex: 1;
  display: flex;
  justify-content: center;
}
.topBar > div:nth-child(2) {
  flex: 6;
  text-align: center;
  font-size: 17px;
  color: rgb(18, 18, 19);
}
</style>