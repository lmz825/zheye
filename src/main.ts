import { createApp } from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'

import App from './App.vue'
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  config.params = { ...config.params, icode: 'AAD2ADB1D7FAE8EC' }
  if (config.data instanceof FormData) {
    config.data.append('icode', 'AAD2ADB1D7FAE8EC')
  } else {
    config.data = { ...config.data, icode: 'AAD2ADB1D7FAE8EC' }
  }
  return config
})

axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
}, e => {
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(e.response.data)
})
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
