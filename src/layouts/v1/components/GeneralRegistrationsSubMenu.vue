<script setup>
import { RouterLink } from 'vue-router'
import { ChevronDown, Settings, Plane, TowerControl, Users } from 'lucide-vue-next'
</script>
<template>
  <button
    type="button"
    class="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
    aria-controls="dropdown-pages"
    data-collapse-toggle="dropdown-pages"
  >
    <Settings class="h-6 w-6" />
    <span class="mx-2 text-left whitespace-nowrap">Cadastros Gerais</span>
    <ChevronDown class="h-6 w-6" />
  </button>
  <div id="dropdown-pages" class="hidden">
    <ul class="py-2 space-y-2">
      <li class="flex items-center space-x-2">
        <router-link
          :to="{ name: 'AircraftsList' }"
          class="ml-4 p-2 flex items-center w-full text-md text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >
          <plane class="w-6 h-6 mr-2" />
          Aeronaves
        </router-link>
      </li>
      <li class="flex items-center space-x-2">
        <router-link
          :to="{ name: 'AirportsList' }"
          class="ml-4 p-2 flex items-center w-full text-md text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >
          <tower-control class="w-6 h-6 mr-2" />
          Aeroportos
        </router-link>
      </li>
      <li class="flex items-center space-x-2">
        <router-link
          :to="{ name: 'individualPersonsList' }"
          class="ml-4 p-2 flex items-center w-full text-md text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >
          <users class="w-6 h-6 mr-2" />
          Pessoa Fisica
        </router-link>
      </li>
    </ul>
  </div>
</template>
