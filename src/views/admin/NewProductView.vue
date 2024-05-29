<script setup>
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import { collection, addDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import { useRouter } from 'vue-router';

// componsable
import useImage from '@/composables/useImage';
import { productSchema } from '@/validation/productSchema';

const { url, uploadImage, image } = useImage();
const router = useRouter();
const db = useFirestore();

const { handleSubmit } = useForm({
  productSchema,
})

const nombre = useField('nombre');
// const imagen = useField('imagen');
const precio = useField('precio');
const stock = useField('stock');

const submit = handleSubmit(async (values) => {
  // console.log(values);
  // const {...product}  = values;

  const docRef = await addDoc(collection(db, 'productos'), {
    ...values,
    imagen: url.value
  })

  if (docRef.id) {
    router.push({ name: 'admin-productos' })
  }
})
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="offset-3 col-6">
        <h2>Nuevo Producto</h2>

        <form>
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombre" v-model="nombre.value.value" required>
          </div>
          <div class="mb-3">
            <label for="" class="form-label">Imagen</label>
            <input type="file" class="form-control" id="imagen" @change="uploadImage" required>
          </div>

          <div class="mb-3" v-if="image">
            <img :src="image" class="img-thumbnail rounded mx-auto d-block" alt="imagen producto" width="150">
          </div>
          <div class="mb-3">
            <label for="precio" class="form-label">Precio</label>
            <input type="number" class="form-control" id="precio" v-model="precio.value.value" required>
          </div>
          <div class="mb-3">
            <label for="stock" class="form-label">Stock</label>
            <input type="number" class="form-control" id="stock" v-model="stock.value.value" required>
          </div>

          <button type="submit" class="btn btn-primary" @click="submit">Guardar</button>
        </form>
      </div>
    </div>

  </div>
</template>