import * as axios from 'axios'

declare global {
  type AxiosRequestConfig = axios.AxiosRequestConfig
  type AxiosPromise = axios.AxiosPromise
  type AxiosError = axios.AxiosError
  type AxiosResponse = axios.AxiosResponse
}

declare module 'axios' {
  interface AxiosRequestConfig {
    fullResponse?: boolean
  }
}
