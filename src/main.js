import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './routers'
import vuetify from '@/plugins/vuetify' 

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
  vuetify,
}).$mount('#app')
