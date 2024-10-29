<script setup>
import InputText from 'primevue/inputtext'
import { computed } from 'vue'
import Message from 'primevue/message'
import FloatLabel from 'primevue/floatlabel'
import { useField } from 'vee-validate'

// Setup
const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  readonly: { type: Boolean, required: false, default: false },
  modelValue: { type: [String, null], required: true }
})

// State
const { value, errorMessage } = useField(() => props.id, undefined, { syncVModel: true })

// Computed
const isInvalid = computed(() => errorMessage.value !== undefined && errorMessage.value.length > 0)
</script>

<template>
  <div class="flex flex-col gap-2">
    <FloatLabel variant="on">
      <InputText
        :id="props.id"
        v-model="value"
        :disabled="props.readonly"
        :invalid="isInvalid"
        fluid
      />
      <label :for="props.id">{{ props.label }}</label>
    </FloatLabel>
    <Message v-if="isInvalid" severity="error">
      {{ errorMessage }}
    </Message>
  </div>
</template>
