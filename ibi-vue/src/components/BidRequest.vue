<script setup>
import RadioButton from 'primevue/radiobutton'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useForm, Field } from 'vee-validate'
import * as yup from 'yup'
import SemInputText from './SempurnaComponents/SemInputText.vue'
import Message from 'primevue/message'

// Props
const props = defineProps({
  showEffect: {
    type: Boolean,
    default: true
  }
})

// Setup
const toast = useToast()

// Validation schema
const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  contactMethod: yup
    .string()
    .required('Please select a contact method')
    .oneOf(['email', 'phone'], 'Please select either email or phone'),
  contactEmail: yup.string().when('contactMethod', {
    is: 'email',
    then: (schema) => schema.email('Please enter a valid email').required('Email is required'),
    otherwise: (schema) => schema.notRequired()
  }),
  contactPhone: yup.string().when('contactMethod', {
    is: 'phone',
    then: (schema) => schema.required('Phone number is required'),
    otherwise: (schema) => schema.notRequired()
  })
})

// Use form with validation schema
const { handleSubmit, errors } = useForm({
  validationSchema
})

// State
const bidRequest = ref({
  name: '',
  contactMethod: '',
  email: '',
  phone: ''
})

// Computed
const contactIcon = computed(() => {
  return bidRequest.value.contactMethod == 'email' ? 'pi pi-envelope' : 'pi pi-phone'
})

// Actions
const requestABid = async () => {
  const emailData = {
    user_name: bidRequest.value.name,
      user_email: bidRequest.value.email,
      user_phone: bidRequest.value.phone
  };

  try {
    const response = await fetch('/.netlify/functions/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        template: 'bidRequest',      // Template name (e.g., 'bidRequest')
        data: emailData,             // Data to populate template (e.g., name, email, etc.)
        to: import.meta.env.VITE_TO_EMAIL, // The recipient email
        subject: 'New Bid Request'   // Subject of the email
      }),
    });

    if (response.ok) {
      toast.add({
        severity: 'info',
        summary: 'Bid Requested',
        detail: 'We will contact you shortly.',
        life: 3000
      })
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Unable to send request. Please contact us directly.',
        life: 3000
      });
    }
  } catch (error) {
    toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Unable to send request. Please contact us directly.',
        life: 3000
      });
  }
}

// Submit handler
const onSubmit = handleSubmit((values) => {
  requestABid()
})
</script>

<template>
  <Card
    class="p-3 animate-duration-1000 w-96"
    v-animateonscroll="{ enterClass: showEffect ? 'animate-fadeinright' : '' }"
  >
    <template #header>
      <p class="text-xl text-center font-medium w-full tracking-wider">
        Request a <span class="font-extrabold">FREE</span> Bid!
      </p>
    </template>
    <template #content>
      <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
        <SemInputText id="name" label="Name" v-model="bidRequest.name" class="w-full" />
        <Field name="contactMethod" as="div" class="flex justify-between">
          <div>
            <RadioButton
              v-model="bidRequest.contactMethod"
              inputId="methodPhone"
              name="contactMethod"
              value="phone"
            />
            <label for="methodPhone" class="ml-2">Phone</label>
          </div>
          <div>
            <RadioButton
              v-model="bidRequest.contactMethod"
              inputId="methodEmail"
              name="contactMethod"
              value="email"
            />
            <label for="methodEmail" class="ml-2">Email</label>
          </div>
        </Field>
        <Message v-if="errors.contactMethod" severity="error">{{ errors.contactMethod }}</Message>
        <SemInputText
          v-if="bidRequest.contactMethod == 'email'"
          label="Email"
          id="contactEmail"
          v-model="bidRequest.email"
          class="w-full"
        />
        <SemInputText
          v-if="bidRequest.contactMethod == 'phone'"
          label="Phone"
          id="contactPhone"
          v-model="bidRequest.phone"
          class="w-full"
        />
        <Button
          v-ripple
          label="Request"
          :icon="contactIcon"
          rounded
          class="text-center w-full"
          type="submit"
        />
      </form>
    </template>
  </Card>
</template>
