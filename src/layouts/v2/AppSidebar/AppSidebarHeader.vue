<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAppStore } from '@/stores/app'
import { X } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import logo from '@/assets/logo.png'
const appStore = useAppStore()
const { toggleSidebar } = useSidebar()
</script>

<template>
  <div class="flex justify-between border-b py-2">
    <div class="flex flex-row gap-4 items-center">
      <Avatar class="w-10 h-10">
        <AvatarImage :src="logo" :alt="appStore.appName" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h1 class="text-lg font-medium">
        {{ appStore.appName }}
      </h1>
    </div>
    <Button class="block md:hidden" variant="ghost" @click="toggleSidebar">
      <X class="h-4 w-4" />
    </Button>
  </div>
</template>
