import Vue from 'vue';
import Router from 'vue-router';
import TemplateList from './views/TemplateList';
import UserCenter from './views/UserCenter';
import Admin from './views/Admin';
import { beforeEnterGuardLogin, beforeEnterGuardAdmin } from './services/guard';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'templates',
    component: TemplateList,
  }, {
    path: '/user-center',
    name: 'user-center',
    component: UserCenter,
    beforeEnter: beforeEnterGuardLogin,
  }, {
    path: '/admin',
    name: 'admin',
    component: Admin,
    beforeEnter: beforeEnterGuardAdmin,
  }, {
    path: '_',
    name: '_',
    component: { template: '<br/>', created() { this.$router.back(); } },
  }, {
    path: '*',
    redirect: '/',
  }],
});
