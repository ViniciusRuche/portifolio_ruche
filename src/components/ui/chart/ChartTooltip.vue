<script setup>
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

defineProps({
  title: { type: String, required: false },
  data: { type: Array, required: true },
});
</script>

<template>
  <Card class="text-sm">
    <CardHeader v-if="title" class="p-3 border-b">
      <CardTitle>
        <div class="flex justify-between items-baseline">
          <p>{{ title[0].toUpperCase() + title.slice(1) }}</p>
          <p>R$</p>
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent class="p-3 min-w-[180px] flex flex-col gap-1">
      <div v-for="(item, key) in data" :key="key" class="flex justify-between">
        <div class="flex items-center">
          <span class="w-2.5 h-2.5 mr-2">
            <svg width="100%" height="100%" viewBox="0 0 30 30">
              <path
                d=" M 15 15 m -14, 0 a 14,14 0 1,1 28,0 a 14,14 0 1,1 -28,0"
                :stroke="item.color"
                :fill="item.color"
                stroke-width="1"
              />
            </svg>
          </span>
          <span>{{ item.name[0].toUpperCase() + item.name.slice(1) }}</span>
        </div>
        <span class="font-semibold ml-4">{{ item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}}</span>
      </div>
    </CardContent>
  </Card>
</template>