<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Check } from 'lucide-vue-next'
import { CirclePlus } from 'lucide-vue-next'
import { Separator } from '@/components/ui/separator'
import { ref } from 'vue'
import { cn } from '@/lib/utils'

interface FilterValue {
  name: string
  value: string
}

interface DatatableFacetedFilter {
  title?: string
  name: string
  options?: FilterValue[]
}

const props = defineProps<DatatableFacetedFilter>()

const emit = defineEmits(['filter'])
const selectedValues = ref<Set<FilterValue>>(new Set())

const parseFilters = (filters) => {
  const options = {}
  options[`${props.name}__in`] = Array.from(filters).join(',')
  return options
}

const handleSelect = (option: FilterValue) => {
  if (selectedValues.value.has(option.value)) {
    selectedValues.value.delete(option.value)
  } else {
    selectedValues.value.add(option.value)
  }
  emit('filter', parseFilters(selectedValues.value))
}

const handleClear = () => {
  selectedValues.value.clear()
  emit('filter', {
    [`${props.name}__in`]: undefined
  })
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child v-bind="$attrs">
      <Button variant="outline" size="sm" class="h-8 border-dashed">
        <CirclePlus class="mr-2 h-4 w-4" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <Separator orientation="vertical" class="mx-2 h-4" />
          <Badge variant="secondary" class="rounded-sm px-1 font-normal lg:hidden">
            {{ selectedValues.size }}
          </Badge>
          <div class="hidden space-x-1 lg:flex">
            <Badge
              v-if="selectedValues.size > 2"
              variant="secondary"
              class="rounded-sm px-1 font-normal"
            >
              {{ selectedValues.size }} selected
            </Badge>

            <template v-else>
              <Badge
                v-for="option in options.filter((option) => selectedValues.has(option.value))"
                :key="option.value"
                variant="secondary"
                class="rounded-sm px-1 font-normal"
              >
                {{ option.label }}
              </Badge>
            </template>
          </div>
        </template>
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-[200px] p-0" align="start">
      <Command>
        <CommandInput :placeholder="title" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.value"
              :value="option"
              @select="handleSelect(option)"
            >
              <div
                :class="
                  cn(
                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                    selectedValues.has(option.value)
                      ? 'bg-primary text-primary-foreground'
                      : 'opacity-50 [&_svg]:invisible'
                  )
                "
              >
                <Check :class="cn('h-4 w-4')" />
              </div>
              <component
                :is="option.icon"
                v-if="option.icon"
                class="mr-2 h-4 w-4 text-muted-foreground"
              />
              <span>{{ option.label }}</span>
            </CommandItem>
          </CommandGroup>

          <template v-if="selectedValues.size > 0">
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                :value="{ label: 'Clear filters' }"
                class="justify-center text-center"
                @click="handleClear"
              >
                Limpar filtros
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
