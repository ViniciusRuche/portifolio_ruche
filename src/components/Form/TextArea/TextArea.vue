<script setup lang="ts">
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { computed, watch } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
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
  },
  readonly: {
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
        <Textarea 
          :placeholder="computedPlaceholder" 
          :class="['resize-none', $attrs.class]"
          v-bind="componentField" 
          :disabled="props.disabled" 
          :readonly="props.readonly"
        />
      </FormControl>
      <FormDescription v-if="props.description">
        {{ props.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>