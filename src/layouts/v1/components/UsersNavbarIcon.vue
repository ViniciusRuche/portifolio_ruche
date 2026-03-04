<script setup>
import { CircleUserRound } from 'lucide-vue-next'
import { useRouter, RouterLink } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()
const router = useRouter()

function handleLogout() {
  sessionStore.logout()
  router.push({ name: 'Login' })
}
</script>

<template>
  <div>
    <button
      type="button"
      class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-600"
      id="user-menu-button"
      aria-expanded="false"
      data-dropdown-toggle="user-menu"
    >
      <span class="sr-only">Open user menu</span>
      <CircleUserRound
        class="w-6 h-6 md:w-10 md:h-10 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
      />
    </button>
    <div
      class="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
      id="user-menu"
    >
      <div class="py-3 px-4">
        <span class="block text-sm font-semibold text-gray-900 dark:text-white">
          {{ sessionStore.fullName }}
        </span>
        <span class="block text-sm text-gray-500 truncate dark:text-gray-400">
          {{ sessionStore.email }}</span
        >
      </div>
      <ul class="py-1 text-gray-500 dark:text-gray-400" aria-labelledby="user-menu">
        <li>
          <router-link
            class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
            :to="{ name: 'UserProfile' }"
          >
            Meu Perfil
          </router-link>
        </li>
      </ul>
      <ul class="py-1 text-gray-500 dark:text-gray-400" aria-labelledby="user-menu">
        <li>
          <button
            type="button"
            class="block py-2 px-4 w-full text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            @click="handleLogout"
          >
            Sair
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
