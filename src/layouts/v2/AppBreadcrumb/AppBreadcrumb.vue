<script lang="ts" setup>
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { useRoute, RouterLink, type RouteLocationRaw } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

interface BreadcrumbPath {
  title: string
  route: RouteLocationRaw
}

const breadcrumbs = computed(() => {
  return route.matched
    .filter((r) => r.meta.breadcrumb)
    .map((r) => {
      const label =
        typeof r.meta.breadcrumb === 'function' ? r.meta.breadcrumb(route) : r.meta.breadcrumb
      return {
        title: label,
        route: r.name ? { name: r.name, params: route.params } : { path: r.path }
      }
    })
})
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <template v-for="(item, index) in breadcrumbs" :key="index">
        <BreadcrumbItem class="hidden md:block">
          <BreadcrumbLink asChild>
            <RouterLink :to="item.route">
              <span>{{ item.title }}</span>
            </RouterLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator class="hidden md:block" v-if="index < breadcrumbs.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
