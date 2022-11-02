import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import ElementUI from "element-ui";
import store from "./store";
import { request } from "@/common/utils/request";
import { blogapi } from "@/common/config/api.js";

 

Vue.use(VueDirectiveImagePreviewer)
// import Prism from 'prismjs';
Vue.use(ElementUI);
Vue.use(ElementUI, { size: "small", zIndex: 3000 });
Vue.use(mavonEditor);
Vue.prototype.request = request;
Vue.prototype.blogapi = blogapi;

new Vue({
    el: "#app",
    router,
    store,
    render: (h) => h(App),
  })
