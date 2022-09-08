const state = {
    isLoading: false
}

const getters = {
    apiLoading(state) {
        return state.isLoading
    }
}

const actions = {
    setLoading({commit}, payload) {
        commit('setLoading', !!payload)
    }
}

const mutations = {
    setLoading(state, loading) {
        state.isLoading = loading
    }
}


export default {
    state,
    actions,
    mutations,
    getters
}
