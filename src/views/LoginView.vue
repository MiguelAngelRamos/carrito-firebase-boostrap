<script setup>
import { useForm, useField } from 'vee-validate';
import { loginSchema as validationSchema } from '@/validation/loginSchema';
import { useRouter } from 'vue-router';

const { handleSubmit }= useForm({ validationSchema });

const email = useField('email');
const password = useField('password');



const submit = handleSubmit( values => {
  console.log(values);
})
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="offset-4 col-4">
        <h1 class="text-center">Inicio Sesión</h1>

        <form class="p-4 shadow">
          
          <div class="mb-3">
            <label for="email" class="form-label">Correo Eletronico: </label>
            <input type="email" class="form-control" id="email" v-model="email.value.value" required>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Contraseña: </label>
            <input type="password" class="form-control" id="password" v-model="password.value.value" required>
          </div>

          <button type="submit" class="btn btn-primary w-100" @click="submit">Ingresar</button>
        </form>

      </div>
    </div>
  </div>
</template>