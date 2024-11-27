<script setup>
import Carousel from 'primevue/carousel'
import { computed, ref, watch } from 'vue'
import Image from 'primevue/image'
import { useScreenSizeStore } from '../stores/screenSizeStore'
import Review from '../components/Reviews.vue'
import Projects from '../components/Projects.vue'

const screenSize = useScreenSizeStore()
const homeImages = ref([
  { src: '/home-1.jpg' },
  { src: '/home-2.jpg' },
  { src: '/home-3.jpg' },
  { src: '/home-4.jpg' },
  { src: '/home-5.jpg ' },
  { src: 'terran_mitch.png' }
])
const carouselKey = ref(true)

const numVisible = computed(() => {
  if (screenSize.is2xl) {
    return 7
  } else if (screenSize.isLg) {
    return 5
  } else if (screenSize.isMd) {
    return 3
  } else if (screenSize.isSm) {
    return 1
  }
  return 1
})

const autoPlayInterval = computed(() => {
  const imageLength = homeImages.value.length
  if (imageLength < numVisible.value) {
    return 0
  }
  return 4000
})

watch(numVisible, () => {
  carouselKey.value = !carouselKey.value
})
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
    <Review />
    <Projects />
  </div>
</template>
