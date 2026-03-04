<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
</script>

<template>
  <FormField v-slot="{ value, handleChange }" type="checkbox" name="mobile">
    <FormItem class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4">
      <FormControl>
        <Checkbox :model-value="value" @update:model-value="handleChange" />
      </FormControl>
      <div class="space-y-1 leading-none">
        <FormLabel>Use different settings for my mobile devices</FormLabel>
        <FormDescription>
          You can manage your mobile notifications in the
          <a href="/examples/forms">mobile settings</a> page.
        </FormDescription>
        <FormMessage />
      </div>
    </FormItem>
  </FormField>
</template>
