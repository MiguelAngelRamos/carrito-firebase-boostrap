<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  product: Object
});
</script>

<template>
  <!-- Modal -->
  <div v-if="product" class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{ product.nombre }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-12 col-md-6">
              <img :src="product.imagen" alt="Product Image" class="img-fluid">
            </div>
            <div class="col-12 col-md-6">
              <h5 class="mt-4 mb-2 fs-3">Precio: {{ product.precio.toLocaleString('es-CL', {
                style: 'currency',
                currency: 'CLP'
              }) }}</h5>
              <p>Stock: {{ product.stock }}</p>

              <p class="mb-1 fw-1">Caracteristicas</p>

              <ul>
                <li v-for="(value, key) in product.caracteristicas" :key="key">{{ key }} : {{ value }}</li>
              </ul>

            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>

      </div>
    </div>
  </div>
</template>



<style scoped></style>
