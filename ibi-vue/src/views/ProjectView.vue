<script setup>
import { useToast } from 'primevue/usetoast'
import { useUserStore } from '../stores/userStore'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { supabase } from '../supabase'
import { useProjectStore } from '../stores/projectStore'

const props = defineProps({
  id: { type: [String, Number], required: true }
})
const toast = useToast()
const user = useUserStore()
const project = useProjectStore()

const isLoading = ref(false)

async function refresh() {
  isLoading.value = true
  project.loadProject(props.id)
  isLoading.value = false
}

onMounted(() => refresh())
</script>

<template>
  <div>Project {{ project.value }}</div>
</template>
