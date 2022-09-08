<template>
  <div>
    <table class="table table-striped" id="main">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>User_id</th>
        <th>Description</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
      <tr v-for="product in getProducts" :key="product.id">
        <td>{{ product.id }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.user_id }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.price }}</td>
        <td>
          <button class="edit" @click="editProduct(product)">Edit</button>
          <button class="delete" @click="deleteProduct(product)">Delete</button>
        </td>
      </tr>
    </table>

    <router-link to="/products/create">Create new product</router-link>
  </div>
</template>

<script>
import productService from '@/services/product'
import { mapActions } from 'vuex'

export default {
  name: 'ListProduct',
  methods: {
    ...mapActions([
      'fetchProducts'
    ]),

    async deleteProduct(product) {
      if (confirm('Are you sure detete this field?')) {
        try {
          await productService.delete(product.id)
          alert('Deleted this field')
          await this.fetchProducts()
        } catch (error) {
          alert('Error')
          console.log(error)
        }
      }
    },

    editProduct(product) {
      this.$router.push({ name: 'products.edit', params: {id: product.id} })
    }
  },

  computed: {
    getProducts() {
      return this.$store.getters.products
    }
  },

  async mounted() {
    await this.fetchProducts()
  }
}
</script>

<style scoped>
#main {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 80%;
  margin: auto;
  margin-top: 100px;
}

#main td, #main th {
  border: 1px solid #ddd;
  padding: 8px;
}

#main tr:nth-child(even){background-color: #f2f2f2;}

#main tr:hover {background-color: #ddd;}

#main th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #008B8B;
  color: white;
}

.create {
  background-color: rgb(0, 139, 139) !important;
  border-color: rgb(0, 139, 139) !important;
  height: 52px;
  min-width: 92px;
  padding: 0 23.1111111111px;
  color: #fff !important;
  font-size: 1rem;
  border: 1px solid rgb(0, 139, 139) !important; 
  margin-top: 50px;
  border-radius: 6px;
}

.edit {
  margin-right: 10px;
}
</style>
