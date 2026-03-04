<script setup>
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput
} from '@/components/ui/number-field'
import { useField } from 'vee-validate'
import { computed } from 'vue'
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    default: undefined
  },
  label: {
    type: String,
    required: false
  },
  precision: {
    type: Number,
    default: 2
  },
  disabled: {
    type: Boolean,
    default: false
  },
  currency: {
    type: Boolean,
    default: false
  },
  incrementDecrement: {
    type: Boolean,
    default: false
  },
  min: {
    type: Number,
    default: undefined
  },
  max: {
    type: Number,
    default: undefined
  },
  required: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: undefined
  }
})

const { value, setValue } = useField(() => props.name, {
  initialValue: props.value,
  validateOnValueUpdate: true
})

const step = computed(() => {
  return Math.pow(10, -props.precision)
})

const style = computed(() => {
  return props.currency ? 'currency' : 'decimal'
})

const computedLabel = computed(() =>
  props.required && props.label ? `${props.label} *` : props.label
)
</script>

<template>
  <FormItem>
    <FormLabel v-if="props.label">{{ computedLabel }}</FormLabel>
    <NumberField
      class="gap-2"
      :step="step"
      :disabled="props.disabled"
      :min="props.min"
      :max="props.max"
      locale="pt-BR"
      :format-options="{
        style: style,
        currency: 'BRL',
        currencyDisplay: 'symbol',
        currencySign: 'accounting',
        minimumFractionDigits: props.precision
      }"
      v-model="value"
      @update:model-value="
        (v) => {
          if (v) {
            setValue(v)
          } else {
            setValue(undefined)
          }
        }
      "
    >
      <NumberFieldContent>
        <NumberFieldDecrement v-if="props.incrementDecrement" />
        <FormControl>
          <NumberFieldInput />
        </FormControl>
        <NumberFieldIncrement v-if="props.incrementDecrement" />
      </NumberFieldContent>
    </NumberField>
    <FormDescription v-if="props.description">{{ props.description }}</FormDescription>
    <FormMessage />
  </FormItem>
</template>
