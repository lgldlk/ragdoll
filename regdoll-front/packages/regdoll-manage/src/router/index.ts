/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-03 18:14:01
 * @Editors: lgldlk
 * @LastEditTime: 2021-05-10 15:51:31
 */
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
