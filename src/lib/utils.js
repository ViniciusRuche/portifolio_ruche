import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function valueUpdater(updaterOrValue, ref) {
  ref.value = typeof updaterOrValue === 'function' ? updaterOrValue(ref.value) : updaterOrValue
}

export function setOrder(field, desc) {
  if (desc) {
    return `-${field}`
  } else {
    return field
  }
}
