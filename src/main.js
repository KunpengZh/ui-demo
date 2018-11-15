import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/style.css";
import "vue2-animate/dist/vue2-animate.min.css";
import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css";
import echarts from "echarts";

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(ElementUI);
Vue.prototype.echarts = echarts;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
