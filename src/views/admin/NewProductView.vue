<script setup>


</script>

<template>
  <div class="container">
    <h2>Nuevo Producto</h2>

    <form>
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="nombre"  required>
      </div>
      <div class="mb-3">
        <label for="" class="form-label">Imagen</label>
        <input type="file" class="form-control" id="imagen"  required>
      </div>
      <div class="mb-3">
        <label for="precio" class="form-label">Precio</label>
        <input type="number" class="form-control" id="precio"  required>
      </div>
      <div class="mb-3">
        <label for="stock" class="form-label">Stock</label>
        <input type="number" class="form-control" id="stock"  required>
      </div>

      <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
  </div>
</template>