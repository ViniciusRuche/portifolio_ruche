<template>
  <FormItem>
    <FormLabel v-if="props.label">{{ computedLabel }}</FormLabel>
    <FormControl>
      <Input
        :name="props.name"
        :placeholder="computedPlaceholder"
        v-maska="maskOptions"
        v-model="maskedValue"
        :disabled="props.disabled"
        @input="onInput"
        @change="onChange"
        @blur="onBlur"
        type="text"
      />
    </FormControl>
    <FormDescription v-if="props.description"> {{ props.description }}</FormDescription>
    <FormMessage />
  </FormItem>
</template>
<script setup>
import { Mask } from 'maska'
import { useField } from 'vee-validate'
import { ref, watch, onBeforeMount, computed } from 'vue'
import { vMaska } from 'maska/vue'
import { Input } from '@/components/ui/input'
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from '@/components/ui/form'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  mask: {
    type: [String, Array],
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const maskedValue = ref('')
const { value, handleBlur, handleChange } = useField(() => props.name, undefined, {
  validateOnValueUpdate: true,
  syncVModel: true
})

const computedLabel = computed(() =>
  props.required && props.label ? `${props.label} *` : props.label
)

const computedPlaceholder = computed(() =>
  props.placeholder
)

const onInput = (event) => {
  maskedValue.value = maska.masked(event.target.value)
  const unmaskedValue = maska.unmasked(event.target.value || '')
  handleChange(unmaskedValue)
}

const onChange = (event) => {
  maskedValue.value = maska.masked(event.target.value)
  const unmaskedValue = maska.unmasked(event.target.value || '')
  handleChange(unmaskedValue)
}

const onBlur = (event) => {
  handleBlur(event)
}

const maskOptions = {
  mask: props.mask
}

const maska = new Mask(maskOptions)

onBeforeMount(() => {
  maskedValue.value = maska.masked(value.value || '')
})

watch(value, (newValue) => {
  if (maskedValue.value === maska.masked(newValue)) return
  maskedValue.value = newValue
})
</script>
