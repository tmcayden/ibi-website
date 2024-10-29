<script setup>
import InputNumber from 'primevue/inputnumber'
import { computed } from 'vue'
import Message from 'primevue/message'
import FloatLabel from 'primevue/floatlabel'
import { useField } from 'vee-validate'

// Setup
const props = defineProps({
  id: { type: String, required: true },
  modelValue: { type: [Number, null], required: true },
  label: { type: String, required: true },
  readonly: { type: Boolean, required: false, default: false },
  minFractionDigits: { type: Number, required: false, default: 0 },
  maxFractionDigits: { type: Number, required: false, default: 0 },
  useGrouping: { type: Boolean, required: false, default: false }
})

// State
const { value, errorMessage } = useField(() => props.id, undefined, { syncVModel: true })

// Computed
const isInvalid = computed(() => errorMessage.value !== undefined && errorMessage.value.length > 0)
</script>

<template>
  <div class="flex flex-col gap-2">
    <FloatLabel variant="on">
      <InputNumber
        :id="props.id"
        v-model="value"
        :disabled="props.readonly"
        fluid
        :min-fraction-digits="minFractionDigits"
        :max-fraction-digits="maxFractionDigits"
        :invalid="isInvalid"
        :use-grouping="props.useGrouping"
      />
      <label :for="props.id">{{ props.label }}</label>
    </FloatLabel>
    <Message v-if="isInvalid" severity="error">
      {{ errorMessage }}
    </Message>
  </div>
</template>
