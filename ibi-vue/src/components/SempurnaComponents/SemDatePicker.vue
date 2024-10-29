<script setup>
import { computed } from 'vue'
import DatePicker from 'primevue/datepicker'
import Message from 'primevue/message'
import FloatLabel from 'primevue/floatlabel'
import { useField } from 'vee-validate'

// Setup
const props = defineProps({
  id: { type: String, required: true },
  modelValue: { type: [Date, null], required: true },
  dateFormat: { type: String, required: false, default: 'mm/dd/yy' },
  label: { type: String, required: true },
  minDate: { type: Date, required: false, default: null },
  maxDate: { type: Date, required: false, default: null },
  placeholder: { type: String, required: false, default: null },
  readonly: { type: Boolean, required: false, default: false },
  timeonly: { type: Boolean, required: false, default: false },
  showTime: { type: Boolean, required: false, default: false }
})

// State
const { value, errorMessage } = useField(() => props.id, undefined, { syncVModel: true })

// Computed
const isInvalid = computed(() => errorMessage.value !== undefined && errorMessage.value.length > 0)
</script>

<template>
  <div class="flex flex-col gap-2">
    <FloatLabel variant="on">
      <DatePicker
        :id="props.id"
        v-model="value"
        :placeholder="props.placeholder"
        :disabled="props.readonly"
        :invalid="isInvalid"
        :min-date="minDate"
        :max-date="maxDate"
        :time-only="props.timeonly"
        :show-time="props.showTime"
        show-button-bar
        fluid
        show-icon
        icon-display="input"
        @update:model-value="handleUpdate"
      />
      <!-- This label correctly references the input nested in the PrimeVue component -->
      <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
      <label :for="props.id">{{ props.label }}</label>
    </FloatLabel>
    <Message v-if="isInvalid" severity="error">
      {{ errorMessage }}
    </Message>
  </div>
</template>
<style></style>
