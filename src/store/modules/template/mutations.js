export const SET_TEMPLATE_LIST = 'SET_TEMPLATE_LIST';
export const RATE_TEMPLATE = 'RATE_TEMPLATE';

export const mutations = {
  [SET_TEMPLATE_LIST](state, list) {
    state.rawList = list;
  },
  [RATE_TEMPLATE](state, { templateId, myRating }) {
    state.rawList.find(one => one.templateId === templateId).myRating = myRating;
  },
};
