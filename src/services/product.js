import webApi from './api'

export class ProductService {
    listProducts() {
        return webApi.get('/products')
    }

    detail(id) {
        return webApi.get(`/products/${id}`)
    }

    create(data) {
        return webApi.post('/products/create', data)
    }
    
    edit(id, data) {
        return webApi.put(`/products/edit/${id}`, data)
    }

    delete(id) {
        return webApi.delete(`/products/delete/${id}`)
    }
}

const productService = new ProductService()
export default productService
