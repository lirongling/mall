<template>
    <transition name="fade">
      <router-view class="rou" />
    </transition>
</template>
<script>
import BScroll from 'better-scroll'
export default {
   mounted() {
      
    }
}
</script>
<style lang="scss">
@import url('//at.alicdn.com/t/font_1588350_mxr36r1eji.css');
*{
  margin: 0;
  padding: 0;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.fade-enter-active, .fade-leave-avtive {
    transition: opacity .8s
}
.fade-enter, .fade-leave-to {
    opacity: 0
}
</style>
