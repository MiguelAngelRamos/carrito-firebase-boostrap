import { createStore } from 'vuex';
import { firebaseApp } from '../config/firebase';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

const auth = getAuth(firebaseApp); // con esto quiero gestionar el autenticación del usuario

export default createStore({
  state() {
    return {

    }
  },
  mutations: {

  },
  actions: {

  }, 
  getters: {
    
  }
})