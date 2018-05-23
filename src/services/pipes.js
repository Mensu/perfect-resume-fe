import vue from 'vue';
import * as pipes from './pipes';

export const PipeService = {
  /**
   * @param {typeof vue} Vue
   */
  install(Vue) {
    Object.keys(pipes).forEach((key) => {
      if (typeof pipes[key] !== 'function') return;
      Vue.filter(pipes[key].name, pipes[key]);
    });
  },
};

/**
 * @param {number} userId
 */
export function avatar(userId) {
  return '/favicon.ico';
}

/**
 * @param {number} templateId
 */
export function tmplImg(templateId) {
  return '/favicon.ico';
}
