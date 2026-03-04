<script setup lang="ts">
import { computed, onUnmounted, ref, type Ref } from 'vue'
import { Upload } from 'lucide-vue-next'
import FilePreview from './FilePreview.vue'
interface FileDropZoneProps {
  accept?: string
  maxSize?: string
  label?: string
  multiple?: boolean
  preview?: boolean
}

const props = withDefaults(defineProps<FileDropZoneProps>(), {
  accept: 'image/*',
  maxSize: '4MB',
  multiple: false,
  label: 'Upload a project image',
  preview: true
})

const files: Ref<File[]> = ref([])
const progress: Ref<number[]> = ref([])
const previewUrls = new Map<string, string>()

const emit = defineEmits<{
  'file-select': [files: File[] | File]
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)

const handleBoxClick = () => {
  fileInputRef.value?.click()
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  const uploaded_files = e.dataTransfer?.files
  if (uploaded_files && uploaded_files.length > 0) {
    handleFileSelect(Array.from(uploaded_files))
  }
}

const handleFileSelect = (uploaded_files: File[]) => {
  if (uploaded_files && uploaded_files.length > 0) {
    const newFiles = Array.from(uploaded_files)
    newFiles.forEach((file) => {
      const key = buildFileKey(file)
      if (file.type.startsWith('image/') && !previewUrls.has(key)) {
        previewUrls.set(key, URL.createObjectURL(file))
      }
    })
    files.value.push(...newFiles)
    progress.value.push(...newFiles.map(() => 0))
    emit('file-select', files.value)
  }
}

const handleFileInputChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    handleFileSelect(Array.from(target.files))
  }
}

const showPreview = computed(() => {
  return props.preview && files.value.length > 0
})

const handleFileDelete = (index: number) => {
  const file = files.value[index]
  if (file) {
    const key = buildFileKey(file)
    const url = previewUrls.get(key)
    if (url) {
      URL.revokeObjectURL(url)
      previewUrls.delete(key)
    }
  }
  files.value.splice(index, 1)
  progress.value.splice(index, 1)
  emit('file-select', files.value)
}

const buildFileKey = (file: File) => `${file.name}-${file.size}-${file.lastModified}`

const getPreviewUrl = (file: File) => previewUrls.get(buildFileKey(file)) || null

onUnmounted(() => {
  previewUrls.forEach((url) => URL.revokeObjectURL(url))
  previewUrls.clear()
})
</script>

<template>
  <div
    class="border-2 border-dashed border-border rounded-md p-8 flex flex-col items-center justify-center text-center cursor-pointer"
    @click="handleBoxClick"
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <div
      v-if="!showPreview"
      class="flex flex-col items-center justify-center text-center cursor-pointer"
    >
      <div class="mb-2 bg-muted rounded-full p-3">
        <Upload class="h-5 w-5 text-muted-foreground" />
      </div>
      <p class="text-sm font-medium text-foreground">
        {{ label }}
      </p>
      <p class="text-sm text-muted-foreground mt-1">
        ou,
        <label
          for="fileUpload"
          class="text-primary hover:text-primary/90 font-medium cursor-pointer"
          @click.stop
        >
          clique para selecionar
        </label>
        ({{ maxSize }} max)
      </p>
    </div>

    <div v-else class="w-full flex justify-center">
      <FilePreview
        v-for="(file, index) in files"
        :key="file.name + file.size + file.lastModified"
        :file="file"
        :preview-url="getPreviewUrl(file)"
        :progress="progress[index]"
        @cancel="handleFileDelete(index)"
      />
    </div>

    <input
      id="fileUpload"
      ref="fileInputRef"
      type="file"
      class="hidden"
      :accept="accept"
      @change="handleFileInputChange"
    />
  </div>
</template>
