/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-03 18:14:01
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 16:07:20
 */
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import routes from './routes';
const router = createRouter({
  history: createWebHistory("/s_regdoll_manage/"),
  routes,
});

function isLogin() {
  return !!store.getters.hasUser;
}

router.beforeEach((to, from, next) => {
  console.log(to);


  // if (isLogin()) {
  next()
  // } else {
  //   next("/login")
  // }

  // const userAuth = (getLocalStore('user') as any)?.auth
  // if ((to.meta.auth as any) == 0) {

  // } else {
  //   if (userAuth && userAuth > (to.meta.auth as any)) {
  //     next()
  //     return
  //   }
  //   next('/403')
  // }

})
export default router;
