<script setup>
import useProductos from '@/composables/useProductos';
const { productosCollection, deleteItem } = useProductos();

console.log(productosCollection);

import { ref, computed, onMounted, nextTick } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AppModal from '@/components/AppModal.vue';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

// const searchQuery = ref('');
const selectProduct = ref(null);

const openModal = (product) => {
  selectProduct.value = product;
  nextTick(() => {
    const modalElement = document.getElementById('staticBackdrop');
    const modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();
  });
};

// onMounted(() => {
//   store.dispatch('getProductosApi');
// });
</script>

<template>
  <div class="container">
    <!-- <input v-model="searchQuery" class="mt-5 form-control" placeholder="Buscar Productos" /> -->
    <!-- <div v-if="getProductos.length === 0">Cargando productos...</div> -->
    <div class="row mt-3">
      <template v-for="product in productosCollection" :key="product.id">
        <!-- los productos con stock superior a cero, son los productos que necesitamos renderizar  -->
        <div v-if="product && product.stock > 0" class="col-sm-6 col-md-4 col-lg-3 mb-4">
          <div class="card h-100">
            
            <img :src="product.imagen" class="card-img-top" alt="producto"  @click="openModal(product)">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title mb-2">{{ product.nombre }}</h5>
              <p class="card-text text-center fw-bold">{{ product.precio.toLocaleString('es-CL', {
                style: 'currency',
                currency: 'CLP'
              }) }}</p>
              <div class="mt-auto">
        
                <button class="btn btn-dark w-100" @click="openModal(product)">
                  Ver el detalle
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>

  <AppModal :product="selectProduct" />
</template>



<style scoped>

img {
  padding: 0.5rem;
  width: 200px;
  height: 100%;
  object-fit: contain;
  margin: 0 auto;
  cursor: pointer;
}
</style>
