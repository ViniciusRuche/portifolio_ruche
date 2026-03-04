<script setup lang="ts">
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef
} from '@tanstack/vue-table'
import { type ActionEvent } from './types/ActionEventPayload'
import { ref, toRefs } from 'vue'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { setOrder } from '@/lib/utils'
import { SimplePagination } from '@/components/Datatable/'

export type AnyRow = Record<string, any>

const props = defineProps<{
  columns: ColumnDef<AnyRow, any>[]
  data: AnyRow[]
  pageCount: number
  pageSize: number
  total: number
  page?: number
  extraTableOptions?: object
  filterOptions?: string[]
}>()

const sorting = ref([])

const emit = defineEmits<{
  (event: 'action', payload: ActionEvent): void
  (event: 'table-action', payload: ActionEvent): void
  (event: 'add'): void
  (event: 'filter', payload: Record<string, any>): void
  (event: 'search', payload: string): void
  (event: 'sorted', value: unknown): void
  (event: 'paginate', value: unknown): void
}>()

const forward = {
  add: () => emit('action', { type: 'add', payload: {} }),
  filter: (payload: Record<string, any>) => emit('filter', payload),
  search: (payload: string) => emit('search', payload),
  'table-action': (payload: ActionEvent) => emit('table-action', payload)
}

function valueUpdater(updaterOrValue, ref) {
  ref.value = typeof updaterOrValue === 'function' ? updaterOrValue(ref.value) : updaterOrValue
}

const { pageSize, total } = toRefs(props)

const handleAction = (payload) => {
  emit('action', payload)
}

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  manualPagination: true,
  pageCount: props.pageCount,
  manualSorting: true,
  manualFiltering: true,
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: handleSorting,
  state: {
    get sorting() {
      return sorting.value
    }
  },
  meta: {
    onAction: handleAction
  },
  ...props.extraTableOptions
})

function handleSorting(updaterOrValue) {
  valueUpdater(updaterOrValue, sorting)

  const ordering = []
  sorting.value.forEach((sort) => {
    ordering.push(setOrder(sort.id, sort.desc))
  })
  emit('sorted', ordering.join(','))
}

const handlePageChange = (page) => {
  emit('paginate', page)
}
</script>

<template>
  <div>
    <slot name="toolbar" v-bind="{ on: forward }" />
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>

    <SimplePagination
      :page="props.page"
      @update:page="handlePageChange"
      class="mt-4"
      :total="total"
      :items-per-page="pageSize"
    />
  </div>
</template>
