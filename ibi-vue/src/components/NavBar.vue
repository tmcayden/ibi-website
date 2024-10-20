<script setup>
import { computed } from 'vue'
import Menubar from 'primevue/menubar'
import { useLocalStorage } from '../util/storage'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Image from 'primevue/image'

const router = useRouter()
const isDarkMode = useLocalStorage(true, 'isDarkMode')

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

if (isDarkMode.value) {
  const element = document.querySelector('html')
  element.classList.add('ibi-dark')
}

const toggleColorScheme = () => {
  isDarkMode.value = !isDarkMode.value
  const element = document.querySelector('html')
  element.classList.toggle('ibi-dark')
}
</script>

<template>
  <Menubar :model="navItems">
    <template #start>
      <Router-Link :to="{ name: 'home' }">
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
