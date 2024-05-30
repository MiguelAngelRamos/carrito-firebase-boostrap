<script setup>
import { useForm, useField } from 'vee-validate';
import { loginSchema as validationSchema } from '@/validation/loginSchema';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';

// importar Vuex
const store = useStore();
const { handleSubmit }= useForm({ validationSchema });

const router = useRouter();
const email = useField('email');
const password = useField('password');


const submit = handleSubmit( values => {

  store.dispatch('login',{...values, router})
})

const hasError = computed(() => store.state.errorMsg)
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 offset-sm-3 col-sm-6">
        <h1 class="text-center">Inicio Sesión</h1>

        <form class="p-4 shadow">

          <div v-if="hasError" class="alert alert-danger" role="alert">
             {{ store.state.errorMsg }}
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Correo Eletronico: </label>
            <input 
              type="email" 
              class="form-control" 
              id="email" 
              v-model="email.value.value"
              :class="{'is-invalid': email.errorMessage.value ? true: false }"
              required>
            <div v-if="email.errorMessage" id="emailHelp" class="text-danger form-text">{{ email.errorMessage.value }}</div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Contraseña: </label>
            <input 
              type="password" 
              class="form-control" 
              id="password" 
              v-model="password.value.value"
              :class="{'is-invalid': password.errorMessage.value ? true: false }"
              required>
            <div v-if="password.errorMessage" id="emailHelp" class="text-danger form-text">{{ password.errorMessage.value }}</div>
          </div>

          <button type="submit" class="btn btn-primary w-100" @click="submit">Ingresar</button>
        </form>

      </div>
    </div>
  </div>
</template>