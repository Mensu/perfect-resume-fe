export const SET_TEMPLATE_LIST = 'SET_TEMPLATE_LIST';

export const mutations = {
  [SET_TEMPLATE_LIST](state, list) {
    state.rawList = list;
  },
};
