<script setup>
import { useToast } from 'primevue/usetoast'
import { useUserStore } from '../stores/userStore'
import { computed, onMounted } from 'vue'
import { ref } from 'vue'
import { supabase } from '../supabase'
import { useProjectStore } from '../stores/projectStore'
import Button from 'primevue/button'
import BidRequest from '../components/BidRequest.vue'
import Image from 'primevue/image'
import { getFileUrl } from '../util/supabase/downloadFile'
import { useScreenSizeStore } from '../stores/screenSizeStore'

const props = defineProps({
  id: { type: [String, Number], required: true }
})
const toast = useToast()
const user = useUserStore()
const screenSize = useScreenSizeStore()
const project = useProjectStore()

const isLoading = ref(false)
const images = ref([])
const imagePaths = ref([])
const uploading = ref(false)

const galleryWidth = computed(() => {
  if (screenSize.isMd) return '350px'
})

async function refresh() {
  isLoading.value = true
  const { data = [] } = await supabase.from('project_images').select('*').eq('project_id', props.id)

  images.value = data
  isLoading.value = false
  getImagePaths()
}

async function getImagePaths() {
  var paths = []
  for (const image of images.value) {
    const data = await getFileUrl('projects', image.image_path)
    paths.push(data)
  }
  imagePaths.value = paths
}

async function uploadPhoto(event) {
  uploadPhoto.value = event.target.files
  try {
    debugger
    uploading.value = true
    if (!uploadPhoto.value || uploadPhoto.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }
    const file = uploadPhoto.value[0]
    const fileExt = file.name.split('.').pop()
    const filePath = `${project.project.category}/${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage.from('projects').upload(filePath, file)

    if (uploadError) throw uploadError

    const { error } = await supabase.from('project_images').insert({
      project_id: props.id,
      image_path: filePath
    })
    if (error) {
      return toast.add({
        severity: 'error',
        summary: 'Error linking image to project',
        detail: error.message,
        life: 2000
      })
    }
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Image uploaded successfully',
      life: 2000
    })
  } catch (e) {
    toast.add({
      severity: 'error',
      summary: 'Error Uploading Image',
      detail: e.message,
      life: 2000
    })
  }
  refresh()
}

onMounted(() => {
  refresh()
})
</script>

<template>
  <div
    class="p-3"
    :style="{
      backgroundImage: `url('/bw-bg-2.jpg')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '100%'
    }"
  >
    <div
      class="flex flex-col lg:flex-row justify-between items-center 2xl:p-24 2xl:pt-8 2xl:pb-8 pt-8 pb-8"
    >
      <div class="lg:w-1/2 tracking-widest leading-8 indent">{{ project.project.description }}</div>
      <BidRequest class="mt-8 w-full md:w-96" />
    </div>
    <Button
      v-if="user.isLoggedIn"
      as="label"
      for="newProjectImage"
      label="Add Image"
      icon="pi pi-upload"
      :disabled="uploading"
    />
    <input
      v-if="user.isLoggedIn"
      style="visibility: hidden"
      type="file"
      id="newProjectImage"
      accept="image/*"
      @change="uploadPhoto"
      :disabled="uploading"
    />
  </div>
  <div class="flex flex-wrap justify-center">
    <div v-for="image in imagePaths" :key="image.id" class="m-2 flex flex-wrap">
      <Image :src="image" alt="Project Image" :width="galleryWidth" preview />
    </div>
  </div>
</template>
