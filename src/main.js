import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes.js'
import store from './store/store.js'
import VueResource from 'vue-resource'
 
Vue.use(VueRouter)
Vue.use(VueResource);


const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
