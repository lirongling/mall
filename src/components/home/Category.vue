<template>
  <div class="category">
    <div v-for="(categorys,index) in category" :key="index" @click="jumpCate(categorys)">
      <div><img :src="categorys.image" class="img"></div>
      <div class="title">{{categorys.mallCategoryName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    category: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {
    jumpCate(categorys){
     
      this.$router.push({name:'category',query:{mallCategoryId:categorys.mallCategoryId}})
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.category{
  width: 100%;
  height:auto;
  display: flex;
  justify-content: space-around;
  .category>div{
    width: 16%;
  }
  .img{
    width: 100%;
     margin-top: 10px ;
  }
  .title{
    font-size: 12px;
    margin: 10px 0;
    text-align: center;
  }
}
</style>