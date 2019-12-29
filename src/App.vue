<template>
  <div id="app">
    <transition name="fade">
      <router-view class="rou" />
    </transition>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
@import url('//at.alicdn.com/t/font_1588350_l3zruan3vcm.css');
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.fade-enter-active, .fade-leave-avtive {
    transition: opacity .5s
}
.fade-enter, .fade-leave-to {
    opacity: 0
}
</style>
