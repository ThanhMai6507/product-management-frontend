import Vue from 'vue'
import Vuex from 'vuex'
import loading from './loading'
import login from './login'
import product from './product'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        loading,
        login,
        product
    }
})

export default store
