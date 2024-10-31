<script setup>
import Toast from 'primevue/toast'
import NavBar from './components/NavBar.vue'
import { RouterView } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'
import { useScreenSizeStore } from './stores/screenSizeStore'
import { supabase } from './supabase'
import { useUserStore } from './stores/userStore'
import Footer from './components/Footer.vue'

const screenSize = useScreenSizeStore()
const user = useUserStore()

onMounted(() => {
  screenSize.addWindowResizeListener()
  supabase.auth.getSession().then(({ data }) => {
    user.session = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    user.session = _session
  })
})

onUnmounted(() => {
  screenSize.removeWindowResizeListener()
})
</script>

<template>
  <div>
    <Toast />
    <NavBar />
    <RouterView />
    <Footer />
  </div>
</template>

<style>
body {
  background: #385986 center center no-repeat fixed;
  background-size: cover;
}

.p-panel-content-container {
  height: 100%;
}
</style>
