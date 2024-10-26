import './assets/main.css'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice'
import { createPinia } from 'pinia'
import { updatePrimaryPalette, definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'
import AnimateOnScroll from 'primevue/animateonscroll'

const app = createApp(App)
const pinia = createPinia()

const ibiPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#B3D6E3 ',
      100: '#99C3D4',
      200: '#80B0C6',
      300: '#669DB7',
      400: '#4C8AA8',
      500: '#385986',
      600: '#2D4B6B',
      700: '#233D57',
      800: '#192F43',
      900: '#0F212F',
      950: '#0A1621'
    }
  }
})

app.directive('animateonscroll', AnimateOnScroll)


app.use(PrimeVue, {
  theme: {
    preset: ibiPreset,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      },
      darkModeSelector: '.ibi-dark'
    },
    zIndex: {
      menu: 1000,
      modal: 1100,
      overlay: 1200,
      tooltip: 1200,
      toast: 1200
    }
  }
})
app.use(pinia)
app.use(router)
app.use(ToastService)

updatePrimaryPalette({
  'primary': '#385986',
  'primary-hover': '#1a3d5d', // Optional: Hover color
  'primary-active': '#1a3d5d' // Optional: Active color
})
// updatePrimaryPalette({
//   'primary': '#385986',
//   'primary-hover' : '#2c4668',
//   'primary-active' : '#2c4668',
// })

app.mount('#app')
