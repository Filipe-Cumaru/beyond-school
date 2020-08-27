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
  key: 'timeline',
  storage: window.localStorage,
  modules: [
    'auth',
    'common'
  ]
})

const store = new Vuex.Store({
  state: {
    publications: []
  },
  getters: {
    getPublications: function (state) {
      return state.publications
    }
  },
  actions: {
    addPublication: function ({ commit }, publication) {
      commit('pushPublication', publication)
    },
    removeAllPublications: function ({ commit }) {
      commit('clearPublications')
    },
    removeSinglePublication: function ({ commit }, data) {
      commit('deletePublication', data)
    },
    editPublicationText: function ({ commit }, data) {
      commit('updatePublicationText', data)
    }
  },
  mutations: {
    pushPublication: function (state, publication) {
      let newPub = { text: publication.text, img: undefined }
      if (publication.img !== undefined) {
        const imgData = localStorage.getItem(publication.img)
        newPub.img = imgData
      }
      state.publications.push(newPub)
    },
    clearPublications: function (state) {
      state.publications = []
    },
    deletePublication: function (state, data) {
      let i = 0
      const text = data[0]
      const img = data[1]
      // Procura-se a publicação do array publications
      // cujo conteúdo é o mesmo dos argumentos text e img.
      for (let p of state.publications) {
          if (p.text === text && p.img === img) {
              break
          }
          i++
      }
      state.publications.splice(i, 1)
    },
    updatePublicationText: function (state, data) {
      let i = 0
      const oldText = data[0]
      const img = data[1]
      for (let p of state.publications) {
        if (p.text === oldText && p.img === img) {
          break
        }
        i++
      }
      state.publications[i].text = data[2]
    }
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
