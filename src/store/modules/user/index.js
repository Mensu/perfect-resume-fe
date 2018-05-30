import { Store } from 'vuex';
import { mutations } from './mutations';
import { actions } from './actions';

/** @type {Store} */
export const user = {
  name: 'user',
  namespaced: true,
  state: {
    username: '',
    nickname: '',
    isAdmin: false,
  },
  getters: {
    isAdmin: state => state.isAdmin,
    username: state => state.username,
  },
  mutations,
  actions,
};
