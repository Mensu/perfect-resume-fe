import { Store } from 'vuex';
import { mutations } from './mutations';
import { actions } from './actions';

/** @type {Store} */
export const user = {
  name: 'user',
  namespaced: true,
  state: {
    username: '用户',
    nickname: '用户',
    isAdmin: false,
  },
  getters: {
    isAdmin: state => state.isAdmin,
    username: state => state.username,
    nickname: state => state.nickname,
  },
  mutations,
  actions,
};
