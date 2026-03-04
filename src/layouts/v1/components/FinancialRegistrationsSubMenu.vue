<script setup>
import { RouterLink } from 'vue-router'
import { ChevronDown, Icon, Landmark } from 'lucide-vue-next'
import { dollarSignCircle } from '@lucide/lab'
</script>

<template>
  <button
    type="button"
    class="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
    aria-controls="financial-registrations-sub-menu"
    data-collapse-toggle="financial-registrations-sub-menu"
  >
    <Icon :iconNode="dollarSignCircle" />
    <span class="mx-2 text-left whitespace-nowrap">Financeiro</span>
    <ChevronDown class="h-6 w-6" />
  </button>
  <div id="financial-registrations-sub-menu" class="hidden">
    <ul class="py-2 space-y-2">
      <li>
        <router-link
          :to="{ name: 'FinancialDocumentList' }"
          class="ml-4 p-2 flex items-center w-full text-md text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >
          <landmark class="w-6 h-6 mr-2" />
          Documentos Financeiros
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'CostCentersList' }"
          class="ml-4 p-2 flex items-center w-full text-md text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >
          <landmark class="w-6 h-6 mr-2" />
          Centro de Custos
        </router-link>
      </li>
      <li class="flex items-center space-x-2">
        <router-link
          :to="{ name: 'BankAccountsList' }"
          class="ml-4 p-2 flex items-center w-full text-md text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >
          <landmark class="w-6 h-6 mr-2" />
          Contas Bancárias
        </router-link>
      </li>
    </ul>
  </div>
</template>
