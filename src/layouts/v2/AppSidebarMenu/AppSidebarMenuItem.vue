<script setup lang="ts">
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible/'
import {
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ChevronRight } from 'lucide-vue-next'
import type { MenuItem } from '../config'
import { useSidebar } from '@/components/ui/sidebar'

defineOptions({
  name: 'AppSidebarMenuItem'
})

const props = defineProps<{
  item: MenuItem
}>()

const { toggleSidebar, isMobile } = useSidebar()

const handleRouterLinkClick = () => {
  if (isMobile.value) {
    toggleSidebar()
  }
}

const visibleChildren = computed(() => {
  return props.item.children?.filter((child) => child.active) || []
})
</script>

<template>
  <div>
    <Collapsible v-if="visibleChildren.length > 0">
      <CollapsibleTrigger as-child>
        <SidebarMenuButton :tooltip="item.title">
          <component :is="item.icon" v-if="item.icon" />
          <span>{{ item.title }}</span>
          <ChevronRight
            class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
          />
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          <SidebarMenuSubItem v-for="subItem in visibleChildren" :key="subItem.title">
            <AppSidebarMenuItem :item="subItem" />
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>

    <RouterLink v-else-if="props.item.route" :to="props.item.route" @click="handleRouterLinkClick">
      <SidebarMenuButton :tooltip="item.title">
        <component :is="item.icon" v-if="item.icon" />
        <span>{{ item.title }}</span>
      </SidebarMenuButton>
    </RouterLink>
  </div>
</template>