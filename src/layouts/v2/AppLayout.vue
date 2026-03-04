<script setup lang="ts">
import { SidebarProvider } from '@/components/ui/sidebar'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { AppNavbar } from '@/layouts/v2/AppNavbar'
import type { SidebarProps } from '@/components/ui/sidebar'
import { AppSidebar } from '@/layouts/v2/AppSidebar'
import { useAppStore } from '@/stores/app'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon'
})

const appStore = useAppStore()
</script>

<template>
  <div>
    <SidebarProvider v-bind="props" v-model:open="appStore.sidebarExpanded">
      <AppSidebar />
      <main class="flex flex-col h-screen w-svw">
        <AppNavbar />

        <ScrollArea class="flex-grow">
          <div class="container">
            <router-view />
          </div>
          <ScrollBar class="z-50" />
        </ScrollArea>
      </main>
    </SidebarProvider>
  </div>
</template>
