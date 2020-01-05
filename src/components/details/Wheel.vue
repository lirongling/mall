<template>
  <div>
    <div class="top">
      <van-swipe :autoplay="3000" @change="onChange">
        <van-swipe-item v-for="(item,index) in images" :key="index">
          <div class="img">
            <img :src="item" @click="larageImg(index)" />
          </div>
        </van-swipe-item>
        <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{images.length}}</div>
      </van-swipe>
    </div>
    <van-image-preview v-model="show" :images="images" @change="onChange1">
      <template v-slot:index>第{{ index+1 }}页</template>
    </van-image-preview>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      images: [],
      show: false,
      index: 0
    };
  },
  props: {
    image: {
      type: String,
      default: ""
    }
  },
  components: {},
  methods: {
    onChange(index) {
      this.current = index;
    },
    larageImg(index) {
      this.show = true;
      this.index = index;
    },
    onChange1(index) {
      this.index = index;
    }
  },


  mounted() {},
  watch: {
    image(val) {
      for (let i = 1; i <= 4; i++) {
        this.images.push(this.image);
      }
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.top{
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