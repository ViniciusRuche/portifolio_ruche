<script setup lang="ts">
import { cn } from '@/lib/utils'
import { ListboxVirtualizer } from 'reka-ui'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Check, ChevronDown, ChevronsUpDown, Search } from 'lucide-vue-next'
import { ref, watch, type Ref, computed } from 'vue'
import { Input } from '@/components/ui/input'
import { useDebounceFn } from '@vueuse/core'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { FormLabel, FormItem, FormMessage, FormDescription } from '@/components/ui/form'

export type ComboboxOption = {
  label: string
  value: number
}

const props = withDefaults(
  defineProps<{
    id?: string
    name?: string
    label?: string
    placeholder: string
    description?: string
    initialLabel?: string
    hasMore?: boolean
    disabled?: boolean
    required?: boolean
    emptyMessage?: string
    loadMoreLabel?: string
    searchPlaceholder?: string
    loading?: boolean
    loadingLabel?: string
    data: ComboboxOption[]
  }>(),
  {
    emptyMessage: 'Nenhum item encontrado.',
    loadMoreLabel: 'Carregar mais',
    loadingLabel: 'Carregando',
    disabled: false,
    required: false,
    loading: false,
    hasMore: false
  }
)

const emits = defineEmits<{
  (e: 'update:modelValue', value: number | undefined): void
  (e: 'search', query: string): void
  (e: 'select', option: ComboboxOption | undefined): void
  (e: 'loadMore', query: string): void
}>()

const searchString: Ref<string | undefined> = ref(undefined)
const model = defineModel<number | undefined>()
const selectedLabel: Ref<string | undefined> = ref(props.initialLabel || undefined)
const searchInputRef = ref<any>(null)
const contentRef = ref<HTMLElement | null>(null)
const popoverWidth = ref<string>('auto')

const popoverOpen = ref(false)

watch(popoverOpen, (isOpen) => {
  if (isOpen) {
    if (contentRef.value) {
      popoverWidth.value = `${contentRef.value.offsetWidth}px`
    }
    setTimeout(() => {
      const inputElement = searchInputRef.value?.$el || searchInputRef.value
      const input = inputElement?.querySelector?.('input') || inputElement
      if (input && typeof input.focus === 'function') {
        input.focus()
      }
    }, 1)
  }
})

watch(
  () => props.initialLabel,
  (newLabel) => {
    selectedLabel.value = newLabel
  }
)
const handleSelect = (value: number | undefined) => {
  if (value === undefined) {
    model.value = undefined
    selectedLabel.value = undefined
    emits('select', undefined)
    return
  }
  const selectedOption = props.data.find((option) => option.value === value)
  if (selectedOption) {
    model.value = value
    selectedLabel.value = selectedOption.label
    emits('select', selectedOption)
  }
  popoverOpen.value = false
}

const loadMore = () => {
  emits('loadMore', searchString.value || '')
}

const handleSearch = useDebounceFn((event: Event) => {
  event.preventDefault()
  const target = event.target as HTMLInputElement
  searchString.value = target.value
  emits('search', target.value)
}, 400)

watch(model, (newVal) => {
  if (newVal === undefined || newVal === null) {
    selectedLabel.value = undefined
  }
})
</script>

<template>
  <div ref="contentRef" class="content">
    <FormItem class="flex flex-col" :id="props.id">
      <FormLabel v-if="props.label" :for="props.name" class="mb-1 mt-1"
        >{{ props.label }} {{ props.required ? '*' : '' }}</FormLabel
      >
      <Popover v-model:open="popoverOpen">
        <PopoverTrigger as-child>
          <Button
            type="button"
            variant="outline"
            :disabled="props.disabled"
            :class="cn('w-full justify-between', !model && 'text-muted-foreground')"
          >
            <div class="truncate">
              {{ selectedLabel || props.placeholder }}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent class="p-0" :style="{ width: popoverWidth }">
          <Command
            class="rounded-lg"
            :should-filter="false"
            v-model="model"
            @update:model-value="handleSelect"
          >
            <div class="flex items-center border-b px-3">
              <Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Input
                ref="searchInputRef"
                v-model="searchString"
                @input="handleSearch"
                :placeholder="searchPlaceholder ? searchPlaceholder : `Busque a ${props.label}...`"
                class="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <CommandList>
              <CommandGroup v-if="props.data.length === 0 && props.loading">
                <Button
                  variant="ghost"
                  type="button"
                  disabled
                  class="w-full flex flex-row justify-center p-2 items-center gap-2"
                >
                  {{ props.loadingLabel }}
                  <Spinner size="3" />
                </Button>
              </CommandGroup>
              <CommandEmpty v-if="props.data.length === 0 && !props.loading">
                {{ props.emptyMessage }}</CommandEmpty
              >
              <CommandGroup v-if="props.data.length > 0">
                <!-- <CommandItem> </CommandItem> -->
                <ListboxVirtualizer
                  v-slot="{ option }"
                  :options="props.data"
                  :text-content="(opt) => opt.label"
                >
                  <CommandItem
                    :value="option.value"
                    :class="'hover:bg-accent hover:text-accent-foreground w-full'"
                  >
                    <div class="truncate">
                      {{ option.label }}
                    </div>
                    <Check v-if="model && model == option.value" class="ml-auto h-4 w-4" />
                  </CommandItem>
                </ListboxVirtualizer>
                <Button
                  variant="ghost"
                  type="button"
                  @click="loadMore"
                  class="w-full flex flex-row justify-center"
                  size="sm"
                  v-if="hasMore && !props.loading"
                >
                  <div class="truncate">{{ props.loadMoreLabel }}</div>
                  <ChevronDown class="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  type="button"
                  disabled
                  v-else-if="props.loading"
                  class="w-full flex flex-row justify-center p-2 items-center gap-2"
                >
                  {{ props.loadingLabel }}
                  <Spinner size="3" />
                </Button>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FormDescription v-if="props.description"> {{ props.description }}</FormDescription>
      <FormMessage />
    </FormItem>
  </div>
</template>
