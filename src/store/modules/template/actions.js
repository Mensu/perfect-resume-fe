import { template_api } from '../../../services/template_api';
import { SET_TEMPLATE_LIST, RATE_TEMPLATE } from './mutations';

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
  async [UPLOAD](ctx, { file, name }) {
    return template_api.uploadTemplate(file, name);
  },
};
