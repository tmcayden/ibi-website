<script setup>
import { computed, onMounted } from 'vue'
import Menubar from 'primevue/menubar'
import { useLocalStorage } from '../util/storage'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Image from 'primevue/image'
import Panel from 'primevue/panel'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import {useToast} from 'primevue/usetoast'

const router = useRouter()
const route = useRoute()
const toast = useToast()
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

if (isDarkMode.value) {
  const element = document.querySelector('html')
  element.classList.add('ibi-dark')
}

const toggleColorScheme = () => {
  isDarkMode.value = !isDarkMode.value
  const element = document.querySelector('html')
  element.classList.toggle('ibi-dark')
}

function requestABid() {
  toast.add({severity:'info', summary: 'Bid Requested', detail: 'We will contact you shortly.', life: 3000});
}

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
  <Toast />
  <Panel
    :style="{ backgroundImage: backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center', border: 'none'}"
    class="h-96 panel-with-background"
  >
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

    <div v-if="route.name == 'home'" class="flex justify-around items-center h-48">
      <div key="built-with-text" class="text-highlight home-text text-center w-1/3">
        {{ builtWithOptions[activeOption] }} Built With Integrity
      </div>
      <Card>
        <template #header>
          <h3>Featured Project</h3>
        </template>
        <template #content>
        <Button label="Request a Bid" icon="pi pi-envelope" class="p-button-rounded p-button-secondary" @click="requestABid" />
        </template>
      </Card>
    </div>
  </Panel>
</template>

<style scoped>
.panel-with-background {
  position: relative;
  overflow: hidden;
}

.home-text {
  color: white;         /* Make text white */
  font-weight: bold;    /* Make text bold */
  font-size: 2rem;      /* Adjust size as needed */
}
</style>
