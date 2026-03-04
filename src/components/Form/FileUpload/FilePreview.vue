<script setup lang="ts">
import { computed } from 'vue'
import { File as FileIcon, FileText, FileImage, X } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

interface FilePreviewProps {
  file: File
  previewUrl?: string | null
}

const props = defineProps<FilePreviewProps>()

const emit = defineEmits<{
  cancel: []
}>()

const isImage = computed(() => props.file.type.startsWith('image/'))

const imageUrl = computed(() => (isImage.value ? props.previewUrl || null : null))

const fileIcon = computed(() => {
  if (props.file.type.startsWith('image/')) return FileImage
  if (props.file.type.includes('pdf') || props.file.type.includes('document')) return FileText
  return FileIcon
})

const handleCancel = (e: Event) => {
  e.stopPropagation()
  emit('cancel')
}
</script>

<template>
  <div
    class="relative group w-48 h-48 bg-muted rounded-md flex items-center justify-center overflow-hidden flex-shrink-0 border border-border"
  >
    <img
      v-if="isImage && imageUrl"
      :src="imageUrl"
      :alt="file.name"
      class="w-full h-full object-cover"
    />
    <component v-else :is="fileIcon" class="h-6 w-6 text-muted-foreground" />

    <Button
      type="button"
      size="icon"
      class="absolute top-1 right-1 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
      @click.stop="handleCancel"
    >
      <X class="h-3 w-3" />
    </Button>
  </div>
</template>
