<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

const emits = defineEmits(['confirm', 'cancel'])

const model = defineModel({
  type: Boolean,
  default: false
})
</script>

<template>
  <AlertDialog v-model:open="model">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          <slot name="title">Você tem certeza?</slot>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <slot></slot>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <slot name="footer">
          <AlertDialogCancel @click="emits('cancel')">Cancelar</AlertDialogCancel>
          <AlertDialogAction variant="destructive" @click="emits('confirm')"
            >Continuar</AlertDialogAction
          >
        </slot>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
