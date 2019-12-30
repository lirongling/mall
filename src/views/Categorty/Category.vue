<template>
  <div class="category">
    <div class="top">
      <mallTop>
        <div slot="title">分类</div>
      </mallTop>
    </div>
    <div class="content flex">
  
         <van-tabs v-model="activeName" class="tabs">
          <van-tab title="标签 1" name="a"></van-tab>
          <van-tab title="标签 2" name="b"></van-tab>
          <van-tab title="标签 3" name="c"></van-tab>
        </van-tabs>

      <!-- <div class="content-right">
       
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
       activeName: 'a'
    };
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.tabs{
  display: flex;
 flex-direction: column
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
  .content {
    margin-top: 54px;
    height: 90vh;
    .content-left {
      flex: 1;
      background: rgb(218, 218, 169);
      height: 100%;
     
    }
    .content-right {
      flex: 4;
    }
  }
}
</style>