<script setup lang="ts">
import { SidebarTrigger } from '@/components/ui/sidebar'
import { AppBreadcrumb } from '@/layouts/v2/AppBreadcrumb'
import { Separator } from '@/components/ui/separator'
import AppNotificationsPopover from '../AppNotificationsPopover/AppNotificationsPopover.vue'
import AppUserDropdown from './AppUserDropdown.vue'
</script>

<template>
  <header class="flex h-16 shrink-0 items-center gap-2 border-b">
    <div class="flex items-center w-full justify-between px-4">
      <div class="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" class="h-6" />
        <AppBreadcrumb />
      </div>

      <div class="avatar flex flex-row gap-4 items-center">
        <AppNotificationsPopover class="" />
        <Separator orientation="vertical" class="h-6" />
        <AppUserDropdown />
      </div>
    </div>
  </header>
</template>

<style scoped></style>
