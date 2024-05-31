import { createStore } from 'vuex';
import { firebaseApp } from '../config/firebase';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const auth = getAuth(firebaseApp); // con esto quiero gestionar el autenticación del usuario

export default createStore({
  state() {
    return {
      authUser: null,
      errorMsg: ''
    }
  }, 
  // las mutations son los encargados de mutar o cambiar el state
  mutations: {
    setAuthUser(state, user) {
      state.authUser = user;
    },
    setErrorMsg(state, message) {
      state.errorMsg = message
    }
  },
  // las acciones llaman a los mutations y puedo hacer el llamado el servidor
  actions: {
    login({commit}, { email, password, router }) {
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          commit('setAuthUser', userCredential.user);
          router.push({name: 'home'})
        })
        .catch( error => {
          console.error(error);
          commit('setErrorMsg', 'Credenciales Incorrectas')
        })
    },
    logout({commit}, router) {
      signOut(auth).then( () => {
        commit('setAuthUser', null);
        router.push({name: 'login'})
      }).catch(error => console.error(error))
    },
    register({commit}, { email, password, router }) {
     
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          commit('setAuthUser', userCredential.user);
          router.push({name: 'home'}) // creas una cuenta y te redirige al home
        })
        .catch( error => {
          console.error(error);
          commit('setErrorMsg', 'Error al crear la cuenta')
        })
    },
    initAuth({ commit }) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          commit('setAuthUser', user);
        }
      });
    }
  }, 
  getters: {
    isAuthenticated: state => !!state.authUser,
  }
})