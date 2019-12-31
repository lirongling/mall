<template>
  <div>
    <!-- 顶部导航 -->
    <div>
      <mallTop>
        <div slot="left"></div>
        <div slot="title">个人中心</div>
        <div slot="right">
          <van-icon name="setting-o" />
        </div>
      </mallTop>
    </div>
    <div class="top">
      <div class="img">
        <div v-if="loginMsg===null"></div>
        <div v-else><img :src="loginMsg.avatar"></div>
        <!-- {{loginMsg}} -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginMsg: ""
    };
  },
  components: {},
  methods: {},
  mounted() {
    this.loginMsg = JSON.parse(localStorage.getItem("loginMsg"));
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.top {
  width: 100%;
  height: 200px;
  background: rgb(97, 23, 146);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: azure
  }
  .img img{
    width: 100%;
    border-radius:50%; 
  }
}
</style>