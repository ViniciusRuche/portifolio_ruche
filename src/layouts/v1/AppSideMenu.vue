<script setup>
import { Users, ChartPie } from 'lucide-vue-next'
import GeneralRegistrationsSubMenu from '@/layouts/v1/components/GeneralRegistrationsSubMenu.vue'
import FinancialRegistrationsSubMenu from '@/layouts/v1/components/FinancialRegistrationsSubMenu.vue'
import { RouterLink } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()
</script>

<template>
  <aside
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidenav"
  >
    <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
      <ul class="space-y-2">
        <li>
          <router-link
            :to="{ name: 'DashboardList' }"
            class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <chart-pie class="w-6 h-6 text-gray-800 dark:text-white" />
            <span class="ml-3">Dashboard</span>
          </router-link>
        </li>
        <li v-if="sessionStore.isAdmin">
          <router-link
            :to="{ name: 'UsersList' }"
            class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <users class="w-6 h-6 text-gray-800 dark:text-white" />
            <span class="ml-3">Usuários</span>
          </router-link>
        </li>
        <li v-if="sessionStore.isAdmin"><financial-registrations-sub-menu /></li>
        <li v-if="sessionStore.isAdmin"><general-registrations-sub-menu /></li>
      </ul>
    </div>
  </aside>
</template>
