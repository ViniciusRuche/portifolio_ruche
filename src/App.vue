<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'

import 'vue-sonner/style.css' // vue-sonner v2 requires this import
</script>

<template>
  <Toaster position="top-right" />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
