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
import { useConfirm } from 'primevue/useconfirm'
import { deleteFileFromStorageByBucketAndPath, deleteFileFromTableByBucketAndId } from '../util/supabase/deleteFile'
import { compressImage } from '../util/compressImage'
import GalleryView from './GalleryView.vue'

const props = defineProps({
  id: { type: [String, Number], required: true }
})
const toast = useToast()
const user = useUserStore()
const screenSize = useScreenSizeStore()
const project = useProjectStore()
const confirm = useConfirm()

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
    paths.push({...image, path: data})
  }
  imagePaths.value = paths
}

async function uploadPhoto(event) {
  const selectedFiles = event.target.files
  try {
    uploading.value = true
    if (!selectedFiles || selectedFiles.length === 0) {
      throw new Error('You must select an image to upload.')
    }
    const file = await compressImage(selectedFiles[0])
    const filePath = `${project.project.category}/${Date.now()}.webp`

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
  uploading.value = false
  refresh()
}

function confirmImageDelete(id, path) {
  confirm.require({
    message: 'Are you sure you want to delete this image ?',
    acceptClass: 'p-button-danger pi pi-trash',
    acceptLabel: ' Delete',
    rejectLabel: 'Cancel',
    accept: async () => {
      const successTable = await deleteFileFromTableByBucketAndId('project_images', id)
      const successStorage = await deleteFileFromStorageByBucketAndPath('projects', path)
      if (successTable && successStorage)
      {
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Image deleted successfully',
            life: 2000
          })
        refresh()
      }
      else
      {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error deleting image.. Contact support',
            life: 2000
          })
      }
    }
  })
}

onMounted(() => {
  refresh()
})
</script>

<template>
  <div
    v-if="project.project.description != null && project.project.description != ''"
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
  </div>
  <div class="flex flex-col items-center">
    <Button
      v-if="user.isLoggedIn"
      as="label"
      for="newProjectImage"
      label="Add Image"
      icon="pi pi-upload"
      :loading="uploading"
      class="w-48 border-2 border-primary-200 m-2"
    />
    <input
      v-if="user.isLoggedIn"
      class="hidden"
      type="file"
      id="newProjectImage"
      accept="image/*"
      @change="uploadPhoto"
      :disabled="uploading"
    />
    <div class="flex flex-wrap justify-center">
      <div v-for="image in imagePaths" :key="image.id" class="m-2 flex flex-wrap">
        <Button v-if="user.isLoggedIn" link class="text-red-500 pi pi-times w-8 h-8" @click="confirmImageDelete(image.id, image.image_path)" />
        <Image :src="image.path" alt="Project Image" :width="galleryWidth" preview loading="lazy" />
      </div>
    </div>
    <GalleryView :parentProjectId="props.id" />
  </div>
</template>
