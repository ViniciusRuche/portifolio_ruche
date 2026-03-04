<script setup>
import { ref, onBeforeMount, watch } from 'vue'
import { useField } from 'vee-validate'
import { useBankAccountStore } from '@/stores/bankAccount'
import { BaseCombobox } from '@/components/Form/Comboboxes'

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
    default: 'Buscar Conta Bancária'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const selectedValue = ref({ label: '', value: '' })
const loading = ref(false)
const emit = defineEmits(['select'])
const bankAccountStore = useBankAccountStore()
const { value, setValue } = useField(() => props.name, {})

onBeforeMount(async () => {
  loading.value = true
  await bankAccountStore.getBankAccounts()
  if (value.value) {
    selectedValue.value = bankAccountStore.getBankAccountOption(value.value)
  }
  loading.value = false
})

const onSelect = async (item) => {
  setValue(item.value)
  selectedValue.value = item
  emit('select', item)
}

watch(value, (newValue) => {
  if (newValue) {
    selectedValue.value = bankAccountStore.getBankAccountOption(newValue)
  }
})
</script>

<template>
  <BaseCombobox
    :placeholder="props.placeholder"
    :name="props.name"
    :empty-message="props.emptyMessage"
    :label="props.label"
    :disabled="props.disabled"
    :loading="loading"
    :data="bankAccountStore.bankAccountOptions"
    v-model="selectedValue"
    @update:modelValue="onSelect"
  />
</template>
