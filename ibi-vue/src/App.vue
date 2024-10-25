<script setup>
import Toast from 'primevue/toast'
import NavBar from './components/NavBar.vue'
import { RouterView } from 'vue-router';
import { onMounted, onUnmounted } from 'vue';
import { useScreenSizeStore } from './stores/screenSizeStore';

const screenSize = useScreenSizeStore();

onMounted(() => {
  screenSize.addWindowResizeListener();
})

onUnmounted(() => {
  screenSize.removeWindowResizeListener();
})
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
