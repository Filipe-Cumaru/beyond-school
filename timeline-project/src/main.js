import Vue from 'vue'
import App from './App.vue'
import ProfilePage from './components/ProfilePage.vue'
// import MainPage from './components/MainPage.vue'
import Login from './components/Login.vue'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueRouter from 'vue-router'
import Firebase, { auth } from './firebase'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Firebase)

const vuexPersist = new VuexPersistence({
  key: 'timeline',
  storage: window.localStorage,
  modules: [
    'darkTheme'
  ]
})

const darkTheme = {
  namespaced: true,
  state: {
    enableDarkTheme: true
  },
  getters: {
    getEnableDarkTheme: function (state) {
      return state.enableDarkTheme
    }
  },
  actions: {
    switchTheme: function ({ commit }) {
      commit('setDarkTheme')
    }
  },
  mutations: {
    setDarkTheme: function (state) {
      state.enableDarkTheme = !state.enableDarkTheme
      vuetify.framework.theme.dark = state.enableDarkTheme
    }
  }
}

const userManagement = {
  namespaced: true,
  state: {
    activeUser: '',
    users: [
      {name: 'Eu', public: true},
      {name: 'Gandalf', public: true},
      {name: 'Theoden', public: false}
    ]
  },
  actions: {
    createNewAccount: async function ({ commit }, newAccountData) {
      const { email, password } = newAccountData
      console.log(commit)
      auth.createUserWithEmailAndPassword(email, password)
      .then( function (ret) {
        console.log(ret)
      })
      .catch( function (e) {
        console.log(e)
      })
    }
  },
  mutations: {

  },
  getters: {
    getUserPublicStatus: (state) => (name) => {
      const isPublic = state.users.filter(function (u) {
        return u.name === name
      }).pop().public
      return isPublic
    }
  }
}

const store = new Vuex.Store({
  state: {
    publications: [
      { text: 'YOU SHALL NOT PASS!', img: undefined, user: 'Gandalf' },
      { text: 'All We Have To Do Is Decide What To Do With The Time That Is Given To Us.', img: undefined, user: 'Gandalf' },
      { text: `Arise, arise, Riders of Théoden!
        Fell deeds awake: fire and slaughter! Spears shall be shaken,
        Shields shall be splintered, a sword-day, a red day, ere the sun rises!
        Ride now, ride now! Ride to Gondor! Death! Death! Death! Forth Eorlingas`, img: undefined, user: 'Theoden'}
    ]
  },
  modules: {
    darkTheme: darkTheme,
    userManagement: userManagement
  },
  getters: {
    getPublications: function (state) {
      return state.publications
    },
    getPublicationsFromUser: (state) => (user) => {
      const pubsFromUser = state.publications.filter(function (p) {
        return p.user === user
      })
      return pubsFromUser
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
      let newPub = { text: publication.text, img: undefined, user: 'Eu'}
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
    component: Login
  },
  {
    path: '/profile/:name',
    component: ProfilePage
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
