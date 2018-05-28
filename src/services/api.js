import axios from 'axios'

/** @type {AxiosRequestConfig} */
const axiosDefaults = {
  baseURL: `${window.location.origin}/api`,
  xsrfCookieName: 'X-CSRF-Token',
  xsrfHeaderName: 'X-CSRF-Token',
};

const xsrfCookieRegExp = new RegExp(`${axiosDefaults.xsrfCookieName}=(\\S+);`);

class API {
  client = axios.create(axiosDefaults)

  get mock() {
    const mockAPI = new API()
    mockAPI.client = axios.create({ ...axiosDefaults, baseURL: 'mock/api' })
    return mockAPI
  }

  /**
   * http GET method
   * @param {string} url
   * @param {AxiosRequestConfig} config
   */
  async get(url, config) {
    return this.request({ ...config, url, method: 'GET' })
  }

  /**
   * http POST method
   * @param {string} url
   * @param {any} data
   * @param {AxiosRequestConfig} config
   */
  async post(url, data, config) {
    return this.request({ ...config, url, data, method: 'POST' })
  }

  /**
   * http PUT method
   * @param {string} url
   * @param {any} data
   * @param {AxiosRequestConfig} config
   */
  async put(url, data, config) {
    return this.request({ ...config, url, data, method: 'PUT' })
  }

  /**
   * http PATCH method
   * @param {string} url
   * @param {any} data
   * @param {AxiosRequestConfig} config
   */
  async patch(url, data, config) {
    return this.request({ ...config, url, data, method: 'PATCH' })
  }

  /**
   * http DELETE method
   * @param {string} url
   * @param {any} data
   * @param {AxiosRequestConfig} config
   */
  async delete(url, data, config) {
    return this.request({ ...config, url, data, method: 'DELETE' })
  }

  async ensureCSRFToken() {
    // pass
  }

  /**
   * 请求代理
   * @param {AxiosRequestConfig} config
   * @return {Promise<AxiosResponse>}
   */
  async request(config) {
    if (config.method !== 'GET') {
      await this.ensureCSRFToken()
    }
    const response = await this.client(config)
    return config.fullResponse ? response : response.data
  }
}

/**
 * 解码 html
 * @param {string} html
 */
function decodeHtml(html) {
  const element = document.createElement('textarea')
  element.innerHTML = html
  return element.innerText
}

export const api = new API();
