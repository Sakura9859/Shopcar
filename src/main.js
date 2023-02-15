import Vue from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
Vue.config.productionTip = false;
import axios from "axios";
axios.defaults.baseURL = "https://www.escook.cn";
// 3. axios方法添加到Vue的原型上
Vue.prototype.$axios = axios;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
