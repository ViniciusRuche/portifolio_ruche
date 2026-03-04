<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-vue-next'
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="ghost" size="icon">
        <Bell class="h-4 w-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-80"> </PopoverContent>
  </Popover>
</template>
