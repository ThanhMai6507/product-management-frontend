import authService from '@/services/auth'
import moment from 'moment'
import webApi from '@/services/api'

const state = {
    loginInfo: null,
}

const getters = {
    loginInfo(state) {
        return state.loginInfo
    }
}

const actions = {
    async login(context, payload) {
        const { data } = await authService.login(payload)
        context.commit('login', data)
    },

    async logout(context) {
        context.commit('logout')
    },
}

const mutations = {
    login(state, loginInfo) {
        loginInfo.expires_at = moment(new Date).unix() + loginInfo.expires_in
        localStorage.setItem('loginInfo', JSON.stringify(loginInfo))
        localStorage.setItem('token', loginInfo.access_token)
        webApi.defaults.headers.common['Authorization'] = 'Bearer ' + loginInfo.access_token
        state.loginInfo = loginInfo
    },

    logout(state) {
        webApi.defaults.headers.common['Authorization'] = ''
        localStorage.removeItem('loginInfo')
        state.loginInfo = null
    },
}

export default {
    state,
    actions,
    mutations,
    getters
}
