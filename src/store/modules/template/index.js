import { Store } from 'vuex';
import { mutations } from './mutations';
import { actions } from './actions';


/** @type {Store} */
export const template = {
  name: 'template',
  namespaced: true,
  state: {
    rawList: [],
  },
  mutations,
  actions,
};
