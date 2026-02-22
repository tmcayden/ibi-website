<script setup>
import Select from 'primevue/select'
import { computed } from 'vue'
import Message from 'primevue/message'
import FloatLabel from 'primevue/floatlabel'
import { useField } from 'vee-validate'

// Setup
const props = defineProps({
  id: { type: String, required: true },
  modelValue: { type: [String, Number, null], required: true },
  options: { type: Array, required: true },
  label: { type: String, required: true },
  optionLabel: { type: String, required: false, default: 'label' },
  optionValue: { type: String, required: false, default: 'value' },
  placeholder: { type: String, required: false, default: null },
  readonly: { type: Boolean, required: false, default: false },
  filter: { type: Boolean, required: false, default: false },
  optionGroupLabel: { type: String, required: false, default: null },
  optionGroupChildren: { type: String, required: false, default: null }
})

// State
const { value, errorMessage } = useField(() => props.id, undefined, { syncVModel: true })

// Computed
const showClear = computed(
  () => !props.readonly && value.value !== null && value.value !== undefined && value.value !== ''
)
const isInvalid = computed(() => errorMessage.value !== undefined && errorMessage.value.length > 0)

const virtualScrollerOptions = computed(() => {
  return props.options?.length > 20 ? { itemSize: 40 } : null
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <FloatLabel variant='on'>
      <Select
        :id="props.id"
        v-model="value"
        :options="props.options"
        :option-label="props.optionLabel"
        :option-value="props.optionValue"
        :placeholder="props.placeholder"
        :disabled="props.readonly"
        :filter="props.filter"
        :show-clear="showClear"
        :invalid="isInvalid"
        :option-group-label="props.optionGroupLabel"
        :option-group-children="props.optionGroupChildren"
        :virtual-scroller-options="virtualScrollerOptions"
        fluid
      />
      <label :for="props.id">{{ props.label }}</label>
    </FloatLabel>
    <Message v-if="isInvalid" severity="error">
      {{ errorMessage }}
    </Message>
  </div>
</template>

