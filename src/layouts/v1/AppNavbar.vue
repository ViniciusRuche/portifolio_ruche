<script setup>
import logo from '@/assets/logo.png'
import { Menu } from 'lucide-vue-next'
import UsersNavbarIcon from '@/layouts/v1/components/UsersNavbarIcon.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav
    class="max-h-16 h-16 min-h-16 bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50"
  >
    <div class="flex flex-wrap justify-between items-center">
      <div class="flex justify-start items-center">
        <button
          id="navbar-toggle"
          data-drawer-target="side-menu"
          data-drawer-toggle="side-menu"
          aria-controls="side-menu"
          class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <Menu class="w-6 h-6" />
          <span class="sr-only">Abrir Menu</span>
        </button>
        <RouterLink :to="{ name: 'Dashboard' }" class="flex items-center justify-between mr-4">
          <img :src="logo" class="mr-3 h-8" alt="Flowbite Logo" />
          <span
            class="self-center text-lg md:text-2xl font-semibold whitespace-nowrap dark:text-white"
            >Aeroclube Caxias</span
          >
        </RouterLink>
      </div>
      <div class="flex items-center lg:order-2">
        <users-navbar-icon> </users-navbar-icon>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
