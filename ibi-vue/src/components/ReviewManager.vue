<script setup>
import { computed, onMounted, ref } from 'vue'
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
import SemInputNumber from './SempurnaComponents/SemInputNumber.vue'
import SemTextArea from './SempurnaComponents/SemTextArea.vue'
import SemCheckBox from './SempurnaComponents/SemCheckBox.vue'
import * as yup from 'yup'
import { useForm } from 'vee-validate'

const confirm = useConfirm()
const reviews = ref([])
const review = ref({
    customer_name: null,
    rating: null,
    source: null,
    review: null,
    is_active: false
})
const isLoading = ref(false)
const toast = useToast()
const user = useUserStore()
const showReviewModal = ref(false)

const validationSchema = yup.object({
    customer_name: yup.string().required('Name is required'),
    rating: yup.number().required('Rating is required').max(5),
    source: yup.string(),
    review: yup.string().required('Review is required'),
    is_active: yup.boolean()
})

const columns = [
    { field: 'customer_name', header: 'Customer' },
    { field: 'rating', header: 'Rating' },
    { field: 'source', header: 'Source' },
    { field: 'review', header: 'Review' },
    { field: 'is_active', header: 'Show on Home?', type: 'bool' },
    { field: 'is_private', header: 'Private', type: 'bool' },
    { field: 'created_at', header: 'Date Created', type: 'date' }
]

const isNew = computed(() => !review.value.id)
const reviewModalTitle = computed(() => (isNew.value ? 'Add a new review' : 'Edit review'))

function manageReview(data = {}) {
    review.value = data
    showReviewModal.value = true
}

async function addReview() {
    if (review.value == {}) return
    const { error } = await supabase.from('customer_reviews').insert([review.value]).select()
    if (error) toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 })
    else {
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Review added successfully',
            life: 2000
        })
        showReviewModal.value = false
        await refresh()
    }
}

async function updateReview() {
    const { error } = await supabase
        .from('customer_reviews')
        .update(review.value)
        .eq('id', review.value.id)

    if (error) toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 })
    else {
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Review updated successfully',
            life: 2000
        })
        showReviewModal.value = false
        await refresh()
    }
}

function confirmDelete(id) {
    confirm.require({
        message: 'Are you sure you want to Delete this review?',
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
            deleteReview(id)
        },
        reject: () => {
            return false
        }
    })
}

async function deleteReview(id) {
    if (!id) return
    const { error } = await supabase.from('customer_reviews').delete().eq('id', id)
    if (error) toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 })
    else {
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Review deleted successfully',
            life: 2000
        })
        await refresh()
    }
}

async function refresh() {
    if (!user.isLoggedIn) return
    isLoading.value = true
    const { data = [], error } = await supabase
        .from('customer_reviews')
        .select('*')
        .order('created_at', { ascending: false })
    if (error) toast.add({ severity: 'error', summary: 'Error', detail: error.message })
    reviews.value = data
    isLoading.value = false
}

const { handleSubmit } = useForm({
    validationSchema
})

const onSave = handleSubmit(() => {
    addReview()
})

const onUpdate = handleSubmit(() => {
    updateReview()
})

onMounted(async () => {
    await refresh()
})
</script>

<template>
    <Panel class="w-full">
        <template #header>
            <p class="font-bold text-2xl">Review Manager</p>
        </template>
        <template #icons>
            <Button severity="success" icon="pi pi-p" @click="manageReview()">
                <i class="pi pi-plus"></i>
            </Button>
        </template>
        <DataTable :value="reviews" sortField="is_active" :sortOrder="-1">
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
                    <div v-else>{{ slotProps.data[col.field] }}</div>
                </template>
            </Column>
            <Column header="Actions">
                <template #body="slotProps">
                    <div class="w-36 flex justify-between">
                        <Button label="Edit" @click="manageReview(slotProps.data)" />
                        <Button label="Delete" severity="danger" @click="confirmDelete(slotProps.data.id)" />
                    </div>
                </template>
            </Column>
        </DataTable>
    </Panel>
    <Dialog v-model:visible="showReviewModal" class="w-full m-2 lg:w-1/3">
        <template #header>
            <p class="font-medium w-full text-center text-xl">{{ reviewModalTitle }}</p>
        </template>
        <div class="flex flex-wrap gap-8 justify-between mt-3">
            <SemInputText v-model="review.customer_name" id="customer_name" label="Name" />
            <SemInputNumber v-model="review.rating" id="rating" label="Rating" />
            <SemInputText v-model="review.source" id="source" label="Source" />
            <SemCheckBox v-model="review.is_active" id="is_active" label="Show on Home?" v-tooltip="'Show the review on the Home Page'" />
            <SemCheckBox v-model="review.is_private" id="is_private" label="Private?"
                v-tooltip="'Override the \'Show on Home\' flag and hide this review from the public'" />
            <SemTextArea v-model="review.review" id="review" label="Review" class="w-full" />
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" severity="secondary" @click="showReviewModal = false" />
            <Button v-if="isNew" label="Save" severity="success" icon="pi pi-save" @click="onSave" />
            <Button v-else label="Update" severity="success" icon="pi pi-save" @click="onUpdate" />
        </template>
    </Dialog>
</template>
