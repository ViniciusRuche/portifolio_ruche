<script setup>
import { ref, onBeforeMount, watch } from 'vue'
import { useField } from 'vee-validate'
import { BaseCombobox } from '@/components/Form/Comboboxes'
import { useFinancialDocumentCategoriesStore } from '@/stores/financialDocumentCategories'

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
  },
  description: {
    type: String,
    default: ''
  }
})

const selectedValue = ref({ label: '', value: '' })
const loading = ref(false)
const emit = defineEmits(['select'])
const financialDocumentCategoriesStore = useFinancialDocumentCategoriesStore()
const { value, setValue } = useField(() => props.name, {})

onBeforeMount(async () => {
  loading.value = true
  await financialDocumentCategoriesStore.getFinancialDocumentCategories()
  if (value.value) {
    selectedValue.value = financialDocumentCategoriesStore.getFinancialDocumentCategoryOption(
      value.value
    )
  }
  loading.value = false
})

watch(value, (newValue) => {
  if (newValue) {
    selectedValue.value =
      financialDocumentCategoriesStore.getFinancialDocumentCategoryOption(newValue)
  }
})
const onSelect = async (item) => {
  // Emit the selected value or handle it as needed
  setValue(item.value)
  selectedValue.value = item
  emit('select', item)
}
</script>

<template>
  <BaseCombobox
    :placeholder="props.placeholder"
    :name="props.name"
    :empty-message="props.emptyMessage"
    :label="props.label"
    :disabled="props.disabled"
    :loading="loading"
    :data="financialDocumentCategoriesStore.financialDocumentCategoryOptions"
    :description="props.description"
    v-model="selectedValue"
    @update:modelValue="onSelect"
  />
</template>
