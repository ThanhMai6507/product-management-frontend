import axios from 'axios'
import store from '@/store'

const webApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 30000,
})

webApi.defaults.headers.common['Accept'] = 'application/json'

const loginInfo = JSON.parse(localStorage.getItem('loginInfo'))

if (loginInfo && loginInfo.access_token) {
    webApi.defaults.headers.common['Authorization'] = 'Bearer ' + loginInfo.access_token
}

webApi.interceptors.request.use(
    (res) => {
        store.dispatch('setLoading', true)
        return res
    },
    (error) => Promise.reject(error)
)

webApi.interceptors.response.use(
    (response) => {
        store.dispatch('setLoading', false)
        return response
    },
    (error) => {
        store.dispatch('setLoading', false)
        return Promise.reject(error)
    }
)

export default webApi
