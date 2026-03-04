<script setup lang="ts">
import { cn } from '@/lib/utils'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxTrigger,
  ComboboxItemIndicator,
  ComboboxList
} from '@/components/ui/combobox'
import { ComboboxViewport, ComboboxContent } from 'reka-ui'
import { ComboboxVirtualizer } from 'reka-ui'
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
import { computed, ref, useTemplateRef, onMounted, nextTick } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'

interface OptionItem {
  label: string
  value: string | number
}

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Selecione um item...'
  },
  getter: {
    type: Function as unknown as () => (query: string, page: number) => Promise<GetterReturn>,
    required: true
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
interface GetterReturn {
  results: Array<OptionItem>
  page_count: number
}

const computedLabel = computed(() =>
  props.required && props.label ? `${props.label} *` : props.label
)
const items = ref<Array<OptionItem>>([])
const emit = defineEmits(['update:modelValue'])
const query = ref('')
const currentPage = ref(0)
const viewportRef = useTemplateRef<HTMLElement>('viewportRef')
const maxPage = ref(999)

const handleSearch = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const newQuery = target.value

  // Prevent infinite loops by checking if query actually changed
  if (newQuery === query.value) return

  query.value = newQuery
  currentPage.value = 1

  try {
    const resp = await props.getter(query.value, currentPage.value)
    items.value = [...resp.results]
    maxPage.value = resp.page_count
  } catch (error) {
    console.error('Error during search:', error)
    items.value = []
  }
}

const isLoading = ref(false)
const getPage = async (query: string, page: number) => {
  if (isLoading.value || page > maxPage.value) {
    return
  }
  isLoading.value = true
  try {
    const resp = await props.getter(query, page)
    items.value = [...items.value, ...resp.results]
    maxPage.value = resp.page_count
  } catch (error) {
    console.error('Error fetching page:', error)
  } finally {
    isLoading.value = false
  }
}
const onSelect = async (event: any, item: OptionItem) => {
  // Emit the selected value or handle it as needed
  emit('update:modelValue', item)
}

const { reset } = useInfiniteScroll(
  viewportRef,
  async () => {
    await getPage(query.value, currentPage.value + 1)
    currentPage.value += 1
  },
  {
    distance: 10,
    canLoadMore: () => {
      return true
    }
  }
)
const model = defineModel({
  type: Object,
  default: { label: '', value: '' }
})

const measureElement = (virtualizer: any, el: any) => {
  if (!el) {
    return
  }
  virtualizer.measureElement(el)
  return undefined
}
</script>

<template>
  <FormItem class="flex flex-col" :id="props.id">
    <FormLabel :for="props.name" class="mb-1 mt-1">{{ computedLabel }}</FormLabel>
    <Combobox by="label" v-if="!props.disabled" :multiple="false" v-model="model">
      <FormControl>
        <ComboboxAnchor class="w-full">
          <div class="relative w-full">
            <ComboboxInput
              class="w-full"
              :id="props.name"
              :display-value="(val: any) => val?.label ?? ''"
              @input="handleSearch"
              :placeholder="props.placeholder"
            />
            <ComboboxTrigger class="absolute end-0 inset-y-0 flex items-center justify-center px-3">
              <ChevronsUpDown class="size-4 text-muted-foreground" />
            </ComboboxTrigger>
          </div>
        </ComboboxAnchor>
      </FormControl>
      <ComboboxList class="w-full">
        <ComboboxContent class="md:w-[1200px] w-[300px] max-h-[40vh] overflow-hidden">
          <ComboboxViewport ref="viewportRef" class="max-h-80 overflow-y-auto">
            <ComboboxEmpty v-if="!props.loading"> {{ props.emptyMessage }} </ComboboxEmpty>
            <ComboboxEmpty v-else> Carregando... </ComboboxEmpty>
            <ComboboxVirtualizer
              v-slot="{ option, virtualizer }"
              :estimate-size="24"
              :options="items"
              :text-content="(opt: OptionItem) => opt.label"
            >
              <div :ref="(node) => measureElement(virtualizer, node)" class="w-full">
                <ComboboxItem
                  class="w-full text-ellipsis"
                  :value="option"
                  @select="(e: any) => onSelect(e, option)"
                  @vue:mounted="(node) => virtualizer.measureElement(node.el as any)"
                >
                  {{ option.label }}
                  <ComboboxItemIndicator>
                    <Check :class="cn('ml-auto h-4 w-4')" />
                  </ComboboxItemIndicator>
                </ComboboxItem>
              </div>
            </ComboboxVirtualizer>
          </ComboboxViewport>
        </ComboboxContent>
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

<style></style>
