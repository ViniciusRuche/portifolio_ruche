<script setup lang="ts">
import { CalendarDate, DateFormatter, parseDate, type DateValue } from '@internationalized/date'
import { useField } from 'vee-validate'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { toDate } from 'reka-ui/date'
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import MonthYearSelectCalendar from '@/components/Form/Calendar/MonthYearSelectCalendar.vue'
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface DatePickerProps {
  name: string
  minValue?: DateValue
  maxValue?: DateValue
  label?: string
  placeholder?: string
  description?: string
  required?: boolean
  disabled?: boolean
}
const props = withDefaults(defineProps<DatePickerProps>(), {
  minValue: () => new CalendarDate(1900, 1, 1),
  maxValue: () => new CalendarDate(2100, 1, 1),
  placeholder: 'Selecione uma data',
  required: false,
  disabled: false
})

const df = new DateFormatter('pt-BR', {
  dateStyle: 'long'
})

const { value: fieldValue, setValue } = useField<string | null>(() => props.name)
const placeholder = ref()
const isPopoverOpen = ref(false)

const computedLabel = computed(() =>
  props.required && props.label ? `${props.label} *` : props.label
)

const value = computed({
  get: () => {
    return fieldValue.value ? parseDate(fieldValue.value.toString().slice(0, 10)) : undefined
  },
  set: (val) => val
})
</script>
<template>
  <FormItem class="flex flex-col">
    <FormLabel v-if="props.label">{{ computedLabel }}</FormLabel>
    <Popover v-model:open="isPopoverOpen">
      <PopoverTrigger as-child>
        <FormControl>
          <Button
            variant="outline"
            :disabled="props.disabled"
            :class="
              cn('ps-3 text-start font-normal', !value && 'text-muted-foreground')
            "
          >
            <span>{{ value ? df.format(toDate(value)) : props.placeholder }}</span>
            <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
          </Button>
          <input hidden />
        </FormControl>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0">
        <MonthYearSelectCalendar
          v-model:placeholder="placeholder"
          :model-value="value"
          :calendar-label="props.label"
          initial-focus
          :min-value="props.minValue"
          :max-value="props.maxValue"
          @update:model-value="
            (selectedDate: DateValue | undefined) => {
              if (selectedDate) {
                setValue(selectedDate.toString())
              } else {
                setValue(null)
              }
              isPopoverOpen = false
            }
          "
        />
      </PopoverContent>
    </Popover>
    <FormDescription v-if="props.description"> {{ props.description }} </FormDescription>
    <FormMessage />
  </FormItem>
</template>
