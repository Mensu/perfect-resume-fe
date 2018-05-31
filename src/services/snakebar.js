import { store } from '../store'
import { PROMPT_MSG } from '../store/actions'

const type2Icon = {
  success: 'check_circle',
  info: 'info',
  warning: 'priority_high',
  error: 'warning',
};

const defaultDuration = 4000;

export class SnakeBar {
  /**
   * @param {string} msg
   * @param {number} [duration]
   * @param {string} [icon]
   */
  static success(msg, duration = defaultDuration / 2, icon = 'check_circle') {
    return store.dispatch(PROMPT_MSG, { type: 'success', msg, duration, icon });
  }
  /**
   * @param {string} msg
   * @param {number} [duration]
   * @param {string} [icon]
   */
  static info(msg, duration = defaultDuration, icon = 'info') {
    return store.dispatch(PROMPT_MSG, { type: 'info', msg, duration, icon });
  }
  /**
   * @param {string} msg
   * @param {number} [duration]
   * @param {string} [icon]
   */
  static warning(msg, duration = defaultDuration, icon = 'priority_high') {
    return store.dispatch(PROMPT_MSG, { type: 'warning', msg, duration, icon });
  }
  /**
   * @param {string} msg
   * @param {number} [duration]
   * @param {string} [icon]
   */
  static error(msg, duration = defaultDuration, icon = 'warning') {
    return store.dispatch(PROMPT_MSG, { type: 'error', msg, duration, icon });
  }
  /**
   * @param {string} msg
   * @param {number} [duration]
   * @param {string} [icon]
   */
  static prompt(msg, duration = defaultDuration, icon = '') {
    return store.dispatch(PROMPT_MSG, { msg, duration, icon });
  }
}
