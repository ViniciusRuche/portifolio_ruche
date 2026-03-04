<script setup>
const props = defineProps({
  title: String
})
</script>

<template>
  <div class="w-11/12 mx-auto my-8">
    <h1 v-if="props.title" class="text-3xl font-semibold mb-4">
      {{ title }}
    </h1>
    <slot></slot>
  </div>
</template>
