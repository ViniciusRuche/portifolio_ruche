<script setup lang="ts">
import {
  SidebarFooter,
  Sidebar,
  SidebarHeader,
  SidebarRail,
  SidebarContent
} from '@/components/ui/sidebar'
import { AppSidebarHeader, AppSidebarContent, AppSidebarFooter } from '.'
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <AppSidebarHeader />
    </SidebarHeader>
    <SidebarContent>
      <AppSidebarContent />
    </SidebarContent>
    <SidebarFooter>
      <AppSidebarFooter />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
