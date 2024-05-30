<script setup>
import useProductos from '@/composables/useProductos';
const { productosCollection, deleteItem } = useProductos()

const deleteProduct = (id, image) => {
  deleteItem(id, image);
}
</script>

<template>
  <div class="container">
    <h2>Admin Panel</h2>
    <p>En esta sección puedes administrar tus productos</p>
    <router-link class="btn btn-dark mb-5" :to="{ name: 'nuevo-producto'}">Crear Producto</router-link>

    <table v-if="productosCollection.length > 0" class="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Imagen</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="producto in productosCollection">
          <td>{{ producto.nombre }}</td>
          <td><img :src="producto.imagen" alt="imagen-producto" width="60"></td>
          <td>{{ producto.precio }}</td>
          <td>{{ producto.stock }}</td>
          <td>
            <!-- <router-link 
            class="btn btn-success mx-2" 
            :to="{name: 'editar-producto', params: {id: producto.id }}">
          
          </router-link> -->

          <router-link class="btn btn-success mx-2" :to="{name: 'editar-producto', params: {id: producto.id}}">  <i class="fa-solid fa-pen-to-square"></i>
          </router-link>
          
            <button class="btn btn-danger" @click="deleteProduct(producto.id, producto.imagen)"><i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
</template>