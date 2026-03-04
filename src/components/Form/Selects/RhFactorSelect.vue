<script setup lang="ts">
import { RhFactor } from '@/features/persons/constants'
import type BaseSelectProps from './types/BaseSelectProps'
import BaseSelect from './BaseSelect.vue'

const props = withDefaults(defineProps<BaseSelectProps>(), {
  description: '',
  label: '',
  name: 'blood_type',
  placeholder: 'Selecione o fator Rh',
  data: () =>
    Object.values(RhFactor).map((type) => ({
      value: type,
      label: type
    })),
  required: false,
  disabled: false
})
</script>

<template>
  <BaseSelect v-bind="props" :data="data" placeholder="Selecione o fator Rh" />
</template>
