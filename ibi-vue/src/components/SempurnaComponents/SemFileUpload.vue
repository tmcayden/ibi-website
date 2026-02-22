<script setup>
import { ref, toRefs, watchEffect } from 'vue'
import { supabase } from '../../supabase'
import { useToast } from 'primevue/usetoast'
import { downloadFile } from '../../util/supabase/downloadFile'
import { compressImage } from '../../util/compressImage'
import Button from 'primevue/button'

// setup
const toast = useToast()
const prop = defineProps(['path', 'category', 'readonly'])
const { path, category, readonly } = toRefs(prop)
// state
const emit = defineEmits(['upload', 'update:path'])
const uploading = ref(false)
const src = ref('')
const files = ref()

const downloadImage = async () => {
  src.value = await downloadFile('projects', path.value)
}

const uploadImage = async (event) => {
  files.value = event.target.files
  try {
    uploading.value = true
    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = await compressImage(files.value[0])
    const filePath = `${category.value}/${Date.now()}.webp`

    const { error: uploadError } = await supabase.storage.from('projects').upload(filePath, file)

    if (uploadError) throw uploadError
    emit('update:path', filePath)
    emit('upload')
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 })
    uploading.value = false
    return
  }
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Image uploaded successfully',
    life: 2000
  })
  uploading.value = false
}

watchEffect(() => {
  if (path.value) downloadImage()
})
</script>

<template>
  <div>
    <img v-if="src" :src="src" alt="Avatar" class="avatar image" loading="lazy" />
    <div v-else class="avatar no-image" />
    <div>
      <Button
        as="label"
        for="single"
        :class="path ? 'mt-3' : ''"
        :label="uploading ? 'Uploading ...' : path ? 'Replace Image' : 'Upload Image'"
        icon="pi pi-upload"
        v-tooltip.top="readonly ? 'A category is required before file upload' : ''"
        :disabled="uploading || readonly"
      />
      <input
        style="visibility: hidden; position: absolute"
        type="file"
        id="single"
        accept="image/*"
        @change="uploadImage"
        :disabled="uploading || readonly"
      />
    </div>
  </div>
</template>
