<script setup>
import { useToast } from 'primevue/usetoast'
import { useUserStore } from '../stores/userStore'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { supabase } from '../supabase'
import { useProjectStore } from '../stores/projectStore'
import Button from 'primevue/button'

const props = defineProps({
  id: { type: [String, Number], required: true }
})
const toast = useToast()
const user = useUserStore()
const project = useProjectStore()

const isLoading = ref(false)
const images = ref([])
const uploading = ref(false)
const uploadedFile = ref(null)

async function refresh() {
  isLoading.value = true
  const { data = [] } = await supabase
    .from('project_images')
    .select('*')
    .eq('project_id', props.id)

  images.value = data
  isLoading.value = false
}

async function uploadPhoto(event)
{
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

    const {error} = await supabase.from('project_images').insert({
      project_id: props.id,
      image_path: filePath
    })
    if (error)
    {
      toast.add({ severity: 'error', summary: 'Error linking image to project', detail: error.message, life: 2000 })
    }
  }
  catch(e)
  {
    toast.add({ severity: 'error', summary: 'Error Uploading Image', detail: e.message, life: 2000 })
  }
  refresh()
}

onMounted(() => {
  refresh()
})
</script>

<template>
  <div class="bg-white p-3">
    <Button as="label" for="newProjectImage" label="Add Image" icon="pi pi-upload" :disabled="uploading"/>
    <input style="visibility: hidden;" type="file" id="newProjectImage" accept="image/*" @change="uploadPhoto" :disabled="uploading"></input>
  </div>
</template>
