import axios from 'axios'
import { SnakeBar } from './snakebar'

/** @type {AxiosRequestConfig} */
export const axiosDefaults = {
  baseURL: '/springMVC-demo',
  xsrfCookieName: 'X-CSRF-Token',
  xsrfHeaderName: 'X-CSRF-Token',
}

const xsrfCookieRegExp = new RegExp(`${axiosDefaults.xsrfCookieName}=(\\S+);`)

class API {
  constructor(config) {
    this.client = axios.create({ ...axiosDefaults, ...config })
    this.client.interceptors.response.use(r => r, (err) => {
      SnakeBar.err(err.message)
      return Promise.reject(err)
    })
  }

  get mock() {
    return new API({ baseURL: 'https://private-0e87b-perfectresume1.apiary-mock.com/springMVC-demo' })
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
   * @return {Promise<any>}
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

export const api = new API()

/**
 * @param {any} result
 * @param {string} msg 如果检查失败，应该抛出什么字符串
 */
export function checkResult(result, msg) {
  if (result && (result === true || result === 'true')) {
    return
  }
  SnakeBar.error(msg)
  throw new Error(msg)
}
