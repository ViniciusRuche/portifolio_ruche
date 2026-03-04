<script setup lang="ts">
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { CirclePlus } from 'lucide-vue-next'
import { Separator } from '@/components/ui/separator'
import { type Ref, ref } from 'vue'
const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
})

const emit = defineEmits(['update:modelValue'])
interface DatatableFacetedFilter {
  title?: string
  name: string
  options?: FilterValue[]
}

const { name, title, options } = defineProps<DatatableFacetedFilter>()
const value = ref({
  start: null,
  end: null
}) as Ref<DateRange>

const open = ref(false)
const handleClear = () => {
  open.value = false
  value.value = { start: null, end: null }
  emit('update:modelValue', {
    [`${name}__gte`]: undefined,
    [`${name}__lte`]: undefined
  })
}

const formatFilter = (value: DateRange) => {
  const options = {}
  options[`${name}__gte`] = value.start
    ? value.start.toDate(getLocalTimeZone()).toISOString().slice(0, 10)
    : ''
  options[`${name}__lte`] = value.end
    ? value.end.toDate(getLocalTimeZone()).toISOString().slice(0, 10)
    : ''
  return options
}

const handleUpdate = (newValue) => {
  value.value = newValue
  if (newValue.start == null || newValue.end == null) return
  open.value = false
  emit('update:modelValue', formatFilter(value.value))
}
</script>
<template>
  <Popover :open="open" @update:open="open = $event">
    <PopoverTrigger as-child>
      <Button variant="outline" size="sm" class="h-8 border-dashed">
        <CirclePlus class="mr-2 h-4 w-4" />
        {{ title }}
        <template v-if="value.start">
          <Separator orientation="vertical" class="mx-2 h-4" />
          <template v-if="value.end">
            {{ df.format(value.start.toDate(getLocalTimeZone())) }} -
            {{ df.format(value.end.toDate(getLocalTimeZone())) }}
          </template>
          <template v-else>
            {{ df.format(value.start.toDate(getLocalTimeZone())) }}
          </template>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar
        v-model="value"
        initial-focus
        :number-of-months="2"
        @update:modelValue="handleUpdate"
      />
      <div class="flex justify-center pb-4">
        <Button variant="outline" @click="handleClear"> Limpar Filtros </Button>
      </div>
    </PopoverContent>
  </Popover>
</template>
