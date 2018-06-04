import Vue from 'vue';
import Vuex from 'vuex';
import { mutations } from './mutations';
import { actions } from './actions';
import { user } from './modules/user';
import { template } from './modules/template';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    user,
    template,
  },
  state: {
    isLoggedIn: false,
    isLoginRegisterOpen: false,
    isLoginRegisterClosable: false,
    snakebarMsg: null,
    snakebarMsgId: 0,
  },
  getters: {
    username: (state, getters) => getters[`${user.name}/username`],
    nickname: (state, getters) => getters[`${user.name}/nickname`],
  },
  mutations,
  actions,
});
