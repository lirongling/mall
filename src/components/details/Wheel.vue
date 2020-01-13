<template>
  <div>
    <div class="top">
      <van-swipe :autoplay="3000" :stop-propagation="propagation" @change="onChange">
        <van-swipe-item v-for="(item,index) in images" :key="index">
          <div class="img">
            <img :src="item" @click="larageImg(index)" />
          </div>
        </van-swipe-item>
        <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{images.length}}</div>
      </van-swipe>
    </div>
    <div>
      <van-image-preview
        v-model="show"
        :images="images"
        @change="onChange1"
        :start-position="largeiIndex"
      >
        <!-- <template v-slot:largeiIndex>第{{ largeiIndex+1 }}页</template> -->
      </van-image-preview>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      show: false,
      largeiIndex: 0,
      propagation: false
    };
  },
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {
    onChange(index) {
      this.current = index;
    },
    larageImg(indexs) {
      console.log(indexs);
      this.show = true;
      this.largeiIndex = indexs;
    },

    onChange1(index) {
      this.largeiIndex = index;
    }
  },

  mounted() {},
  watch: {
    // image(val) {
    //   for (let i = 1; i <= 4; i++) {
    //     this.images.push(this.image);
    //   }
    // }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
/deep/ .van-image-preview__swipe,
.van-image-preview {
  height: 100vh !important;
}
/deep/ .van-overlay,
.van-image-preview__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9) !important;
}
.top {
  height: 375px;
}
.custom-indicator {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 50px;
  height: 20px;
  background: rgb(204, 204, 203);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-content: center;
}
.img {
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  width: 375px;
}
</style>