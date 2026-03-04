<script setup>
import { cn } from '@/lib/utils'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxTrigger,
  ComboboxItemIndicator,
  ComboboxList
} from '@/components/ui/combobox'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-vue-next'

import { ChevronsUpDown, Check } from 'lucide-vue-next'
import {
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  FormDescription
} from '@/components/ui/form'
import { computed } from 'vue'
const props = defineProps({
  placeholder: {
    type: String,
    default: 'Selecione um item...'
  },
  data: {
    type: Array,
    default: () => []
  },
  name: {
    type: String,
    required: true
  },
  emptyMessage: {
    type: String,
    default: 'Nenhum item encontrado.'
  },
  label: {
    type: String,
    default: 'Buscar Cidade'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: ''
  }
})

const computedLabel = computed(() =>
  props.required && props.label ? `${props.label} *` : props.label
)

const model = defineModel({
  type: Object,
  default: { label: '', value: '' }
})
</script>

<template>
  <FormItem class="flex flex-col" :id="props.id">
    <FormLabel :for="props.name" class="mb-1 mt-1">{{ computedLabel }}</FormLabel>
    <Combobox by="label" v-if="!props.disabled" :multiple="false" v-model="model">
      <FormControl>
        <ComboboxAnchor class="w-full">
          <div class="relative w-full items-center">
            <ComboboxInput
              class="w-full"
              :id="props.name"
              :display-value="(val) => val?.label ?? ''"
              :placeholder="props.placeholder"
            />
            <ComboboxTrigger class="absolute end-0 inset-y-0 flex items-center justify-center px-3">
              <ChevronsUpDown class="size-4 text-muted-foreground" />
            </ComboboxTrigger>
          </div>
        </ComboboxAnchor>
      </FormControl>
      <ComboboxList>
        <ComboboxEmpty v-if="!props.loading"> {{ props.emptyMessage }} </ComboboxEmpty>
        <ComboboxEmpty v-else> Carregando... </ComboboxEmpty>
        <ComboboxGroup>
          <ComboboxItem v-for="item in props.data" :key="item.value" :value="item">
            {{ item.label }}
            <ComboboxItemIndicator>
              <Check :class="cn('ml-auto h-4 w-4')" />
            </ComboboxItemIndicator>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxList>
    </Combobox>
    <div class="relative w-full items-center" v-else>
      <Input :value="model.label" class="pl-9" :placeholder="props.placeholder" disabled />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
        <Search class="size-4 text-muted-foreground" />
      </span>
    </div>
    <FormDescription v-if="props.description"> {{ props.description }}</FormDescription>
    <FormMessage />
  </FormItem>
</template>
