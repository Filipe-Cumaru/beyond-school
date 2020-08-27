import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    
  },
  getters: {

  },
  actions: {

  },
  mutations: {
    
  }
})

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
