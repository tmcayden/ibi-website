<script setup>
import Checkbox from 'primevue/checkbox'
import Message from 'primevue/message'
import { useField } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  modelValue: { type: [Boolean, null], required: true },
  label: { type: String, required: true },
  readonly: { type: Boolean, required: false, default: false }
})

// State
const { value, errorMessage } = useField(() => props.id, undefined, { syncVModel: true })

// Computed
const isInvalid = computed(() => errorMessage.value !== undefined && errorMessage.value.length > 0)

// Actions
const toggleValue = () => {
  if (props.readonly) return
  value.value = !value.value
}
</script>

<template>
  <div @click.prevent="toggleValue">
    <Checkbox v-model="value" :input-id="props.id" :binary="true" :disabled="props.readonly" />
    <label class="ml-2" :for="props.id">{{ props.label }}</label>
    <Message v-if="isInvalid" severity="error">
      {{ errorMessage }}
    </Message>
  </div>
</template>
