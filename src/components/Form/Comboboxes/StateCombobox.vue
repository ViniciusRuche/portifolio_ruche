<script setup>
import { onBeforeMount, watch } from 'vue'
import { BasePaginatedCombobox, usePaginatedCombobox } from '.'
import { useStateStore } from '@/stores/states'
import { useField } from 'vee-validate'
const props = defineProps({
  placeholder: {
    type: String,
    default: 'Selecione um estado...'
  },
  name: {
    type: String,
    required: true
  },
  emptyMessage: {
    type: String,
    default: 'Nenhum estado encontrada.'
  },
  label: {
    type: String,
    default: 'Buscar Estado'
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

const stateStore = useStateStore()

const emit = defineEmits(['select', 'search'])

const { selectedValue, onSearch, onSelect } = usePaginatedCombobox(
  stateStore.search,
  {
    country: props.country
  },
  {
    onSearch: () => {},
    onSelect: async (item) => {
      setValue(item.value)
      const state = await stateStore.getState(item.value)
      emit('select', state)
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
      const city = await stateStore.getState(value.value)
      selectedValue.value = {
        label: city.name,
        value: city.id
      }
    } catch (error) {
      console.error('Error fetching city:', error)
    }
  }
})

const search = async (query) => {
  await stateStore.search({
    search: query,
    country: props.country
  })
}
</script>

<template>
  <BasePaginatedCombobox
    v-bind="props"
    :data="stateStore.stateOptions"
    v-model="selectedValue"
    @search="onSearch"
    @update:model-value="onSelect"
  />
</template>
