<template>
  <FormItem>
    <FormLabel v-if="props.label">{{ props.label }}</FormLabel>
    <FormControl>
      <div class="flex h-9 items-center">
        <Switch v-model="value" :disabled="props.disabled" />
      </div>
    </FormControl>
    <FormDescription v-if="props.description">
      {{ props.description }}
    </FormDescription>
    <FormMessage />
  </FormItem>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useField } from 'vee-validate'
import { Switch } from '@/components/ui/switch'
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from '@/components/ui/form'

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
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const { value } = useField(() => props.name)
</script>
