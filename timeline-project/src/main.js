import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueRouter)

const vuexPersist = new VuexPersistence({
  key: 'fhir_viwer_', // EDIT ME
  storage: window.localStorage,
  modules: [
    'auth',
    'common'
  ]
})

const store = new Vuex.Store({
  state: {
    
  },
  getters: {

  },
  actions: {

  },
  mutations: {
    
  },
  plugins: [vuexPersist.plugin]
})

const routes = [
  {
    path: '/',
    component: App
  }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
