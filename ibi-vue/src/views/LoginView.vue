<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import Card from 'primevue/card'
import SemInputText from '../components/SempurnaComponents/SemInputText.vue'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import { useToast } from 'primevue/usetoast'

const user = useUserStore()
const toast = useToast()
const email = ref(null)
const isLoading = ref(false)

const doLogin = async () => {
  isLoading.value = true
  const { error = {}, success } = await user.handleLogin(email.value)
  if (success)
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Check your email for the login link'
    })
  else toast.add({ severity: 'error', summary: 'Error', detail: error.message })
  isLoading.value = false
}
</script>

<template>
  <div class="w-full flex justify-center">
    <Card class="mt-3 md:w-1/3">
      <template #header>
        <p class="text-center font-medium w-full p-4 pb-0">
          Enter your email to receive a one-time login link
        </p>
        <Divider />
      </template>
      <template #content>
        <div class="flex items-center gap-8 flex-col">
          <SemInputText id="email" label="Email" v-model="email" class="w-full xl:w-80" />
          <Button
            :disabled="!email || isLoading"
            label="Request Link"
            icon="pi pi-sign-in"
            rounded
            class="text-center w-48"
            type="submit"
            @click="doLogin"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
