/**
 * @param {string} src
 * @param {string} target
 */
export function match(src, target) {
  return src.toLowerCase().includes(target.toLowerCase());
}

/**
 * @param {number} ms
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
