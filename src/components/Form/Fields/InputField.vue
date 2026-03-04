<script setup lang="ts">
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { computed } from 'vue'
const props = defineProps({
  type: {
    type: String,
    default: 'text'
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
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const model = defineModel({ required: false })

const computedLabel = computed(() => props.required ? `${props.label} *` : props.label)
const computedPlaceholder = computed(() =>
  props.required && props.placeholder ? `${props.placeholder} *` : props.placeholder
)

</script>

<template>
  <FormField v-model="model" v-slot="{ componentField }" :name="props.name">
    <FormItem>
      <FormLabel v-if="props.label">{{ computedLabel }}</FormLabel>
      <FormControl>
        <Input type="text" :placeholder="computedPlaceholder" v-bind="componentField" :disabled="props.disabled" :class="$attrs.class"/>
      </FormControl>
      <FormDescription v-if="props.description"> {{ props.description }}</FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
