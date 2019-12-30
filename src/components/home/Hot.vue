<template>
  <div>
    <div class="top">热销商品</div>
    <div class="contior">
      <div class="contior-item" v-for="(hotGood,index) in hotGoods" :key="index">
        <img :src="hotGood.image" />
        <div class="goodName">{{hotGood.name}}</div>
        <div class="goodPrice">
          <div>${{hotGood.mallPrice}}</div>
          <div>{{hotGood.price}}</div>
        </div>
      </div>
 
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    hotGoods: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.top {
  margin: 10px auto;
  padding: 10px;
  color: #e0322b;
  font-weight: 500;
  font-size: 19px;
  text-align: center;
  background: #eeeeee;
}
.contior {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background: white;
  .contior-item {
    width: 49.72%;
    border-bottom: rgb(199, 199, 199) 1px solid;
    // border-right: rgb(199, 199, 199) 1px solid;
    .goodName {
      width: 80%;
      font-size: 16px;
      margin: 5px auto;
      word-break: keep-all; /* 不换行 */
      white-space: nowrap; /* 不换行 */
      overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
      text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    }
    .goodPrice {
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content:center;
      padding-bottom: 10px;
      align-content: center;
      
    }
    .goodPrice>div:nth-child(1){
      font-size: 18px;
      color: #c4221c;
      font-weight: 600;
    }
     .goodPrice>div:nth-child(2){
      font-size: 15px;
      color: #464343;
      display: flex;
      align-items: center;
      margin-left: 10px;
      text-decoration: line-through;
      
      
    }
      
  }
  .contior-item img {
    width: 100%;
  }
}
</style>