import webApi from './api'

export class AuthService {
    login(user) {
        return webApi.post('login', {
            email: user.email,
            password: user.password
        })
    }

    register(user) {
        return webApi.post('register', {
            name: user.name,
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation,
        })
    }

    logout() {
        return webApi.post('auth/logout')
    }
}

const authService = new AuthService()

export default authService
