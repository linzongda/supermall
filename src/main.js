import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyload from "vue3-lazy";
import installElementPlus from './plugins/element'
// import mitt from 'mitt'

const app= createApp(App).use(store).use(router)
app.use(VueLazyload,{
  error:require("../src/assets/logo.png")

})
installElementPlus(app)
app.mount('#app')
//解决系移动端300ms延迟
FastClick.attach(document.body)
// app.config.globalProperties.$bus = new mitt() //绑定事件总线

