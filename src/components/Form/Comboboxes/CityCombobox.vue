<script setup lang="ts">
import { BasePaginatedCombobox, usePaginatedCombobox } from '@/components/Form/Comboboxes/'
import { onBeforeMount, watch } from 'vue'
import { useCityStore } from '@/stores/cities'
import { useField } from 'vee-validate'
const props = defineProps({
  placeholder: {
    type: String,
    default: 'Selecione uma cidade...'
  },
  name: {
    type: String,
    required: true
  },
  emptyMessage: {
    type: String,
    default: 'Nenhuma cidade encontrada.'
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
  state: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  }
})

const cityStore = useCityStore()

const { selectedValue, onSearch, onSelect } = usePaginatedCombobox(
  cityStore.search,
  {
    state: props.state,
    country: props.country
  },
  {
    onSearch: () => {},
    onSelect: async (item) => {
      setValue(item.value)
      const city = await cityStore.getCity(item.value)
      emit('select', city)
    }
  }
)
const { value, setValue } = useField(() => props.name, {})

const emit = defineEmits(['select', 'search'])

onBeforeMount(async () => {
  // Any setup logic can go here if needed
  await searchCities('')
})

const searchCities = async (query) => {
  await cityStore.search({
    search: query,
    state: props.state,
    country: props.country
  })
}

watch(value, async (newValue, oldValue) => {
  if ((oldValue == undefined || oldValue == null) && newValue !== oldValue) {
    try {
      const city = await cityStore.getCity(value.value)
      selectedValue.value = {
        label: city.name,
        value: city.id
      }
    } catch (error) {
      console.error('Error fetching city:', error)
    }
  }
})
</script>

<template>
  <BasePaginatedCombobox
    v-bind="props"
    :data="cityStore.cityOptions"
    v-model="selectedValue"
    @search="onSearch"
    @update:model-value="onSelect"
  />
</template>
