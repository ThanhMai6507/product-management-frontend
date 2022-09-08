<template>
  <div id="app">
    <v-app>
      <router-view/>
      <api-loading v-if="apiLoading"></api-loading>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ApiLoading from '@/components/commons/ApiLoading.vue'

export default {
  name: 'App',
  components: {
    ApiLoading
  },
  computed: {
    ...mapGetters([
        'apiLoading'
    ])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
