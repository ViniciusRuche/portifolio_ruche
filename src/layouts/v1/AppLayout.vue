<script setup>
import AppNavbar from '@/layouts/v1/AppNavbar.vue'
import AppSideMenu from '@/layouts/v1/AppSideMenu.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="antialiased bg-gray-50 dark:bg-gray-900 h-full">
    <app-navbar />
    <app-side-menu id="side-menu" />
    <main class="md:ml-64 h-fit pt-16">
      <router-view />
    </main>
  </div>
</template>
