import './assets/main.css'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice'
import { createPinia } from 'pinia'
import { palette, updatePrimaryPalette } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

const app = createApp(App)
const pinia = createPinia()

app.use(PrimeVue, {
  theme: {
    preset: Aura,
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

updatePrimaryPalette(palette('{cyan}'))

app.mount('#app')
