<script setup>
import Button from 'primevue/button'
import Card from 'primevue/card'
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '../stores/userStore'
import { supabase } from '../supabase'
import ProgressSpinner from 'primevue/progressspinner'
import Image from 'primevue/image'
import { getFileUrl } from '../util/supabase/downloadFile'
import { RouterLink } from 'vue-router'

const props = defineProps({
  parentProjectId: { type: [Number, String], default: null }
})

const user = useUserStore()
const isLoading = ref(false)
const projects = ref([])
const imagePaths = ref([])

async function refresh() {
  isLoading.value = true
  const { data = [] } = props.parentProjectId == null ?
  await supabase.from('projects')
    .select('*')
    .eq('is_private', false)
    .is('parent_project_id', null)
    .order('created_date', { ascending: false }) :
    await supabase.from('projects')
    .select('*')
    .eq('is_private', false)
    .eq('parent_project_id', Number(props.parentProjectId))
    .order('created_date', { ascending: false })
  projects.value = data
  isLoading.value = false
  getImagePaths()
}

async function getImagePaths() {
  var paths = []
  for (const image of projects.value) {
    const data = await getFileUrl('projects', image.image_path, { width: 400, quality: 75 })
    paths.push({ id: image.id, path: data })
  }
  imagePaths.value = paths
}

watch(() => props.parentProjectId, () => refresh())

onMounted(() => refresh())
</script>

<template>
    <div :style="{
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '100%',
    }">
  <div v-if="projects.length > 0 && !isLoading" class="flex flex-wrap justify-around p-5">
    <Card v-for="project in projects" :key="project.id" class="w-96 m-3 bg-white-600">
      <template #content>
        <RouterLink :to="{ name: 'project', params: { id: project.id } }">
          <div
            class="flex flex-col items-center font-medium"
            v-if="imagePaths.find((x) => x.id == project.id)"
          >
            <Image
              :src="imagePaths.find((x) => x.id == project.id).path"
              :alt="project.name"
              loading="lazy"
            />
            <p class="text-2xl text-primary">{{ project.project_name }}</p>
            <div class="flex w-full justify-center text-stone-600">
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
  <ProgressSpinner v-else-if="isLoading" />
  <div v-if="user.isLoggedIn" class="w-full text-center p-2">
    <Button
      label="Manage Projects"
      as="router-link"
      severity="secondary"
      icon="pi pi-pen-to-square"
      class="w-48"
      :to="{ name: 'admin' }"
    />
  </div></div>
</template>

<style scoped></style>
