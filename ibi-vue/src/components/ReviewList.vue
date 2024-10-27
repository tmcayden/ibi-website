<script setup>
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useToast } from 'primevue/usetoast'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Panel from 'primevue/panel'
import { supabase } from '../supabase'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { useConfirm } from 'primevue/useconfirm'
import SemInputText from './SemInputText.vue'

const confirm = useConfirm()
const reviews = ref([])
const review = ref({})
const isLoading = ref(false)
const toast = useToast()
const user = useUserStore()
const isNew = ref(false)

const showReviewModal = ref(false)

const columns = [
  { field: 'customer_name', header: 'Customer' },
  { field: 'rating', header: 'Rating' },
  { field: 'source', header: 'Source' },
  { field: 'review', header: 'Review' }
]

function manageReview(data = {}) {
  review.value = data
  isNew.value = data == {}
  showReviewModal.value = true
}

async function addReview() {
  if (review.value == {}) return
  const { error, data } = await supabase
    .from('customer_reviews')
    .insert([
      { customer_name: review.customer_name },
      { rating: review.rating },
      { source: review.source },
      { review: review.review }
    ])
    .select()
  if (error) toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 5000 })
  else {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Review added successfully',
      life: 5000
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

  if (error) toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 5000 })
  else {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Review updated successfully',
      life: 5000
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
  if (error) toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 5000 })
  else {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Review deleted successfully',
      life: 5000
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

onMounted(async () => {
  await refresh()
})
</script>

<template>
  <Panel class="w-full">
    <template #header><p class="font-bold text-2xl">Review Manager</p></template>
    <template #icons>
      <Button severity="success" icon="pi pi-p" @click="manageReview()">
        <i class="pi pi-plus"></i>
      </Button>
    </template>
    <DataTable :value="reviews">
      <Column v-for="col of columns" :key="col.field" :header="col.header" :field="col.field" />
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
  <Dialog v-model:visible="showReviewModal">
    <template #header
      ><p class="font-medium w-full text-center text-xl">Add a new review</p></template
    >
    <div class="flex flex-wrap gap-3 justify-between mt-3">
      <SemInputText v-model="review.customer_name" id="name" label="Name" class="" />
      <SemInputText v-model="review.rating" id="rating" label="Rating" class="" />
      <SemInputText v-model="review.source" id="source" label="Source" class="" />
      <SemInputText v-model="review.review" id="review" label="Review" class="w-full" />
    </div>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        severity="secondary"
        @click="showReviewModal = false"
      />
      <Button v-if="isNew" label="Save" severity="success" icon="pi pi-save" @click="addReview" />
      <Button v-else label="Update" severity="success" icon="pi pi-save" @click="updateReview" />
    </template>
  </Dialog>
</template>
