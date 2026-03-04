<script setup lang="ts">
import { computed } from 'vue'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const props = defineProps({
  accept: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  successMessage: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})
const computedLabel = computed(() => (props.required ? `${props.label} *` : props.label))
</script>

<template>
  <FormField v-slot="{ handleChange }" :name="props.name">
    <FormItem>
      <FormLabel v-if="props.label">{{ computedLabel }}</FormLabel>
      <FormControl>
        <Input
          type="file"
          :accept="props.accept"
          :placeholder="props.placeholder"
          @change="handleChange"
        />
      </FormControl>
      <FormDescription v-if="props.description"> {{ props.description }}</FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
