<template>
  <div class="search">
    <!-- 搜索历史 -->
    <div class="hotCity" v-if="this.$store.state.searchText.length===0">
      <div class="cityTitle flex">
        <div>搜索历史</div>
        <div>
          <span class="clean iconfont icon-Eliminate" @click="cleanSearch"></span>
        </div>
      </div>
      <div class="split">
        <van-divider />
      </div>
      <div class="cityNa">
        <div class="nowCityName">
          <div v-for="(item,index) in searchHistoryss" :key="index">
            <van-tag round type="success" @click="selectSearch(item)">{{item}}</van-tag>
            <!-- <span class="cityItem" @click="selectSearch(item)">{{item}}</span> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="good-content">
      <div class="goods" v-for="(good,index) in searchGoods" :key="index">
        <div class="goodss" @click="jumpDeta(good)">
          <div class="goods-left">
            <img :src="good.image" class="img" />
          </div>
          <div class="goods-right">
            <div v-html="keyWords(good.name,$store.state.searchText)"></div>
            <div>
              <div class="present_price">￥{{good.present_price}}</div>
              <div class="orl_price">{{good.orl_price}}</div>
            </div>
          </div>
        </div>
        <div class="split">
          <van-divider />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from "../../assets/js/util";
export default {
  data() {
    return {
      searchGoods: [],
      keyWords: util.keyWord,
      searchHistorys: []
    };
  },
  components: {},
  methods: {
    // 请求搜索结果数据
    searchItem() {
      this.$api
        .search(this.$store.state.searchText, 1)
        .then(res => {
          if (res.code === 200) {
            this.searchGoods = res.data.list;
            if (res.data.list.length === 0) {
              this.$toast("暂无数据哟");
            } else {
              this.$toast("搜索成功,共有" + res.data.list.length + "条");
            }
            if (res.data.count > 0) {
              this.history();
            }
          } else if (res.code === -1) {
            this.searchGoods = [];
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 跳转到详情页
    jumpDeta(item) {
      // console.log(item);
      this.$router.push({ name: "details", query: { goodsId: item.id } });
    },
    // 清除搜索历史
    cleanSearch() {
      this.searchHistorys = [];
      if (JSON.parse(localStorage.getItem("loginMsg"))) {
        console.log("object");
        let loginMsg = JSON.parse(localStorage.getItem("loginMsg"));
        let historyShops = JSON.parse(localStorage.getItem("historyShops"));

        historyShops.map(item => {
          if (item.nickname === loginMsg.nickname) {
            item.search = [];
          }
          localStorage.setItem("historyShops", JSON.stringify(historyShops));
        });
      } else {
        let tourists = [];
        localStorage.setItem("tourists", JSON.stringify(tourists));
      }
    },
    // 点击搜索
    selectSearch(item) {
      this.$store.state.searchText = item;
    },
    // 存历史浏览
    history() {
      if (JSON.parse(localStorage.getItem("loginMsg"))) {
        let loginMsg = JSON.parse(localStorage.getItem("loginMsg"));
        let historyShops = JSON.parse(localStorage.getItem("historyShops"));
        historyShops.map(item => {
          if (item.nickname === loginMsg.nickname) {
            console.log(item.search.includes(this.$store.state.searchText));
            if (!item.search.includes(this.$store.state.searchText)) {
              item.search.unshift(this.$store.state.searchText);
              this.searchHistorys.unshift(this.$store.state.searchText);
            }
          }
        });
        localStorage.setItem("historyShops", JSON.stringify(historyShops));
      } else {
        if (JSON.parse(localStorage.getItem("tourists"))) {
          let tourists = JSON.parse(localStorage.getItem("tourists"));
          if (!tourists.includes(this.$store.state.searchText)) {
            tourists.unshift(this.$store.state.searchText);
            this.searchHistorys.unshift(this.$store.state.searchText);
            localStorage.setItem("tourists", JSON.stringify(tourists));
          }
        } else {
          let tourists = [];
          tourists.push(this.$store.state.searchText);
          this.searchHistorys.push(this.$store.state.searchText);
          localStorage.setItem("tourists", JSON.stringify(tourists));
        }
      }
    },
    // 获取搜索历史
    searchHistory() {
      if (JSON.parse(localStorage.getItem("loginMsg"))) {
        let loginMsg = JSON.parse(localStorage.getItem("loginMsg"));
        let historyShops = JSON.parse(localStorage.getItem("historyShops"));
        historyShops.map(item => {
          if (item.nickname === loginMsg.nickname) {
            this.searchHistorys = item.search;
          }
        });
      } else {
        this.searchHistorys = JSON.parse(localStorage.getItem("tourists"));
      }
    }
  },

  updated() {},
  mounted() {
    this.searchHistory();
    console.log(this.keyWords);
    // this.history();
  },
  filters: {
    keyWord(val) {
      // console.log($keyword);
    }
  },
  watch: {
    "$store.state.searchText": function() {
      // console.log(this.$store.state.searchText);
      setTimeout(() => {
        this.searchItem();
      }, 200);

      // this.$keyword.keyWord()
    }
  },

  computed: {
    searchHistoryss() {
      return this.searchHistorys;
    }
  }
};
</script>

<style scoped lang='scss'>
/deep/ .van-tag--round {
  // padding: 5px 10px;
  margin: 5px 10px;
  font-size: 13px;
}
.clean {
  font-size: 20px;
  color: #c4221c;
}
.search {
  margin-top: 30px;
}
.split {
  width: 100%;
}
.good-content {
  // height: 100%;
  padding-bottom: 80px;
  // margin-top: 50px;
  // height: auto;
  .goodss {
    width: 95%;
    margin: 10px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .goods {
    width: 95%;
    margin: 10px auto;

    // display: flex;
    // flex-direction: column;

    .goods-left {
      flex: 1;
    }
    .goods-right {
      flex: 4;
      height: 60px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
    .goods-right > div:nth-child(1) {
      font-size: 14px;
      padding-left: 5px;
    }
    .goods-right > div:nth-child(2) {
      margin-left: 10px;
      font-size: 14px;
      padding-left: 5px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .present_price {
        font-size: 18px;
        color: #c4221c;
        font-weight: 500;
      }
      .orl_price {
        text-decoration: line-through;
        margin-left: 10px;
      }
    }
    .img {
      width: 60px;
    }
  }
}
.cityItem {
  display: block;
  width: auto;
  height: 20px;
  // border: rgb(88, 119, 182) 1px solid;
  background: #afcec9;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(109, 105, 105);
  padding: 2px 15px;
  margin: 3px 12px;
}
.nowCityName {
  display: flex;
  flex-wrap: wrap;
}
// .hotCity {
//   // background: white;
// }
.cityTitle {
  width: 90%;
  margin: 10px auto;
  padding: 5px 0;
}
.hotCity {
  background: #d9e0e2;
  width: 95%;
  margin: 0 auto;
  border-radius: 5px;
  font-size: 16px;
}
.cityNa {
  margin: 10px auto;
  // background: white;
  padding: 5px 20px;
  height: auto;
}
</style>