<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { ref, computed } from 'vue'

const props = defineProps<{
  title: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
}>()

const open = defineModel<boolean>('open', { required: true })

const sizeClasses = computed(() => {
  switch (props.size || 'md') {
    case 'sm':
      return 'sm:max-w-md'
    case 'md':
      return 'sm:max-w-lg'
    case 'lg':
      return 'sm:max-w-4xl'
    default:
      return 'sm:max-w-lg'
  }
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent :class="sizeClasses">
      <DialogHeader>
        <DialogTitle>{{ props.title }}</DialogTitle>
        <DialogDescription>
          {{ props.description }}
        </DialogDescription>
      </DialogHeader>
      <slot></slot>
      <DialogFooter>
        <slot name="footer"></slot>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
