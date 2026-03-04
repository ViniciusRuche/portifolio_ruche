<script setup lang="ts">
import { getMenu } from '../config'
import { AppSidebarMenuItem } from '.'
import { SidebarMenu, SidebarGroup } from '@/components/ui/sidebar'
import { computed } from 'vue'

const menuItems = computed(() => {
  const items = getMenu()
  return items.filter((item) => item.active)
})
</script>

<template>
  <SidebarGroup>
    <SidebarMenu>
      <AppSidebarMenuItem v-for="item in menuItems" :key="item.title" :item="item" />
    </SidebarMenu>
  </SidebarGroup>
</template>
