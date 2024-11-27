<script setup>
import { computed, onMounted, watch } from 'vue'
import Menubar from 'primevue/menubar'
import { useLocalStorage } from '../util/storage'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Image from 'primevue/image'
import Panel from 'primevue/panel'
import Toast from 'primevue/toast'
import Button from 'primevue/button'
import BidRequest from './BidRequest.vue'
import { useUserStore } from '../stores/userStore'
import ConfirmDialog from 'primevue/confirmdialog'
import { useProjectStore } from '../stores/projectStore'
import { getFileUrl } from '../util/supabase/downloadFile'

// Setup
const router = useRouter()
const route = useRoute()
const user = useUserStore()
const project = useProjectStore()
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
  },
  {
    label: 'Admin',
    icon: 'pi pi-cog',
    class: 'text-xl',
    command: () => router.push('/admin'),
    visible: () => user.isLoggedIn
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
const backgroundImage = ref('')

// Computed
const themeIcon = computed(() => {
  return isDarkMode.value ? 'pi pi-moon' : 'pi pi-sun'
})
async function updateBackgroundImage() {
  let imageUrl = ''

  switch (route.name) {
    case 'home':
      imageUrl = '/FramingPhoto.jpg'
      break
    case 'gallery':
      imageUrl = '/home-5.jpg'
      break
    case 'contact':
      imageUrl = '/home-7.jpg'
      break
    case 'login':
      imageUrl = '/blue-bubble-bg.png'
      break
    case 'admin':
      imageUrl = '/blue-bubble-bg.png'
      break
    case 'project':
      const projectId = route.params.id
      await project.loadProject(projectId)
      imageUrl = await getFileUrl('projects', project.project.image_path)
      break
    default:
      imageUrl = ''
  }

  backgroundImage.value = imageUrl
    ? `linear-gradient(to bottom right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1)), url(${imageUrl})`
    : ''
}
const largeBackground = computed(() => {
  return route.name == 'home' || route.name == 'project'
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
      return (activeOption.value = (activeOption.value + 1) % builtWithOptions.length)
    }
    activeOption.value = newOption
    showText.value = true
  }, 2000)
}, 5000)

onMounted(() => {
  activeOption.value = Math.round(Math.random() * (builtWithOptions.length - 1))
  updateBackgroundImage()
})

watch(() => route.name, updateBackgroundImage)
</script>

<template>
  <ConfirmDialog />
  <Toast />
  <Panel
    :style="{
      backgroundImage: backgroundImage,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: 'none'
    }"
    class="panel-with-background"
    :class="largeBackground ? 'h-screen' : ''"
    :pt="{
      content: (options) => ({
        class: ['h-full']
      })
    }"
  >
    <template #header>
      <Menubar :model="navItems" class="w-full lg:mb-3">
        <template #start>
          <Router-Link :to="{ name: 'home' }" class="mr-3">
            <Image v-if="isDarkMode" src="/Logo_transparent_dark.png" alt="IBI Logo" width="75" />
            <Image v-else src="/Logo_transparent.png" alt="IBI Logo" width="75" />
          </Router-Link>
        </template>
        <template #end>
          <div class="flex justify-between items-center text-right">
            <Button
              v-if="!user.isLoggedIn"
              as="a"
              label="(435) 828-3309"
              icon="pi pi-phone"
              class="md:mr-3 text-center text-xs sm:text-base p-2"
              href="tel:435-828-3309"
              :to="{ name: 'login' }"
            />
            <i
              v-if="false"
              @click="toggleColorScheme"
              :class="themeIcon"
              class="cursor-pointer"
            ></i>
            <Button
              v-if="user.isLoggedIn"
              label="Logout"
              icon="pi pi-sign-out"
              class="ml-3"
              as="router-link"
              :to="{ name: 'home' }"
              @click="user.handleLogout"
            />
          </div>
        </template>
      </Menubar>
    </template>

    <div v-if="route.name == 'home'" class="mb-6">
      <div class="flex lg:flex-row lg:mt-14 flex-col justify-between items-center">
        <div
          class="font-bold text-4xl lg:text-6xl text-center lg:w-1/3 text-white tracking-wide"
          :style="{ 'text-shadow': '1px 1px 2px rgba(0, 0, 0, 0.5)', position: 'relative' }"
        >
          <transition-group name="fade">
            <div
              class="animate-duration-2000 w-full text-center"
              :key="activeOption"
              v-animateonscroll="{ enterClass: 'animate-flipleft' }"
              style="position: absolute"
            >
              {{ builtWithOptions[activeOption] }}
            </div>
            <p key="builtwith" class="lg:mt-20 mt-10">Built With Integrity</p>
          </transition-group>
        </div>
      </div>
      <div class="w-full mt-12 flex lg:justify-end justify-center">
        <BidRequest class="lg:mr-16" />
      </div>
    </div>
    <div v-if="route.name == 'project'" class="h-full">
      <div class="h-5/6 flex flex-col justify-end font-bold">
        <div class="text-white text-6xl">
          {{ project.project.project_name }}
        </div>
        <div
          v-if="project.project.start_date && project.project.end_date"
          class="text-slate-300 text-base mt-3"
        >
          {{
            new Date(project.project.start_date).toLocaleDateString() +
            ' - ' +
            new Date(project.project.end_date).toLocaleDateString()
          }}
        </div>
      </div>
    </div>
  </Panel>
</template>

<style scoped>
.panel-with-background {
  position: relative;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-leave-to {
  opacity: 0;
}
</style>
