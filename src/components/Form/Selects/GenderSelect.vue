<script setup lang="ts">
import { Gender } from '@/features/persons/constants'
import type BaseSelectProps from './types/BaseSelectProps'
import BaseSelect from './BaseSelect.vue'

const props = withDefaults(defineProps<BaseSelectProps>(), {
  description: '',
  label: '',
  name: 'gender',
  placeholder: 'Selecione o gênero',
  data: () =>
    Object.values(Gender).map((type) => ({
      value: type,
      label: type
    })),
  required: false,
  disabled: false
})
</script>

<template>
  <BaseSelect v-bind="props" :data="data" placeholder="Selecione o gênero" />
</template>
