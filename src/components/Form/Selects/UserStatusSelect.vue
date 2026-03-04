<script setup lang="ts">
import { BaseSelect } from '@/components/Form/Selects'
import { usersStatusOptions } from '@/constants/users'
import { type BaseSelectProps } from './types'

const props = withDefaults(defineProps<BaseSelectProps>(), {
  placeholder: 'Selecione uma opção...'
})
</script>

<template>
  <BaseSelect v-bind="props" :data="usersStatusOptions" />
</template>
