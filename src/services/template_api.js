import { api, checkResult } from './api';
import { store } from '../store';
import { user as userstore } from '../store/modules/user';

const text = { responseType: 'text' };
const ratings = [5, 3.7, 4.2, 3.6, 4.8, 4.5, 2.9, 3.6, 4.3];

/**
 * @return {Template}
 */
function refactorTmpl(raw) {
  const { templateId, name, nickname = store.getters.nickname, downloadPath } = raw;
  return {
    templateId,
    name,
    description: '',
    rating: ratings[templateId % ratings.length],
    myRating: null,
    downloadPath,
    user: {
      userId: 0,
      nickname,
    },
  };
}

class TemplateAPI {
  /**
   * @param {File} file
   * @param {string} name
   */
  async uploadTemplate(file, name) {
    const form = new FormData();
    form.append('file', file);
    form.append('name', name);
    form.append('username', store.getters.username);
    const result = await api.post('/resume/uploadResume.do', form, text);
    checkResult(result, '简历模板上传失败');
  }

  /**
   * @param {number} templateId
   */
  async deleteTemplate(templateId) {
    const form = new FormData();
    form.append('templateId', templateId);
    const result = await api.post('/resume/deleteResume.do', form, text);
    checkResult(result, '简历模板删除失败');
  }

  async getTemplates() {
    /** @type {any[]} */
    const result = await api.post('/resume/getAllResume.do', null);
    return result.map(refactorTmpl);
  }

  async getMyTemplates() {
    const form = new FormData();
    form.append('username', store.getters.username);
    /** @type {any[]} */
    const result = await api.post('/resume/getUserResume.do', form);
    return result.map(refactorTmpl);
  }
}

export const template_api = new TemplateAPI();
