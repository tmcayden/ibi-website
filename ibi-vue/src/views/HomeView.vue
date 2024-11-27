<script setup>
import Reviews from '../components/Reviews.vue'
import Projects from '../components/Projects.vue'

</script>

<template>
  <div class="w-full flex flex-col justify-center pt-4"
  :style="{
      backgroundImage: `url('/blue-bg-1.png')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '100%',
    }">
    <Reviews />
    <Projects />
  </div>
</template>
