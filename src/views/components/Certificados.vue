<script setup>
import { Award, ExternalLink, Calendar } from 'lucide-vue-next'

const certificates = [
  {
    title: 'Técnico em Informática',
    issuer: 'QI Faculdade e Escola Técnica',
    date: 'Março 2023',
    link: '#'
  },
  {
    title: 'Inglês Intermediário - 275 horas',
    issuer: 'TopWay & Skill Idiomas',
    date: 'Maio 2020 & Dezembro 2017',
    link: '#'
  },
  {
    title: 'FrontEnd com Vue.js 3 - 20 horas',
    issuer: 'Udemy',
    date: 'Janeiro 2025',
    link: '#'
  },
  {
    title: 'Python para Iniciantes - 15 horas',
    issuer: 'Udemy',
    date: 'Fevereiro 2025',
    link: '#'
  }
]
</script>

<template>
  <section id="certificados" class="py-20 bg-[#050505]">
    <div class="container mx-auto px-6">
      <div class="mb-12">
        <h2 class="text-4xl font-black tracking-tighter text-white italic">
          CERTIFICAÇÕES <span class="text-indigo-500">&</span> EDUCAÇÃO
        </h2>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <div v-for="cert in certificates" :key="cert.title" 
             class="flex items-center justify-between p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:bg-white/[0.04] transition-all group">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
              <Award size="24" />
            </div>
            <div>
              <h3 class="text-white font-bold text-sm md:text-base">{{ cert.title }}</h3>
              <p class="text-slate-500 text-xs uppercase tracking-widest mt-1">{{ cert.issuer }}</p>
            </div>
          </div>
          <a :href="cert.link" target="_blank" class="text-slate-500 hover:text-white transition-colors">
            <ExternalLink size="18" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>