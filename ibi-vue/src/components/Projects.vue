<script setup>
import Button from 'primevue/button'
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { supabase } from '../supabase'
import ProgressSpinner from 'primevue/progressspinner'
import Image from 'primevue/image'
import { getFileUrl } from '../util/supabase/downloadFile'
import { RouterLink } from 'vue-router'

const user = useUserStore()

const isLoading = ref(false)
const projects = ref([])
const imagePaths = ref([])

async function refresh() {
  isLoading.value = true
  const { data = [] } = await supabase.from('projects').select('*')
    .order('created_date', { ascending: false }).eq('is_active', true)
  projects.value = data
  isLoading.value = false
  getImagePaths()
}

async function getImagePaths() {
  var paths = []
  for (const image of projects.value) {
    const data = await getFileUrl('projects', image.image_path)
    paths.push({ id: image.id, path: data })
  }
  imagePaths.value = paths
}

onMounted(async () => await refresh())
</script>

<template>
  <div
    class="w-full text-black text-4xl font-bold text-center pt-4 tracking-wider"
    v-if="projects.length > 0 && !isLoading"
  >
    Check Out Our Past Projects
  </div>
  <div v-if="projects.length > 0 && !isLoading" class="flex flex-wrap justify-around p-5">
    <Card v-for="project in projects" :key="project.id" class="w-96 m-3 bg-white">
      <template #content>
        <RouterLink :to="{ name: 'project', params: { id: project.id } }">
          <div
            class="flex flex-col items-center font-medium"
            v-if="imagePaths.find((x) => x.id == project.id)"
          >
            <Image
              :src="imagePaths.find((x) => x.id == project.id).path"
              :alt="project.name"
              class="avatar image"
            />
            <p class="text-2xl">{{ project.project_name }}</p>
            <div class="flex w-full justify-center text-stone-400">
              <p v-if="project.start_date">
                {{ new Date(project.start_date).toLocaleDateString() }}
              </p>
              <span v-if="project.start_date && project.end_date"> - </span>
              <p v-if="project.end_date">{{ new Date(project.end_date).toLocaleDateString() }}</p>
            </div>
          </div>
        </RouterLink>
      </template>
    </Card>
  </div>
  <ProgressSpinner v-else />
  <div v-if="user.isLoggedIn" class="w-full text-center p-2">
    <Button
      label="Manage Projects"
      as="router-link"
      severity="secondary"
      icon="pi pi-pen-to-square"
      class="w-48"
      :to="{ name: 'admin' }"
    />
  </div>
</template>

<style scoped></style>
