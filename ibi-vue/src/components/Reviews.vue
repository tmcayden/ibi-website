<script setup>
import Button from 'primevue/button'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { supabase } from '../supabase'
import ProgressSpinner from 'primevue/progressspinner'

const toast = useToast()
const user = useUserStore()

const isLoading = ref(false)
const reviews = ref([])

async function refresh() {
  isLoading.value = true
  const { data = [], error } = await supabase
    .from('customer_reviews')
    .select('*')
    .order('created_at', { ascending: false })
    .eq('is_active', true)
  reviews.value = data
  isLoading.value = false
}

function getStarIcons(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return {
    fullStars,
    halfStars: hasHalfStar ? 1 : 0
  }
}

onMounted(async () => await refresh())
</script>

<template>
  <div v-if="reviews.length > 0 && !isLoading" class="flex flex-wrap justify-around bg-white p-5">
    <Card v-for="review in reviews" class="w-96 m-3 bg-zinc-800">
      <template #content>
        <div class="flex items-center text-slate-300">
          <p>{{ review.review }}</p>
        </div>
      </template>
      <template #footer>
        <Divider />
        <div class="flex mt-1 sm:mt-0">
          <div class="text-white w-full pl-2">
            <p>
              {{ review.customer_name }}
            </p>
            <p class="text-slate-500">
              {{ review.source }}
            </p>
          </div>
          <div class="flex gap-2 items-center">
            <p class="text-slate-500">({{ review.rating }})</p>
            <!-- Full stars -->
            <i
              v-for="n in getStarIcons(review.rating).fullStars"
              :key="'full-' + n"
              class="pi pi-star-fill"
              style="color: goldenrod"
            ></i>
            <!-- half star -->
            <i
              v-if="getStarIcons(review.rating).halfStars"
              class="pi pi-star-half-fill"
              style="color: goldenrod"
            ></i>
          </div>
        </div>
      </template>
    </Card>
  </div>
  <ProgressSpinner v-else />
  <div v-if="user.isLoggedIn" class="w-full text-center bg-white p-2">
    <Button
      label="Manage Reviews"
      as="router-link"
      icon="pi pi-pen-to-square"
      class="w-48"
      :to="{ name: 'admin' }"
    />
  </div>
</template>
