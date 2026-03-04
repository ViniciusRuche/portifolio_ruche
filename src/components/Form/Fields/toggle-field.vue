<template>
  <div>
    <label class="inline-flex items-center cursor-pointer">
      <input v-model="value" type="checkbox" class="sr-only peer" />
      <div
        class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
      ></div>
      <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{ label }}</span>
    </label>
    <p :class="textColorClasses" class="mt-2 text-sm">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useField } from 'vee-validate'
import { isNil } from 'lodash'
const props = defineProps({
  name: String,
  label: String,
  modelValue: Boolean,
  error: String
})

const { value, errorMessage } = useField(() => props.name, undefined, {
  syncVModel: true
})

const textColorClasses = computed(() => {
  return isNil(errorMessage.value) && isNil(props.error)
    ? 'text-gray-900 dark:text-gray-300'
    : 'text-red-600 dark:text-red-500'
})
</script>
