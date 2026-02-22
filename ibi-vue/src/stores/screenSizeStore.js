import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useScreenSizeStore = defineStore('screenSize', () => {
  const viewportWidth = ref(window.innerWidth)

  const tw_sm = 640
  const tw_md = 768
  const tw_lg = 1024
  const tw_xl = 1280
  const tw_2xl = 1536

  const isSm = computed(() => viewportWidth.value >= tw_sm)
  const isMd = computed(() => viewportWidth.value >= tw_md)
  const isLg = computed(() => viewportWidth.value >= tw_lg)
  const isXl = computed(() => viewportWidth.value >= tw_xl)
  const is2xl = computed(() => viewportWidth.value >= tw_2xl)

  const updateViewportWidth = () => {
    viewportWidth.value = window.innerWidth
  }

  const addWindowResizeListener = () => {
    window.addEventListener('resize', updateViewportWidth)
  }

  const removeWindowResizeListener = () => {
    window.removeEventListener('resize', updateViewportWidth)
  }

  return {
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
    addWindowResizeListener,
    removeWindowResizeListener
  }
})
