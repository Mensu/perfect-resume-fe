import { template_api, refactorTmpl } from '../../../services/template_api';
import { SET_TEMPLATE_LIST, RATE_TEMPLATE, ADD_TEMPLATE } from './mutations';

export const FETCH_TEMPLATE_LIST = 'FETCH_TEMPLATE_LIST';
export { RATE_TEMPLATE } from './mutations';
export const UPLOAD = 'UPLOAD';

export const actions = {
  async [FETCH_TEMPLATE_LIST]({ commit }) {
    const rawList = await template_api.getTemplates();
    commit(SET_TEMPLATE_LIST, rawList);
  },
  async [RATE_TEMPLATE]({ commit }, { templateId, myRating }) {
    commit(RATE_TEMPLATE, { templateId, myRating });
  },
  async [UPLOAD]({ commit, state, rootGetters }, { file, name }) {
    await template_api.uploadTemplate(file, name);
    // dispatch(FETCH_TEMPLATE_LIST);
    const templateId = state.rawList.reduce((acc, cur) => Math.max(cur.templateId, acc), 0) + 1;
    const { nickname } = rootGetters;
    commit(ADD_TEMPLATE, refactorTmpl({ templateId, name, nickname, downloadPath: `${name}.doc` }));
  },
};
