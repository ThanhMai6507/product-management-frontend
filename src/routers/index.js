import Vue from 'vue'
import VueRouter from 'vue-router'
import moment from 'moment'
import store from '@/store'

Vue.use(VueRouter)

const isAuthenticated = () => {
    const loginInfoStore = store.getters.loginInfo
    const loginInfoStorage = JSON.parse(localStorage.getItem('loginInfo'))
    return (loginInfoStore || loginInfoStorage) && moment(new Date).unix() < loginInfoStorage.expires_at
}

const guardRoute = (to, from, next) => {
    if (isAuthenticated()) {
        next()
    } else {
        next({name: 'login'})
    }
}

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/MainLayout.vue'),
        beforeEnter: guardRoute,
        children: [
            {
                path: 'products',
                component: () => import('@/views/ProductView.vue'),
                children: [
                    {
                        path: '/',
                        name: 'products.list',
                        component: () => import('@/components/products/ListProduct.vue')
                    },
                    {
                        path: 'create',
                        name: 'products.create',
                        component: () => import('@/components/products/CreateProduct.vue')
                    },
                    {
                        path: 'edit/:id',
                        name: 'products.edit',
                        component: () => import('@/components/products/EditProduct.vue')
                    },
                ]
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/RegisterView.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
