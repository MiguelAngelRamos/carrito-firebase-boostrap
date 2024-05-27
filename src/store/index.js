import { createStore } from 'vuex';
import { firebaseApp } from '../config/firebase';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

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
    login({commit}, { email, password }) {
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          commit('setAuthUser', userCredential.user);
        })
        .catch( error => {
          // console.error(error);
          commit('setErrorMsg', 'Credenciales Incorrectas')
        })
    }
  }, 
  getters: {
    
  }
})