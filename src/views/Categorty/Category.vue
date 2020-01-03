<template>
  <div class="category">
    <!-- 顶部导航栏 -->
    <div>
      <mallTop>
        <div slot="title">分类</div>
      </mallTop>
    </div>
    <div class="content1">
      <!-- 左侧导航栏 -->
      <van-tree-select
        :items="items"
        :active-id.sync="activeId"
        :main-active-index.sync="activeIndex"
        @click-nav="clickNav"
      >
        <!-- 插槽 -->
        <template slot="content">
          <!-- 右侧导航 -->
          <van-tabs  v-model="activeName" animated swipeable scrollspy sticky @change="changeSubName">
            <van-tab v-for="(item,index) in bxMallSubDto" :title="item.mallSubName" :key="index">
              <ScrollCate class="wrapper">
                <div class="good-content">
                  <div class="goods flex" v-for="(good,index) in goods" :key="index" >
                    <div class="goodss" @click="jumpDeta(good)">
                      <div class="goods-left">
                        <img :src="good.image" class="img" />
                      </div>
                      <div class="goods-right">
                        <div>{{good.name}}</div>
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
              </ScrollCate>
            </van-tab>
          </van-tabs>
        </template>
      </van-tree-select>
      <!-- <div class="content-right">
       
      </div>-->
    </div>
  </div>
</template>

<script>
import ScrollCate from "../../components/scroll/Scroll";
export default {
  data() {
    return {
      items: [],
      activeId: 1,
      activeIndex: 0,
      id: null,
      bxMallSubDto: [],
      index: 0,
      goods: [],
      activeName:0
    };
  },
  components: {
    ScrollCate
  },
  methods: {
    // 左侧点击
    clickNav(index) {
      this.index = index;
      this.activeName=0;
      this.bxMallSubDto = this.items[index].bxMallSubDto;
      this.id = this.items[this.index].bxMallSubDto[0].mallSubId;
      this.getCategotyId();
    },
    // 通过id获取数据
    getCategotyId() {
   
      this.$api
        .category(this.id)
        .then(res => {
          if (res.code === 200) {
            this.goods = res.dataList;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取全部分类
    getCategoty() {
      this.$api
        .recommend()
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            res.data.category.map(item => {
              this.items.push({
                text: item.mallCategoryName,
                id: item.mallCategoryId,
                bxMallSubDto: item.bxMallSubDto
              });
            });
            this.bxMallSubDto = this.items[0].bxMallSubDto;
            this.id = this.items[0].bxMallSubDto[0].mallSubId;
            if (this.$route.query.mallCategoryId) {
              this.activeId = this.$route.query.mallCategoryId;
              this.activeIndex = this.$route.query.mallCategoryId - 1;
              this.bxMallSubDto = this.items[this.activeIndex].bxMallSubDto;
              this.id = this.items[this.activeIndex].bxMallSubDto[0].mallSubId;
            }
            this.getCategotyId();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击右侧切换
    changeSubName(name, title) {
      this.id = this.items[this.index].bxMallSubDto[name].mallSubId;
      this.getCategotyId();
    },
         // 跳转到详情页
    jumpDeta(item){
      // console.log(item);
      this.$router.push({name:'details',query:{goodsId:item._id}})
    }
  },
  mounted() {
    this.getCategoty();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
// /deep/ .scroll-content {
//   // transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1)!important;
//   // transition-duration: 0ms!important;
//   // transform: translate(0px, -14px) scale(1) translateZ(0px) !important;
// }
.tabs {
  display: flex;
  flex-direction: column;
}
.split {
  width: 100%;
  height: 3px;
}
.category {
  width: 100%;
  margin: 0;
  padding: 0;
  .top {
    width: 100%;
    background: white;
    position: fixed;
    top: 0;
    z-index: 999;
    height: 10vh;
  }
  .content1 {
    margin-top: 54px;
    height: auto;
    /deep/ .van-tree-select__nav {
      width: 10vw !important;
      height: 85vh;
    }
    /deep/ .van-tree-select__nav-item {
      width: 100% !important;
    }
    /deep/ .van-tree-select__content {
      width: 90vw !important;
    }
    /deep/ .van-tree-select {
      width: 100vw !important;
      height: 85vh !important;
    }
    .content-left {
      flex: 1;
      background: rgb(218, 218, 169);
      // height: 100%;
    }
    .content-right {
      flex: 4;
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
  }
}
.wrapper {
  // margin-bottom: 65px;
  height: 76vh;
}
</style>