<script setup lang="ts">
import { Ellipsis } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface DropdownActions {
  action: string;
  label: string;
}

const emit = defineEmits<{
  (e: string): void
}>()

const props = defineProps<{
  extraActions?: DropdownActions[]
}>()

function handleAction(action: string) {
  emit(action as any)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="ghost" size="icon" class="w-8 h-8 p-0 ml-auto">
        <Ellipsis class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">
      <DropdownMenuItem
        v-for="extra in props.extraActions"
        :key="extra.action"
        @click="handleAction(extra.action)"
      >
        {{ extra.label }}
      </DropdownMenuItem>

      <DropdownMenuSeparator/>

      <DropdownMenuItem @click="handleAction('back')">
        Voltar
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
