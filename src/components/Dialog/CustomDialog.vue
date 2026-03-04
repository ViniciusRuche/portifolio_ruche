<script setup lang="ts">
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CustomDialogContent } from '@/components/Dialog/components/'
import { computed } from 'vue'

const props = defineProps<{
  title: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
  showClose?: boolean
}>()

const open = defineModel<boolean>('open', { required: true })

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'sm:max-w-md',
    md: 'sm:max-w-lg',
    lg: 'sm:max-w-4xl'
  }
  return sizes[props.size || 'md']
})
</script>

<template>
  <Dialog v-model:open="open">
    <CustomDialogContent :class="[sizeClasses, !props.showClose && 'hide-close']">
      <DialogHeader>
        <div class="flex items-start justify-between w-full">
          <div class="flex-1">
            <DialogTitle>{{ props.title }}</DialogTitle>
            <DialogDescription v-if="props.description">
              {{ props.description }}
            </DialogDescription>
          </div>
          
          <div v-if="!props.showClose" class="ml-4 -mt-2">
            <slot name="header-actions"></slot>
          </div>
        </div>
      </DialogHeader>

      <slot></slot>

      <DialogFooter v-if="$slots.footer">
        <slot name="footer"></slot>
      </DialogFooter>
    </CustomDialogContent>
  </Dialog>
</template>

<style scoped>
:deep(.hide-close button[class*="absolute"]) {
  display: none !important;
}
</style>