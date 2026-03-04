<script setup lang="ts">
import { ref, onBeforeMount, watch, computed } from 'vue'
import { useField } from 'vee-validate'
import api from '@/api/costCenter'
import Combobox, {
  type ComboboxOption
} from '@/components/Form/Comboboxes/Virtualized/Combobox.vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Selecione um item...'
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
    default: 'Centro de Custo'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: ''
  }
})

const selectedValue = ref<number | undefined>(undefined)
const selectedLabelValue = ref<string | undefined>(undefined)

const loading = ref(false)
const emit = defineEmits(['select'])
const { value, setValue } = useField<number | undefined>(() => props.name, {})

const currentPage = ref(1)
const pageCount = ref(1)
const data = ref<any[]>([])

const getOptions = async (page = 1, query = '') => {
  try {
    const resp = await api.datatable({
      search: query || '',
      page
    })
    return resp
  } catch (error) {
    console.error('Error fetching options:', error)
    data.value = []
  } finally {
    loading.value = false
  }
}

const loadPage = () => {
  getOptions(currentPage.value)
    .then((resp) => {
      if (currentPage.value === 1) {
        data.value = resp.results
      } else {
        data.value = [...data.value, ...resp.results]
      }
      pageCount.value = resp.page_count
      loading.value = false
    })
    .catch((e) => {
      loading.value = false
      console.error('Error loading page:', e)
    })
}

const hasMore = computed(() => {
  return currentPage.value < pageCount.value
})

const optionsForSelect = computed(() => {
  return data.value.map((item) => ({
    value: item.id,
    label: item.name
  }))
})

const fetchSelectedLabel = async (costCenterId: number) => {
  try {
    const costCenter = await api.get(costCenterId)
    selectedLabelValue.value = costCenter.name
  } catch (error) {
    console.error('Error fetching selected cost center:', error)
  }
}

onBeforeMount(async () => {
  loading.value = true
  await loadPage()
  if (value.value) {
    selectedValue.value = value.value
    await fetchSelectedLabel(value.value)
  }
  loading.value = false
})

const handleSearch = async (query: string) => {
  currentPage.value = 1
  loading.value = true
  const resp = await getOptions(1, query)
  data.value = resp.results
  pageCount.value = resp.page_count
}

const handleLoadMore = async () => {
  currentPage.value += 1
  loading.value = true
  await loadPage()
}

watch(value, async (newValue) => {
  if (newValue !== selectedValue.value) {
    selectedValue.value = newValue as number
    if (newValue) {
      await fetchSelectedLabel(newValue)
    } else {
      selectedLabelValue.value = undefined
    }
  }
})

const handleSelect = (option: ComboboxOption | undefined) => {
  if (option) {
    setValue(option.value)
    emit(
      'select',
      data.value.find((item) => item.id === option.value)
    )
  } else {
    setValue(undefined)
    emit('select', undefined)
  }
}

const selectedLabel = computed(() => {
  if (selectedLabelValue.value) return selectedLabelValue.value
  if (!selectedValue.value) return undefined
  const option = optionsForSelect.value.find((opt) => opt.value === selectedValue.value)
  return option?.label
})
</script>

<template>
  <Combobox
    :name="props.name"
    :disabled="props.disabled"
    :label="props.label"
    :placeholder="props.placeholder"
    :initial-label="selectedLabel"
    :data="optionsForSelect"
    :empty-message="props.emptyMessage"
    :description="props.description"
    @search="handleSearch"
    @load-more="handleLoadMore"
    @select="handleSelect"
    v-model="selectedValue"
    :has-more="hasMore"
    :loading="loading"
  />
</template>
