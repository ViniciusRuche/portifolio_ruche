<script setup lang="ts">
import FileDropZone from './FileDropZone.vue'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form'

interface FileUploadProps {
  accept?: string
  maxSize?: string
  label?: string
  description?: string
  required?: boolean
  multiple?: boolean
  name: string
  modelValue?: File[]
}

const props = withDefaults(defineProps<FileUploadProps>(), {
  accept: 'image/*',
  maxSize: '4MB',
  label: 'Upload a project image',
  description: '',
  required: false,
  multiple: false,
  modelValue: () => []
})
</script>

<template>
  <FormField v-slot="{ handleChange }" :name="props.name">
    <FormItem>
      <FormLabel v-if="props.label"
        >{{ props.label }} <span v-if="props.required">*</span></FormLabel
      >
      <FormControl>
        <FileDropZone
          :accept="accept"
          :max-size="maxSize"
          :label="label"
          :multiple="multiple"
          @file-select="handleChange"
        />
      </FormControl>
      <FormDescription v-if="props.description"> {{ props.description }}</FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
