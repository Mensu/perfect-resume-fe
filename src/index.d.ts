import * as axios from 'axios'

declare global {
  type AxiosRequestConfig = axios.AxiosRequestConfig
  type AxiosPromise = axios.AxiosPromise
  type AxiosError = axios.AxiosError
  type AxiosResponse = axios.AxiosResponse
  type User = axios.User
  type Template = axios.Template
}

declare module 'axios' {
  interface AxiosRequestConfig {
    fullResponse?: boolean
  }

  interface User {
    userId: number
    nickname: string
  }

  interface Template {
    templateId: number
    name: string
    description: string
    rating: number
    myRating?: number
    user: User
  }
}
