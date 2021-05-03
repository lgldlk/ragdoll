import { RouteRecordRaw } from 'vue-router';
import editPage from '../pages/EditPage.vue';
import { ComponentOptionsBase } from 'vue';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/editPage' },
  {
    path: '/editPage',
    name: 'editPage',
    component: editPage as any,
  },
];
export default routes;
