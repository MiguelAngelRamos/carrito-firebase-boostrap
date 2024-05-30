<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFirestore, useDocument } from 'vuefire';
import { doc, updateDoc } from 'firebase/firestore';
import { useField, useForm } from 'vee-validate';
import useImage from '@/composables/useImage';
import { productSchema } from '@/validation/productSchema';

const { url, uploadImage, image } = useImage();
const { handleSubmit } = useForm({ productSchema });

const nombre = useField('nombre');
const precio = useField('precio');
const stock = useField('stock');
const router = useRouter();
const route = useRoute();

const db = useFirestore();
const docRef = doc(db, 'productos', route.params.id);
const producto = useDocument(docRef);

const caracteristicas = ref([{ key: '', value: '' }]);

const addCaracteristica = () => {
    caracteristicas.value.push({ key: '', value: '' });
};

const removeCaracteristica = (index) => {
    caracteristicas.value.splice(index, 1);
};

watch(producto, (producto) => {
    nombre.value.value = producto.nombre;
    precio.value.value = producto.precio;
    stock.value.value = producto.stock;
    url.value = producto.imagen;
    if (producto.caracteristicas) {
        caracteristicas.value = Object.entries(producto.caracteristicas).map(([key, value]) => ({ key, value }));
    }
});

const submit = handleSubmit(async (values) => {
    const { ...product } = values;
    const formattedCaracteristicas = caracteristicas.value.reduce((acc, { key, value }) => {
        acc[key] = value;
        return acc;
    }, {});

    const data = {
        ...product,
        imagen: image.value ? url.value : undefined,
        caracteristicas: formattedCaracteristicas
    };

    await updateDoc(docRef, data);
    router.push({ name: 'admin-productos' });
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="offset-3 col-6">
        <h2>Editar Producto</h2>

        <form>
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombre" v-model="nombre.value.value" required>
          </div>
          <div class="mb-3">
            <label for="imagen" class="form-label">Imagen</label>
            <input type="file" class="form-control" id="imagen" @change="uploadImage">
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
              <input type="text" class="form-control me-2" v-model="caracteristica.key" placeholder="Característica" required>
              <input type="text" class="form-control me-2" v-model="caracteristica.value" placeholder="Valor" required>
              <button type="button" class="btn btn-danger" @click="removeCaracteristica(index)">Eliminar</button>
            </div>
            <button type="button" class="btn btn-primary" @click="addCaracteristica">Agregar Característica</button>
          </div>

          <button type="submit" class="btn btn-primary" @click="submit">Guardar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
