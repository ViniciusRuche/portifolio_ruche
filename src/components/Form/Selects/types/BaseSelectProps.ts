import { type Ref } from 'vue'

export interface SelectItem {
  value: string | number
  label: string
}

export default interface BaseSelectProps {
  name: string
  description?: string
  label?: string
  placeholder?: string
  modelValue?: Ref<unknown>
  data?: SelectItem[]
  required?: boolean
  disabled?: boolean
}
