<script setup>
import Carousel from 'primevue/carousel'
import { ref } from 'vue';

const homeImages = ref([
  { src: '/home-1.jpg' },
  { src: '/home-2.jpg' },
  { src: '/home-3.jpg' },
  { src: '/home-4.jpg' },

])

</script>

<template>
    <div class="w-full flex justify-center mt-5">
        <Carousel :value="homeImages" class="w-1/2 flex" circular autoplayInterval='5000' >
            <template #item="slotProps">
                <div :ref="slotProps.data.label" class="flex justify-center">
                <img :src="slotProps.data.src" :alt="slotProps.data.label" class="carousel-image" />
                </div>
            </template>
        </Carousel>
    </div>
</template>

<style scoped>
.carousel-image {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}
</style>
