import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import service from "./http"
import dayjs from 'dayjs'
import Vant from 'vant';
import 'vant/lib/index.css';
import './globalComponent/index'
// import './Api.js'

Vue.use(Vant);



// 把service对象挂载在Vue的原型对象上
// 每一个组件都可以使用
Vue.prototype.$axios = service
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')