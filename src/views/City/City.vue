<template>
  <div class="city">
    <div class="top">
      <mallTop>
        <div slot="toptitle">选择城市</div>
      </mallTop>
    </div>
    <div class="split">
      <van-divider />
    </div>
    <div class="search">
      <van-search placeholder="请输入搜索关键词" v-model="searchValue" />
    </div>
    <div class="hotCity">
      <div class="cityTitle">当前城市</div>
      <div class="cityNa">
        <div class="nowCityName">
          <span
            class="cityItem"
            @click="selectCity($store.state.cityLoad)"
          >{{this.$store.state.cityLoad}}</span>
        </div>
      </div>
    </div>
    <div class="hotCity">
      <div class="cityTitle">热门城市</div>
      <div class="cityNa">
        <div class="nowCityName">
          <div v-for="(item,index) in city.data.hotCities" :key="index">
            <span class="cityItem" @click="selectCity(item.name)">{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <van-index-bar>
        <div v-for="(item,index) in city.data.cities" :key="index">
          <van-index-anchor :index="index" />
          <div v-for="(citys,index) in item" :key="index">
            <van-cell :title="citys.name" @click="selectCity(citys.name)" />
          </div>
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import city from "../../assets/js//city";
export default {
  data() {
    return {
      searchValue: "",
      city: city,
      searchCity: [],
      searchCity: []
    };
  },
  components: {},
  methods: {
    selectCity(name) {
      this.$store.state.city = name;
      this.$router.push("/");
      console.log(this.$store.state.city);
    }
  },
  mounted() {
    for (let i in this.city.data.cities) {
      // console.log(this.city.data.cities[i]); 
      this.searchCity=this.searchCity.concat(this.city.data.cities[i])
    }
  },
  watch: {
    searchValue(val) {
      this.searchCitys =this.searchCity.filter(item=>{
        return JSON.stringify(item.name).includes(val)
      });
      console.log(this.searchCitys);
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.top {
  background: white;
  z-index: 1.5;
  width: 100%;
  height: 44px;
  position: fixed;
  top: 0;
}
.city {
  background: #f2f2f2;
}
.split {
  margin-top: 44px;
}
.search {
  margin-top: -16px;
}
.nowCity {
  // width: 90%;
  // margin: 10px auto;
}

.cityItem {
  display: block;
  width: 65px;
  height: 25px;
  border: rgb(191, 192, 194) 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 8px;
}
.nowCityName {
  display: flex;
  flex-wrap: wrap;
}
.hotCity {
  // background: white;
}
.cityTitle {
  width: 90%;
  margin: 10px auto;
}
.cityNa {
  margin: 10px auto;
  background: white;
  padding: 5px 20px;
}
</style>