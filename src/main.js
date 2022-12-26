import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from "element-ui";
import { request } from "@/common/utils/request";
import { commonapi, tabapi,appapi } from "@/common/config/api.js";
import "element-ui/lib/theme-chalk/index.css";
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(ElementUI, { size: "small", zIndex: 3000 });



Vue.prototype.request = request;
Vue.prototype.commonapi = commonapi;
Vue.prototype.tabapi = tabapi;
Vue.prototype.appapi = appapi;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
