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

const { handleSubmit } = useForm({ productSchema });

const nombre = useField('nombre');
// const imagen = useField('imagen');
const precio = useField('precio');
const stock = useField('stock');


const caracteristicas = ref([{ key: '', value: '' }]);

const addCaracteristica = () => {
  caracteristicas.value.push({ key: '', value: '' });
};

const removeCaracteristica = (index) => {
  caracteristicas.value.splice(index, 1);
};


const submit = handleSubmit(async (values) => {
  const product = { ...values };

  const formattedCaracteristicas = caracteristicas.value.reduce((acc, { key, value }) => {
    acc[key] = value;
    return acc;
  }, {});

  const docRef = await addDoc(collection(db, 'productos'), {
    ...product,
    imagen: url.value,
    caracteristicas: formattedCaracteristicas,
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
          <div class="mb-3">
            <label for="caracteristicas" class="form-label">Características</label>
            <div v-for="(caracteristica, index) in caracteristicas" :key="index" class="d-flex mb-2">
              <input type="text" class="form-control me-2" v-model="caracteristica.key" placeholder="Característica"
                required>
              <input type="text" class="form-control me-2" v-model="caracteristica.value" placeholder="Valor" required>
              <button type="button" class="btn btn-danger" @click="removeCaracteristica(index)"><i
                  class="fa-solid fa-trash"></i></button>
            </div>

          </div>
          <div class="d-grid gap-2">
            <button type="button" class="btn btn-dark" @click="addCaracteristica">Agregar Caracteristica <i
                class="fa-solid fa-plus"></i></button>
            <button type="submit" class="btn btn-dark" @click="submit">Guardar <i class="fa-solid fa-floppy-disk"></i></button>
          </div>

        </form>
      </div>
    </div>

  </div>
</template>