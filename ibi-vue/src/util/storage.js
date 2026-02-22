import { ref, watch } from 'vue'

export function useLocalStorage(initialValue, key) {
  const val = ref(initialValue)

  const storageVal = window.localStorage.getItem(key)

  if (storageVal) {
    val.value = JSON.parse(storageVal, (key, value) => {
      // Regex to test if the string is an ISO date format
      const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z?$/
      if (typeof value === 'string' && isoDateRegex.test(value)) return new Date(value)
      return value
    })
  }

  watch(
    val,
    (newVal) => {
      window.localStorage.setItem(key, JSON.stringify(newVal))
    },
    { deep: true }
  )

  return val
}
