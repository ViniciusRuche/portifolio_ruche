<script setup>
import { ref } from 'vue'
import { 
  ExternalLink, 
  Github, 
  Layers, 
  Maximize2, 
  CheckCircle2 
} from 'lucide-vue-next'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

const projects = [
  {
    title: 'Aeroclube Web',
    shortDesc: 'Sistema de gestão para o Aeroclube de Caxias do Sul.',
    fullDesc: 'Uma plataforma completa desenvolvida para automatizar o controle de recebimentos e fluxo de caixa do aeroclube. Inclui geração dinâmica de recibos e dashboards financeiros.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80', // Exemplo
    tags: ['Vue 3', 'Pinia', 'Tailwind', 'Django'],
    repo: 'https://github.com/seu-user/aeroclube',
    live: 'https://aeroclubecaxias.com.br',
    features: ['Gestão Financeira', 'Geração de PDF', 'Auth JWT']
  },
  {
    title: 'Portfólio Jurídico',
    shortDesc: 'Site profissional de alta conversão para advogados.',
    fullDesc: 'Projeto focado em performance e SEO, utilizando Vite para carregamento instantâneo. Design minimalista com foco em acessibilidade e captura de leads.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    tags: ['Vite', 'TypeScript', 'Framer Motion'],
    repo: 'https://github.com/seu-user/portfolio-law',
    live: '#',
    features: ['SEO Otimizado', 'Dark Mode', 'Formulários Validados']
  }
]

const selectedProject = ref(null)
</script>

<template>
  <section id="projetos" class="py-24 bg-[#050505]">
    <div class="container mx-auto px-6">
      <div class="mb-16 space-y-4">
        <h2 class="text-4xl font-black tracking-tighter text-white italic">
          TRABALHOS <span class="text-indigo-500">SELECIONADOS</span>
        </h2>
        <div class="w-24 h-1 bg-indigo-500 rounded-full"></div>
      </div>

      <div class="grid gap-8 md:grid-cols-2">
        <Dialog v-for="p in projects" :key="p.title">
          <DialogTrigger asChild>
            <div class="group cursor-pointer relative bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all duration-500">
              <div class="relative h-64 overflow-hidden">
                <div class="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-500 z-10"></div>
                <img :src="p.image" :alt="p.title" class="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                <div class="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div class="p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-white">
                    <Maximize2 size="20" />
                  </div>
                </div>
              </div>

              <div class="p-8 space-y-4">
                <div class="flex flex-wrap gap-2">
                  <Badge v-for="tag in p.tags.slice(0, 3)" :key="tag" variant="secondary" class="bg-indigo-500/10 text-indigo-300 border-none uppercase text-[10px] tracking-widest font-bold">
                    {{ tag }}
                  </Badge>
                </div>
                <h3 class="text-2xl font-bold text-white">{{ p.title }}</h3>
                <p class="text-slate-400 text-sm leading-relaxed">{{ p.shortDesc }}</p>
              </div>
            </div>
          </DialogTrigger>

          <DialogContent class="sm:max-w-[700px] bg-[#0a0a0a] border-white/10 text-white overflow-hidden p-0">
            <div class="h-64 w-full relative">
              <img :src="p.image" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
            </div>
            
            <div class="p-8 space-y-6">
              <DialogHeader>
                <DialogTitle class="text-3xl font-black italic tracking-tight text-white">{{ p.title }}</DialogTitle>
                <div class="flex gap-2 pt-2">
                   <Badge v-for="tag in p.tags" :key="tag" variant="outline" class="border-white/20 text-white">{{ tag }}</Badge>
                </div>
              </DialogHeader>

              <DialogDescription class="text-slate-300 text-base leading-relaxed">
                {{ p.fullDesc }}
              </DialogDescription>

              <div class="space-y-3">
                <h4 class="text-sm font-bold uppercase tracking-widest text-indigo-400">Principais Funcionalidades</h4>
                <div class="grid grid-cols-2 gap-2">
                  <div v-for="feature in p.features" :key="feature" class="flex items-center gap-2 text-sm text-slate-400">
                    <CheckCircle2 size="14" class="text-indigo-500" />
                    {{ feature }}
                  </div>
                </div>
              </div>

              <div class="flex gap-4 pt-4 border-t border-white/10">
                <a :href="p.live" target="_blank" class="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-indigo-500 hover:text-white transition-all">
                  <ExternalLink size="16" /> Visitar Site
                </a>
                <a :href="p.repo" target="_blank" class="flex items-center gap-2 border border-white/10 bg-white/5 px-6 py-2 rounded-full font-bold text-sm hover:bg-white/10 transition-all">
                  <Github size="16" /> Repositório
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  </section>
</template>