<script setup>
import { computed, ref, toRefs, watchEffect } from 'vue'
import { supabase } from '../../supabase'
import { useToast } from 'primevue/usetoast'
import { downloadFile } from '../../util/supabase/downloadFile'

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

const uploadAvatar = async (event) => {
  files.value = event.target.files
  try {
    uploading.value = true
    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = files.value[0]
    const fileExt = file.name.split('.').pop()
    const filePath = `${category.value}/${Math.random()}.${fileExt}`

    const { error: uploadError } = await supabase.storage.from('projects').upload(filePath, file)

    if (uploadError) throw uploadError
    emit('update:path', filePath)
    emit('upload')
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: uploadError.message, life: 2000 })
  } finally {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Image uploaded successfully',
      life: 2000
    })
    uploading.value = false
  }
}

watchEffect(() => {
  if (path.value) downloadImage()
})
</script>

<template>
  <div>
    <img v-if="src" :src="src" alt="Avatar" class="avatar image" />
    <div v-else class="avatar no-image" />
    <div>
      <label
        class="button primary block"
        :class="!readonly ? 'cursor-pointer' : ''"
        for="single"
        v-tooltip.top="readonly ? 'A category is required before file upload' : ''"
      >
        <i class="pi pi-upload"></i>
        {{ uploading ? 'Uploading ...' : path ? 'Replace Image' : 'Upload Image' }}
      </label>
      <input
        style="visibility: hidden; position: absolute"
        type="file"
        id="single"
        accept="image/*"
        @change="uploadAvatar"
        :disabled="uploading || readonly"
      />
    </div>
  </div>
</template>
