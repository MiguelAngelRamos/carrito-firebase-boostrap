<script setup>
import useProductos from '@/composables/useProductos';
const { productosCollection } = useProductos()
</script>

<template>
  <div class="container">
    <h2>Admin Panel</h2>
    <p>En esta sección puedes administrar tus productos</p>
    <router-link class="btn btn-primary" :to="{ name: 'nuevo-producto'}">Crear Producto</router-link>

    <table v-if="productosCollection.length > 0" class="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="producto in productosCollection">
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.precio }}</td>
          <td>{{ producto.stock }}</td>
          <td>
            Eliminar/Editar
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
</template>