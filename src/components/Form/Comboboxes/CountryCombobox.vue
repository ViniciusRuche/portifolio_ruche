<script setup>
import { onBeforeMount, watch } from 'vue'
import { BasePaginatedCombobox, usePaginatedCombobox } from '.'
import { useCountryStore } from '@/stores/countries'
import { useField } from 'vee-validate'
const props = defineProps({
  placeholder: {
    type: String,
    default: 'Selecione um país...'
  },
  name: {
    type: String,
    required: true
  },
  emptyMessage: {
    type: String,
    default: 'Nenhum país encontrada.'
  },
  label: {
    type: String,
    default: 'Buscar País'
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
  country: {
    type: String,
    default: ''
  }
})

const countryStore = useCountryStore()

const emit = defineEmits(['select', 'search'])

const { selectedValue, onSearch, onSelect } = usePaginatedCombobox(
  countryStore.search,
  {},
  {
    onSearch: () => {},
    onSelect: async (item) => {
      setValue(item.value)
      const country = await countryStore.getCountry(item.value)
      emit('select', country)
    }
  }
)

const { value, setValue } = useField(() => props.name, {})

onBeforeMount(async () => {
  // Any setup logic can go here if needed
  await search('')
})

watch(value, async (newValue, oldValue) => {
  if ((oldValue == undefined || oldValue == null) && newValue !== oldValue) {
    try {
      const country = await countryStore.getCountry(value.value)
      selectedValue.value = {
        label: country.name,
        value: country.id
      }
    } catch (error) {
      console.error('Error fetching country:', error)
    }
  }
})

const search = async (query) => {
  await countryStore.search({
    search: query
  })
}
</script>

<template>
  <BasePaginatedCombobox
    v-bind="props"
    :data="country.countryOptions"
    v-model="selectedValue"
    @search="onSearch"
    @update:model-value="onSelect"
  />
</template>
