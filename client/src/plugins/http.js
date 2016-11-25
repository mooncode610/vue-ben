import axios from 'axios'
import store from '../store'
import router from '../router'
import { apiUrl } from '../config'

const http = axios.create({
  baseURL: apiUrl,
})

/**
* Helper method to set the header with the token
*/
export function setToken(token) {
  http.defaults.headers.common.Authorization = `Bearer: ${token}`
}

/**
* Before making request we clear
* any message that might be visible
*/
http.interceptors.request.use(
  (request) => {
    store.dispatch('resetMessages')
    return request
  }
)

http.interceptors.response.use(
  response => response,
  /**
  * This is a central point to handle all
  * error messages generated by HTTP
  * requests
  */
  (error) => {
    /**
    * If token is either expired, not provided or invalid
    * then redirect to login. On server side the error
    * messages can be changed on app/Providers/EventServiceProvider.php
    */
    if (error.response.data.reason === 'token') {
      router.push({ name: 'login.index' })
    }
    store.dispatch('setMessage', { type: 'error', message: error.response.data.messages })
    store.dispatch('setFetching', { fetching: false })
    return Promise.reject(error)
  }
)

export default function install(Vue) {
  Object.defineProperties(Vue.prototype, {
    $http: {
      get() {
        return http
      },
    },
  })
}
