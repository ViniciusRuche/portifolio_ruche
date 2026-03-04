<template>
  <MaskedField v-bind="props" mask="##.###.###/####-##" />
</template>

<script setup>
import MaskedField from './MaskedField.vue'
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: true
  },
})
</script>