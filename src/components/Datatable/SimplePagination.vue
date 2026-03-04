<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-vue-next'

const props = defineProps<{
  page?: number
  total: number
  itemsPerPage: number
}>()

const emit = defineEmits<{
  (event: 'update:page', value: number): void
}>()
</script>

<template>
  <Pagination
    v-slot="{ page: currentPage }"
    :page="props.page"
    :total="props.total"
    :items-per-page="props.itemsPerPage"
    @update:page="emit('update:page', $event)"
  >
    <PaginationContent v-slot="{ items }">
      <PaginationPrevious>
        <ChevronLeftIcon />
        <span class="hidden sm:block">Anterior</span>
      </PaginationPrevious>

      <template v-for="(item, index) in items" :key="index">
        <PaginationItem
          v-if="item.type === 'page'"
          :value="item.value"
          :is-active="item.value === currentPage"
        >
          {{ item.value }}
        </PaginationItem>

        <PaginationEllipsis v-else :index="4" />
      </template>

      <PaginationNext>
        <span class="hidden sm:block">Próxima</span>
        <ChevronRightIcon />
      </PaginationNext>
    </PaginationContent>
  </Pagination>
</template>
