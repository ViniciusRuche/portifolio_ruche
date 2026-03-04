<script setup lang="ts">
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { computed } from 'vue'
import type BaseSelectProps from './types/BaseSelectProps'

const props = withDefaults(defineProps<BaseSelectProps>(), {
  description: '',
  label: '',
  placeholder: 'Selecione ...',
  data: () => [],
  required: false,
  disabled: false
})

const computedLabel = computed(() =>
  props.required && props.label ? `${props.label} *` : props.label
)
</script>
<template>
  <div translate="no" class="notranslate">
    <FormField v-slot="{ componentField }" :name="props.name">
      <FormItem>
        <FormLabel translate="no" class="notranslate">
          <slot name="label"> {{ computedLabel }}</slot>
        </FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger :disabled="props.disabled">
              <SelectValue :placeholder="props.placeholder" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="item in props.data" :key="item.value" :value="item.value" translate="no" class="notranslate">
                {{ item.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormDescription>
          <slot name="description">
            {{ props.description }}
          </slot>
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
  </div>
</template>