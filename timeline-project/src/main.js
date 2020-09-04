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
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Firebase)

const vuexPersist = new VuexPersistence({
  key: 'timeline',
  storage: window.localStorage,
  modules: [
    'darkTheme',
    'userManagement'
  ]
})

const darkTheme = {
  namespaced: true,
  state: {
    enableDarkTheme: false
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
    activeUser: null
  },
  actions: {
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
        await firestore.collection('users').add({ 
          name: name, 
          isPrivate: isPrivate,
          email: email
        })
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
        await firestore.collection('users').where('email', '==', email).get()
        .then(function (querySnapshot) {
          querySnapshot.forEach((doc) => {
            commit('setActiveUser', { data: doc.data(), id: doc.id })
          })
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
        const newUser = {
          email: googleAccountInfo.additionalUserInfo.profile.email,
          name: googleAccountInfo.additionalUserInfo.profile.given_name,
          isPrivate: false
        }
        await firestore.collection('users').add(newUser)
        .then(function (doc) {
          console.log('Entrada do BD criada', doc)
          commit('setActiveUser', { data: newUser, id: doc.id })
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
      commit('unsetActiveUser')
      return success
    }
  },
  mutations: {
    setActiveUser: function (state, payload) {
      state.activeUser = {
        name: payload.data.name,
        isPrivate: payload.data.isPrivate,
        email: payload.data.email,
        id: payload.id
      }
    },
    unsetActiveUser: function (state) {
      state.activeUser = null
    }
  },
  getters: {
    getName: function (state) {
      return state.activeUser.name
    }
  }
}

const store = new Vuex.Store({
  state: {
    publications: [],
    profilePublications: [],
    sharedPublications: []
  },
  modules: {
    darkTheme: darkTheme,
    userManagement: userManagement
  },
  getters: {
    getPublications: function (state) {
      return state.publications
    },
    getPublicationsFromUser: function (state) {
      return state.profilePublications
    }
  },
  actions: {
    addPublication: async function ({ state }, publication) {
      let success = false
      const imgFile = publication.img
      if (imgFile !== '') {
        publication.img = `${state.userManagement.activeUser.name}/${imgFile.name}`
        await storage.ref().child(publication.img).put(imgFile)
      }
      await firestore.collection('publications').add(publication)
      .then(function (doc) {
        console.log(doc)
        success = true
      })
      .catch(function (error) {
        console.log(error)
        success = false
      })
      return success
    },
    postSharedPublication: async function ({ state }, publication) {
      const remoteUrl = 'https://petbookinterface.rj.r.appspot.com/send'
      const imgFile = publication.path
      if (imgFile !== '') {
        const imgPath = `${state.userManagement.activeUser.name}/${imgFile.name}`
        await storage.ref().child(imgPath).put(imgFile)
        const url = await storage.ref().child(imgPath).getDownloadURL()
        publication.path = url
      }
      try {
        const response = await axios.post(remoteUrl, publication)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
    // eslint-disable-next-line
    postExistingSharedPublication: async function ({  }, publication) {
      const remoteUrl = 'https://petbookinterface.rj.r.appspot.com/send'
      try {
        const response = await axios.post(remoteUrl, publication)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
    removeAllPublications: function ({ commit }) {
      commit('clearPublications')
    },
    removeSinglePublication: function ({ commit }, data) {
      commit('deletePublication', data)
    },
    editPublicationText: async function ({ commit }, data) {
      let myPubs = []

      await firestore.collection('publications')
      .where('username', '==', data.name)
      .where('text', '==', data.oldText)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          myPubs.push({ data: doc.data(), id: doc.id })
        })
      })

      const oldPub = myPubs.pop()
      const newPub = {
        text: data.newText,
        img: oldPub.data.img,
        username: oldPub.data.username,
        timestamp: oldPub.data.timestamp
      }
      await firestore.collection('publications').doc(oldPub.id).set(newPub)

      commit('updatePublicationText', data)
    },
    queryPublications: async function ({ commit }) {
      let allPubs = []
      await firestore.collection('publications').get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          allPubs.push(doc.data())
        })
      })
      .catch(function (error) {
        console.log(error)
      })
      commit('setPublications', allPubs)
    },
    queryUserPublications: async function ({ commit }, name) {
      let myPubs = []
      await firestore.collection('publications').where('username', '==', name).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          myPubs.push(doc.data())
        })
      })
      .catch(function (error) {
        console.log(error)
      })
      commit('setProfilePublications', myPubs)
    },
    // eslint-disable-next-line
    queryUserIsPrivate: async function ({  }, name) {
      let userIsPrivate = false
      await firestore.collection('users').where('name', '==', name).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          userIsPrivate = doc.data().isPrivate
        })
      })
      .catch(function (error) {
        console.log(error)
      })
      return userIsPrivate
    }
  },
  mutations: {
    setPublications: function (state, pubs) {
      state.publications = []
      pubs.forEach(function (elem) {
        if (elem.username !== state.userManagement.activeUser.name) {
          state.publications.push(elem)
        }
      })
      state.publications = state.publications.sort((v1, v2) => {
        return v1.timestamp - v2.timestamp
      })
    },
    setProfilePublications: function (state, pubs) {
      state.profilePublications = []
      pubs.forEach((elem) => {
        state.profilePublications.push(elem)
      })
      state.profilePublications = state.profilePublications.sort((v1, v2) => {
        return v1.timestamp - v2.timestamp
      })
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
      for (let p of state.profilePublications) {
        if (p.timestamp === data.timestamp) {
          break
        }
        i++
      }
      state.publications[i].text = data.newText
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
    path: '/profile/:name/:isOwner',
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
