import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//展示页面

const index = () => import("@/components/index/index.vue");


const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
 
  //本地
  mode: "hash",
  base: "/myblog",

  // 打包
//   base: "/",
//  mode: "history",

  routes: [
    {
      path: "/index",
      redirect: '/index',
      component: index,
    },

  ],
});

export default router;