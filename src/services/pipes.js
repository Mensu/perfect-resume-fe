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

/**
 * @param {number} size
 */
export function fileSize(size) {
  const units = ['', 'K', 'M', 'G', 'T', 'P'];
  let text = '空文件';
  units.reverse().some((unit, idx) => {
    const threshold = 2 ** (10 * Number(units.length - 1 - idx));
    if (size < threshold) {
      return false;
    }
    text = `${(size / threshold).toFixed(2)} ${unit}B`;
    return true;
  });
  return text;
}

/**
 * @param {boolean} visible
 */
export function visibilityIcon(visible) {
  return visible ? 'visibility_off' : 'visibility';
}

/**
 * @param {boolean} visible
 */
export function visibilityInputType(visible) {
  return visible ? 'text' : 'password';
}
