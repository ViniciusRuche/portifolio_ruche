<script setup lang="ts">
import { ref, onBeforeMount, watch, computed } from 'vue'
import { useField } from 'vee-validate'
import api from '@/api/persons'
import formatCpfCnpj from '@/lib/formatCpfCnpj'
import Combobox, {
  type ComboboxOption
} from '@/components/Form/Comboboxes/Virtualized/Combobox.vue'
import type Person from '@/features/persons/models/person'
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
    default: 'Buscar Cidade'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const selectedValue = ref<number | undefined>(undefined)
const selectedLabel = ref<string | undefined>(undefined)
const loading = ref(false)
const emit = defineEmits(['select'])
const { value, setValue } = useField<number | undefined>(() => props.name, {})

const currentPage = ref(1)
const pageCount = ref(1)
const data = ref<Array<Person>>([])

const getOptions = async (page = 1, query = '') => {
  try {
    const resp = await api.list({
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
    label: `${item.full_name} ${item.document ? `- ${formatCpfCnpj(item.document)}` : ''}`
  }))
})

onBeforeMount(async () => {
  loading.value = true
  await loadPage()
  if (value.value) {
    selectedValue.value = value.value as number
  }
})

const handleSearch = async (query: string) => {
  currentPage.value = 1
  const { page_count, results } = await getOptions(1, query)
  data.value = results
  pageCount.value = page_count
}

const handleLoadMore = async (query: string) => {
  currentPage.value += 1
  loading.value = true
  await loadPage()
}

watch(value, (newValue) => {
  if (newValue !== selectedValue.value) {
    api.get(newValue as number).then((person: Person) => {
      selectedValue.value = newValue
      selectedLabel.value = `${person.full_name} ${person.document ? `- ${formatCpfCnpj(person.document)}` : ''}`
    })
  }
})

const handleSelect = (option: ComboboxOption | undefined) => {
  if (option) {
    setValue(option.value)
    emit(
      'select',
      data.value.find((person) => person.id === option.value)
    )
  } else {
    setValue(undefined)
    emit('select', undefined)
  }
}
</script>

<template>
  <Combobox
    :name="props.name"
    :disabled="props.disabled"
    label="Pessoa"
    placeholder="Selecione a Pessoa"
    :initial-label="selectedLabel"
    :data="optionsForSelect"
    @search="handleSearch"
    @load-more="handleLoadMore"
    @select="handleSelect"
    v-model="selectedValue"
    :has-more="hasMore"
    :loading="loading"
  />
</template>
