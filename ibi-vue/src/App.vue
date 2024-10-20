<script setup>
import Toast from 'primevue/toast'
import NavBar from './components/NavBar.vue'
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="m-3">
    <Toast />
    <NavBar />
    <RouterView />
  </div>
</template>

<style>
body {
  background: #213547 center center no-repeat fixed;
  background-size: cover;
}
</style>
