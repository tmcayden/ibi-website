<script setup>
import { computed, onMounted } from 'vue'
import Menubar from 'primevue/menubar'
import { useLocalStorage } from '../util/storage'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Image from 'primevue/image'
import Panel from 'primevue/panel'
import Toast from 'primevue/toast'
import { TransitionGroup } from 'vue'
import BidRequest from './BidRequest.vue'

// Setup

const router = useRouter()
const route = useRoute()
const isDarkMode = useLocalStorage(false, 'isDarkMode')

// State

const navItems = ref([
  {
    label: 'Gallery',
    icon: 'pi pi-images',
    class: 'text-xl',
    command: () => router.push('/gallery')
  },
  {
    label: 'Contact',
    icon: 'pi pi-envelope',
    class: 'text-xl',
    command: () => router.push('/contact')
  }
])
const builtWithOptions = [
  'Relationships',
  'Projects',
  'Timelines',
  'Prices',
  'Homes',
  'Structures',
  'Contracts',
  'Additions',
  'Estimates',
  'Workspace',
  'Vision',
  'Expectations',
  'Careers',
  'Connections'
]
const activeOption = ref(0)
const showText = ref(true)
const newText = ref('')

// Computed
const themeIcon = computed(() => {
  return isDarkMode.value ? 'pi pi-moon' : 'pi pi-sun'
})
const backgroundImage = computed(() => {
  const imageUrl = (() => {
    switch (route.name) {
      case 'home':
        return '/FramingPhoto.jpg'
      case 'gallery':
        return ''
      case 'contact':
        return ''
      default:
        return ''
    }
  })();
  return imageUrl ? `linear-gradient(to bottom right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1)), url(${imageUrl})` : '';
})

// Actions

if (isDarkMode.value) {
  const element = document.querySelector('html')
  element.classList.add('ibi-dark')
}

const toggleColorScheme = () => {
  isDarkMode.value = !isDarkMode.value
  const element = document.querySelector('html')
  element.classList.toggle('ibi-dark')
}

setInterval(() => {
  if (route.name !== 'home') {
    return
  }

  showText.value = false

  setTimeout(() => {
    const newOption = Math.round(Math.random() * (builtWithOptions.length - 1))
    if (newOption === activeOption.value) {
      showText.value = true
      return activeOption.value = (activeOption.value + 1) % builtWithOptions.length
    }
    activeOption.value = newOption
    showText.value = true
  }, 2000)
}, 5000)

onMounted(() => {
  activeOption.value = Math.round(Math.random() * (builtWithOptions.length - 1))
})

</script>

<template>
  <Toast />
  <Panel
    :style="{ backgroundImage: backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center', border: 'none'}"
    class="md:h-1/3 panel-with-background"
  >
    <template #header>
      <Menubar :model="navItems" class="w-full sm:mb-3">
        <template #start>
          <Router-Link :to="{ name: 'home' }" class="mr-3">
            <Image v-if="isDarkMode" src="/Logo_transparent_dark.png" alt="IBI Logo" width="75" />
            <Image v-else src="/Logo_transparent.png" alt="IBI Logo" width="75" />
          </Router-Link>
        </template>
        <template #end>
          <div class="w-12 flex justify-between gap-3">
            <i @click="toggleColorScheme" :class="themeIcon" class="cursor-pointer"></i>
          </div>
        </template>
      </Menubar>
    </template>

    <div v-if="route.name == 'home'" class="flex sm:flex-row flex-col gap-10 justify-around items-center">
      <div class="font-bold text-4xl text-center sm:w-1/3 text-white" style="position: relative">
      <transition-group name='fade'>
        <div class="animate-duration-2000 w-full text-center" :key="activeOption" v-animateonscroll="{ enterClass: 'animate-flipleft' }" style="position: absolute">
          {{ builtWithOptions[activeOption] }}
        </div>
        <p class="mt-10">
         Built With Integrity
        </p>
      </transition-group>
      </div>
      <BidRequest />
    </div>
  </Panel>
</template>

<style scoped>
.panel-with-background {
  position: relative;
  overflow: hidden;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-leave-to {
  opacity: 0;
}
</style>
