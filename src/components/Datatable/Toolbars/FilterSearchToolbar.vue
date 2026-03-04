<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import type { Component } from 'vue'
import type { Task } from '../data/schema'
import { Input } from '@/components/ui/input'
import { DatatableFacetedFilter } from '@/components/Datatable'
import DatatableDateRangeFilter from '@/components/Datatable/DatatableDateRangeFilter.vue'
import { reactive } from 'vue'

const emits = defineEmits<{
  (event: 'filter', payload: Record<string, any>): void
  (event: 'search', payload: string): void
}>()

const onSearch = (event) => {
  emits('search', event.target.value)
}

const filters = reactive({})

export interface BaseDatatableToolbarProps {
  filterOptions?: {
    column?: Column<Task, any>
    title: string
    type: 'choices' | 'date-range'
    name: string
    options: { label: string; value: string; icon: Component }[]
  }[],
  searchPlaceholder?: string
}

const handleFilter = (filter) => {
  for (const key in filter) {
    const value = filter[key]
    if (value === undefined) {
      delete filters[key]
    } else {
      filters[key] = value
    }
  }
  emits('filter', filters)
}
const props = withDefaults(defineProps<BaseDatatableToolbarProps>(), {
  searchPlaceholder: 'Pesquisar...'
})
</script>

<template>
  <div
    class="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 space-y-4 sm:space-y-0"
  >
    <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
      <Input class="w-full md:max-w-xl" :placeholder="props.searchPlaceholder" @input="onSearch" />
      <div
        class="flex flex-col sm:flex-row justify-normal w-full sm:w-auto space-y-4 sm:space-y-0 space-x-0 sm:space-x-4"
      >
        <div v-for="option in props.filterOptions" :key="option.name" class="w-full">
          <DatatableFacetedFilter
            v-if="option.type === 'choices'"
            :title="option.title"
            :name="option.name"
            @filter="handleFilter"
            :options="option.options"
          />
          <DatatableDateRangeFilter
            v-else-if="option.type === 'date-range'"
            :title="option.title"
            :name="option.name"
            @update:modelValue="handleFilter"
          />
        </div>
      </div>
    </div>
  </div>
</template>
