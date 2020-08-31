import Vue from 'vue'
import App from './App.vue'
import ProfilePage from './components/ProfilePage.vue'
import MainPage from './components/MainPage.vue'
import Login from './components/Login.vue'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueRouter from 'vue-router'
import Firebase, { auth, GoogleAuthProvider, firestore, storage } from './firebase'

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
    name: '',
    isPrivate: false
  },
  actions: {
    // FIXME: É possível criar uma conta e não conseguir registrar
    // o usuário no Firebase.
    createNewAccount: async function ({ commit }, newAccountData) {
      const { email, password, name, isPrivate } = newAccountData
      let retInfo = { success: false, errorCode: '' }

      console.log(commit)

      await auth.createUserWithEmailAndPassword(email, password)
      .then( function (ret) {
        console.log(ret)
        retInfo.success = true
      })
      .catch( function (e) {
        retInfo.errorCode = e.code
      })
      
      if (retInfo.success) {
        await firestore.collection('users').doc(email).set({ name: name, isPrivate: isPrivate })
        .then(function (ret) {
          console.log('Entrada do BD criada', ret)
        })
        .catch(function (error) {
          console.log(error)
          retInfo.success = false
          retInfo.errorCode = 'firebase'
        })
      }

      return retInfo
    },
    loginWithEmail: async function ({ commit }, accountData) {
      const { email, password } = accountData
      let retInfo = { success: false, errorCode: '' }

      await auth.signInWithEmailAndPassword(email, password)
      .then( function (ret) {
        console.log(ret)
        retInfo.success = true
      })
      .catch( function (e) {
        console.log(e)
        retInfo.errorCode = e.code
      })

      if (retInfo.success) {
        await firestore.collection('users').doc(email).get()
        .then(function (doc) {
          commit('setName', doc.data().name)
          commit('setIsPrivate', doc.data().isPrivate)
        })
        .catch(function (error) {
          console.log(error)
          retInfo.success = false
          retInfo.errorCode = 'firebase'
        })
      }

      return retInfo
    },
    loginWithGoogle: async function ({ commit }) {
      let retInfo = {success: false, errorCode: ''}
      const provider = new GoogleAuthProvider()
      let googleAccountInfo = undefined

      await auth.signInWithPopup(provider)
      .then(function (result) {
        googleAccountInfo = result
        retInfo.success = true
      })
      .catch(function (e) {
        console.log(e)
        retInfo.success = false
        retInfo.errorCode = e.code
      })

      if (retInfo.success) {
        const email = googleAccountInfo.additionalUserInfo.profile.email
        const name = googleAccountInfo.additionalUserInfo.profile.given_name
        const isPrivate = false
        await firestore.collection('users').doc(email).set({ name: name, isPrivate: isPrivate })
        .then(function (ret) {
          console.log('Entrada do BD criada', ret)
          commit('setName', name)
          commit('setIsPrivate', isPrivate)
        })
        .catch(function (error) {
          console.log(error)
          retInfo.success = false
          retInfo.errorCode = 'firebase'
        })
      }

      return retInfo
    },
    logout: async function ({ commit }) {
      let success = false
      console.log(commit)
      await auth.signOut()
      .then( function (ret) {
        console.log(ret)
        success = true
      })
      .catch( function (e) {
        console.log(e)
        success = false
      })
      return success
    }
  },
  mutations: {
    setName: function (state, name) {
      state.name = name
    },
    setIsPrivate: function (state, isPrivate) {
      state.isPrivate =isPrivate
    }
  },
  getters: {
    getUserPublicStatus: (state) => (name) => {
      const isPublic = state.users.filter(function (u) {
        return u.name === name
      }).pop().public
      return isPublic
    },
    getName: function (state) {
      return state.name
    }
  }
}

const store = new Vuex.Store({
  state: {
    publications: []
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
    // eslint-disable-next-line
    addPublication: async function ({  }, publication) {
      let success = false
      await firestore.collection('publications').doc(String(publication.timestamp)).set(publication)
      .then(function (ret) {
        console.log(ret)
        success = true
      })
      .catch(function (error) {
        console.log(error)
        success = false
      })
      return success
    },
    removeAllPublications: function ({ commit }) {
      commit('clearPublications')
    },
    removeSinglePublication: function ({ commit }, data) {
      commit('deletePublication', data)
    },
    editPublicationText: function ({ commit }, data) {
      commit('updatePublicationText', data)
    },
    queryPublications: async function ({ commit }) {
      let allPubs = []
      await firestore.collection('publications').where('username', '>', '').get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          allPubs.push(doc.data())
        })
      })
      .catch(function (error) {
        console.log(error)
      })
      commit('setPublications', allPubs)
    }
  },
  mutations: {
    setPublications: function (state, pubs) {
      state.publications = []
      pubs.forEach(function (elem) {
        if (elem.username !== state.userManagement.name) {
          state.publications.push(elem)
        }
      })
    },
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
    path: '/mainpage',
    component: MainPage
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
