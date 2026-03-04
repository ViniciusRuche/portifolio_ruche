<script setup>
import { omit } from '@unovis/ts'
import { VisCrosshair, VisTooltip } from '@unovis/vue'
import { createApp } from 'vue'
import { ChartTooltip } from '.'

const props = defineProps({
  colors: { type: Array, required: true, default: () => [] },
  index: { type: String, required: true },
  items: { type: Array, required: true },
  customTooltip: { type: null, required: false }
})

const wm = new WeakMap()
function template(d) {
  if (wm.has(d)) {
    return wm.get(d)
  } else {
    const componentDiv = document.createElement('div')
    const omittedData = Object.entries(omit(d, [props.index])).map(([key, value]) => {
      const legendReference = props.items.find((i) => i.name === key)
      return legendReference ? { ...legendReference, value } : { name: key, value }
    })
    const TooltipComponent = props.customTooltip ?? ChartTooltip
    if (
      props !== null &&
      props !== undefined &&
      props.index !== null &&
      props.index !== undefined &&
      d[props.index] !== null &&
      d[props.index] !== undefined
    ) {
      createApp(TooltipComponent, {
        title: d[props.index],
        data: omittedData
      }).mount(componentDiv)
    }

    wm.set(d, componentDiv.innerHTML)
    return componentDiv.innerHTML
  }
}

function color(d, i) {
  return props.colors[i] ?? 'transparent'
}
</script>

<template>
  <VisTooltip :horizontal-shift="20" :vertical-shift="20" />
  <VisCrosshair :template="template" :color="color" />
</template>
