<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  store.dispatch('initAuth');
});
</script>

<template>
  <RouterView/>
</template>

<style scoped>
</style>