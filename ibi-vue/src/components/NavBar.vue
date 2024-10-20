<script setup>
import { computed, onMounted } from 'vue'
import Menubar from 'primevue/menubar'
import { useLocalStorage } from '../util/storage'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Image from 'primevue/image'
import Panel from 'primevue/panel'

const router = useRouter()
const route = useRoute()
const isDarkMode = useLocalStorage(false, 'isDarkMode')

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

const themeIcon = computed(() => {
  return isDarkMode.value ? 'pi pi-moon' : 'pi pi-sun'
})

// Computed property for background image based on route name
const backgroundImage = computed(() => {
  switch (route.name) {
    case 'home':
      return '/FramingPhoto.jpg'
    case 'gallery':
      return ''
    case 'contact':
      return ''
    // Add more cases as needed for other routes
    default:
      return ''
  }
})

if (isDarkMode.value) {
  const element = document.querySelector('html')
  element.classList.add('ibi-dark')
}

const toggleColorScheme = () => {
  isDarkMode.value = !isDarkMode.value
  const element = document.querySelector('html')
  element.classList.toggle('ibi-dark')
}

// Timer for changing the built-with text
setInterval(() => {
  if (route.name != 'home') {
    return
  }
  const oldOption = activeOption.value
  const newOption = Math.round(Math.random() * (builtWithOptions.length - 1))

  if (oldOption != newOption) {
    activeOption.value = newOption
  } else {
    activeOption.value = (newOption + 1) % builtWithOptions.length
  }
}, 5000)

onMounted(() => {
  activeOption.value = Math.round(Math.random() * (builtWithOptions.length - 1))
})

</script>

<template>
  <Panel :style="{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', border: 'none'}" class="h-96">
    <template #header>
      <Menubar :model="navItems" class="w-full">
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
    <div v-if="route.name == 'home'" class="flex justify-center items-center h-48">
        <div key="built-with-text" class="text-highlight text-center w-1/3">
          {{ builtWithOptions[activeOption] }} Built With Integrity
        </div>
    </div>
  </Panel>
</template>

<style scoped>

  .text-highlight {
  font-size: 1.8rem; /* Slightly smaller font size */
  font-weight: 600; /* Medium bold */
  color: #ffffff; /* Clean white color */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* Subtle shadow */
  background-color: rgba(0, 0, 0, 0.8); /* Dark translucent background */
  padding: 12px 16px; /* Adjusted padding for better spacing */
  border-radius: 5px; /* Slightly rounded corners */
  transition: transform 0.2s ease; /* Quick animation on hover */
}

.text-highlight:hover {
  transform: scale(1.03); /* Slightly scale up on hover */
}
</style>
