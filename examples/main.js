import Vue from "vue"
import App from "./App.vue"
import Antd from "ant-design-vue"
import "ant-design-vue/dist/antd.min.css"
// 导入组件
import gbAbtUi from "./../packages/index"
Vue.use(Antd)
Vue.use(gbAbtUi)
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount("#app")
