<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { RouterLink } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="flex flex-row gap-2 items-center">
      <Button variant="ghost" class="relative h-8 w-8 rounded-full">
        <Avatar class="h-8 w-8">
          <AvatarImage src="/avatars/01.png" alt="@shadcn" />
          <AvatarFallback>{{ sessionStore.fallback }}</AvatarFallback>
        </Avatar>
      </Button>
      <div class="hidden md:flex md:flex-col">
        <span class="text-sm">{{ sessionStore.fullName }}</span>
        <span class="text-sm text-muted-foreground">{{ sessionStore.email }}</span>
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>
        <RouterLink :to="{ name: 'UserProfile' }"> Meu Perfil </RouterLink>
      </DropdownMenuItem>
      <DropdownMenuItem @click="sessionStore.logout()">
        Sair
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
