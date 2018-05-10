import { template_api } from '../../../services/template_api';
import { SET_TEMPLATE_LIST } from './mutations';

export const FETCH_TEMPLATE_LIST = 'FETCH_TEMPLATE_LIST';
export const actions = {
  async [FETCH_TEMPLATE_LIST]({ commit }) {
    const rawList = await template_api.getTemplates();
    commit(SET_TEMPLATE_LIST, rawList);
  },
};
