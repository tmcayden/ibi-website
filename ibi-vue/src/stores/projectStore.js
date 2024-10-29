import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const useProjectStore = defineStore('project', () => {
  const project = ref({})

  async function loadProject(id) {
    const { data = {}, error } = await supabase.from('projects').select('*').eq('id', id)
    project.value = data[0]
  }

  return {
    project,
    loadProject
  }
})
