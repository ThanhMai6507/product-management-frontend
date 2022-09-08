<template>
  <div class="main"> 
    <div class="wrapper">
      <nav class="header-left">
        <div class="home">
          <router-link to="/">Home</router-link>
        </div>
        <div  class="home">
          <router-link to="/products">Products</router-link>
        </div>
      </nav>
      <nav class="header-right">
        <div class="login">
          <router-link to="/login">Login</router-link>
        </div>
        <div  class="register">
          <router-link to="/register">Register</router-link>
        </div>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>

<style scoped>
.main {
  margin-bottom: 100px !important;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  position: fixed;
  background-color: #008B8B;
  /* background-image: url("../assets/header_image.jpg"); */
  width: 100% !important;
  height: 80px;
  margin-top: -60px !important;
}

.header-left {
  padding: 30px;
  float: left;
  margin-bottom: 50px;
}

.header-right {
  padding: 30px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
}

.register {
  margin-left: 10px;
}

.home {
  float: left;
  margin-right: 10px;
}

nav a {
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

nav a.router-link-exact-active{
  color: #42b983;
}
</style>
