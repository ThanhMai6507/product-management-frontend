import productService from '@/services/product'

const state = {
    products: [],
    product: null
}

const getters = {
    products(state) {
        return state.products
    },
    product() {
        return state.product
    }
}

const actions = {
    async fetchProducts(context) {
        const res = await productService.listProducts()
        context.commit('fetchProducts', res.data)
    }
}

const mutations = {
    fetchProducts(state, payload) {
        state.products = payload
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
