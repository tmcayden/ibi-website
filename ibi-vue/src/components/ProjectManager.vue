<script setup>
import { computed, onMounted, ref, nextTick } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useToast } from 'primevue/usetoast'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Panel from 'primevue/panel'
import { supabase } from '../supabase'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { useConfirm } from 'primevue/useconfirm'
import SemInputText from './SempurnaComponents/SemInputText.vue'
import SemTextArea from './SempurnaComponents/SemTextArea.vue'
import SemInputNumber from './SempurnaComponents/SemInputNumber.vue'
import SemCheckBox from './SempurnaComponents/SemCheckBox.vue'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import SemDatePicker from './SempurnaComponents/SemDatePicker.vue'
import SemFileUpload from './SempurnaComponents/SemFileUpload.vue'
import SemSelect from './SempurnaComponents/SemSelect.vue'

const confirm = useConfirm()
const projects = ref([])
const project = ref({
    project_name: null,
    category: null,
    description: null,
    is_active: false,
    is_private: false,
    start_date: null,
    end_date: null,
    created_date: null,
    image_path: null
})
const isLoading = ref(false)
const toast = useToast()
const showProjectModal = ref(false)

const validationSchema = yup.object({
    project_name: yup.string().required('Project Name is required'),
    category: yup.string().required('Category is required'),
    is_active: yup.boolean()
})

const columns = [
    { field: 'project_name', header: 'Project', type: 'detail' },
    { field: 'category', header: 'Category' },
    { field: 'description', header: 'Description' },
    { field: 'is_active', header: 'Show on Home', type: 'bool' },
    { field: 'is_private', header: 'Private', type: 'bool' },
    { field: 'start_date', header: 'Start Date', type: 'date' },
    { field: 'end_date', header: 'End Date', type: 'date' },
    { field: 'image_path', header: 'Image', type: 'image' },
    { field: 'created_date', header: 'Date Created', type: 'date' },
    { field: 'parent_project_id', header: 'Parent Project' }
]

const isNew = computed(() => !project.value.id)
const disableFileUpload = computed(
    () => project.value.category == null || project.value.category == ''
)

function manageProject(data = {}) {
    project.value = data
    showProjectModal.value = true
}

async function refresh() {
    isLoading.value = true
    const { data = [], error } = await supabase.from('projects').select('*')
    if (error) toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 })
    else projects.value = data
    isLoading.value = false
}

async function addProject() {
    if (project.value == {}) return
    if (project.value.is_private)
        project.value.is_active = false
    const { error } = await supabase.from('projects').insert([project.value]).select()
    if (error) toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 })
    else {
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Project added successfully',
            life: 2000
        })
        showProjectModal.value = false
        await refresh()
    }
}

async function updateProject() {
    const { error } = await supabase.from('projects').update(project.value).eq('id', project.value.id)

    if (error) toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 })
    else {
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Project updated successfully',
            life: 2000
        })
        showProjectModal.value = false
        await refresh()
    }
}

function confirmDelete(id) {
    confirm.require({
        message: 'Are you sure you want to Delete this project?',
        header: 'Please Confirm',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger'
        },
        accept: () => {
            deleteProject(id)
        },
        reject: () => {
            return false
        }
    })
}

async function deleteProject(id) {
    if (!id) return
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 })
    else {
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Project deleted successfully',
            life: 2000
        })
        await refresh()
    }
}

const { handleSubmit } = useForm({
    validationSchema
})

const onSave = handleSubmit(() => {
    addProject()
})

const onUpdate = handleSubmit(() => {
    updateProject()
})

onMounted(async () => {
    await refresh()
})
</script>

<template>
    <Panel class="w-full">
        <template #header>
            <p class="font-bold text-2xl">Project Manager</p>
        </template>
        <template #icons>
            <Button severity="success" icon="pi pi-p" @click="manageProject()">
                <i class="pi pi-plus"></i>
            </Button>
        </template>
        <DataTable :value="projects" sortField="is_active" :sortOrder="-1">
            <Column v-for="col of columns" :key="col.field" :header="col.header" :field="col.field" sortable>
                <template #body="slotProps">
                    <div v-if="col.type == 'bool'" class="flex justify-center">
                        <i v-if="slotProps.data[col.field]" class="pi pi-check"></i>
                    </div>
                    <div v-else-if="col.type == 'date'">
                        {{
                            slotProps.data[col.field] != null
                                ? new Date(slotProps.data[col.field]).toLocaleDateString()
                                : ''
                        }}
                    </div>
                    <div v-else-if="col.type == 'detail'">
                        <Button :label="slotProps.data[col.field]" as="router-link" link
                            :to="{ name: 'project', params: { id: slotProps.data.id } }" />
                    </div>
                    <div v-else-if="col.field == 'parent_project_id'">
                        {{
                            projects.find(p => p.id === slotProps.data[col.field])?.project_name || ''
                        }}
                    </div>
                    <div v-else>{{ slotProps.data[col.field] }}</div>
                </template>
            </Column>
            <Column header="Actions">
                <template #body="slotProps">
                    <div class="w-36 flex justify-between">
                        <Button label="Edit" @click="manageProject(slotProps.data)" />
                        <Button label="Delete" severity="danger" @click="confirmDelete(slotProps.data.id)" />
                    </div>
                </template>
            </Column>
        </DataTable>
    </Panel>
    <Dialog v-model:visible="showProjectModal" class="w-full m-2 lg:w-1/3" blockScroll>
        <template #header>
            <p class="font-medium w-full text-center text-xl">Add a New Project</p>
        </template>
        <div class="flex flex-wrap gap-8 justify-between mt-3">
            <SemInputText v-model="project.project_name" id="project_name" label="Project Name" />
            <SemInputText v-model="project.category" id="category" label="Category" />
            <SemDatePicker v-model="project.start_date" id="start_date" label="Start Date" />
            <SemDatePicker v-model="project.end_date" id="end_date" label="End Date" />
            <SemSelect v-model="project.parent_project_id" id="parent_project_id"
                :options="projects.filter(x => x.id != project.id)" optionLabel='project_name' optionValue='id'
                label="Assign to Another Project?" class="w-80"
                v-tooltip="'Hide the project from the gallery and home and show it inside the selected project.'" />
            <SemTextArea v-model="project.description" id="description" label="Description" class="w-full" />
            <SemFileUpload :readonly="disableFileUpload" v-model:category="project.category"
                v-model:path="project.image_path" id="image_path" label="Image" />
            <SemCheckBox v-model="project.is_active" id="is_active" label="Show on Home?"
                v-tooltip="'Show the project on the Home Page'" />
            <SemCheckBox v-model="project.is_private" id="is_private" label="Private?"
                v-tooltip="'Override the \'Show on Home\' flag and hide this project from the public'" />
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" severity="secondary" @click="showProjectModal = false" />
            <Button v-if="isNew" label="Save" severity="success" icon="pi pi-save" @click="onSave" />
            <Button v-else label="Update" severity="success" icon="pi pi-save" @click="onUpdate" />
        </template>
    </Dialog>
</template>
