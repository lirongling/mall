<template>
  <div>
    <div class="top" v-if="num">
      <div v-if="num==='1'" class="top-content">
        <div>1F</div>
        <div>{{floorName}}</div>
      </div>
      <div v-if="num==='2'" class="top-content">
        <div>2F</div>
        <div>{{floorName}}</div>
      </div>
      <div v-if="num==='3'" class="top-content">
        <div>3F</div>
        <div>{{floorName}}</div>
      </div>
    </div>
    <div v-if="this.floor">
      <div class="bottom">
        <div class="left">
          <div>
            <img :src="floor[0].image" @click="jumpDeta(floor[0])"/>
          </div>
          <div>
            <img :src="floor[1].image" @click="jumpDeta(floor[1])"/>
          </div>
        </div>
        <div class="right">
          <div>
            <img :src="floor[2].image" @click="jumpDeta(floor[2])"/>
          </div>
          <div>
            <img :src="floor[3].image" @click="jumpDeta(floor[3])"/>
          </div>
          <div>
            <img :src="floor[4].image" @click="jumpDeta(floor[4])"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from "../../components/scroll/Scroll";
export default {
  data() {
    return {};
  },
  props: {
    floor: {
      type: Array,
      default: () => []
    },
    num: {
      type: String,
      default: ""
    },
    floorName: {
      type: String,
      default: ""
    }
  },
  components: {},
  methods: {
        // 跳转到详情页
    jumpDeta(item){
      this.$router.push({name:'details',query:{goodsId:item.goodsId}})
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.top {
  margin: 10px auto;
  padding: 10px;
  background: #eeeeee;
  .top-content {
    margin: 0 auto;
    text-align: center;
    display: flex;
    width: 120px;
    justify-content: center;
  }
  .top-content > div:nth-child(1) {
    display: flex;
    justify-content: center;
    align-content: center;
    background: #e0322b;
    color: white;
    padding: 3px;
    font-size: 13px;
    border-radius: 50%;
  }
  .top-content > div:nth-child(2) {
    display: flex;
    justify-content: center;
    align-content: center;
    color: #e0322b;
    align-items: center;
    padding-left: 5px;
    font-weight: 500;
    font-size: 19px;
  }
}
.bottom {
  background: white;
  display: flex;
  width: 100%;
  .left {
    flex: 1;
    border-right: rgb(199, 199, 199) 1px solid;
    display: flex;
    flex-direction: column;
    
  }
  .left > div:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex:2
  }
   .left > div:nth-child(2){
     flex: 1;
   }
  .left > div:nth-child(1) img {
    width: 100%;
    border-bottom: rgb(199, 199, 199) 1px solid;
  }
  .left > div:nth-child(2) img {
    width: 100%;
  }
  .right {
    flex: 1;
  }
  .right > div:nth-child(1) img,
  .right > div:nth-child(2) img {
    width: 100%;
    border-bottom: rgb(199, 199, 199) 1px solid;
  }
  .right > div:nth-child(3) img {
    width: 100%;
  }
}
</style>