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
    fullDesc: 'Uma plataforma de gestão integrada desenvolvida para o Aeroclube de Caxias do Sul. O sistema automatiza o controle financeiro (fluxo de caixa e geração de recibos em PDF), a gestão acadêmica de alunos e o controle de acesso via Auth JWT, oferecendo dashboards estratégicos para a tomada de decisão.',
    image: 'https://www.aeroclubecaxias.com.br/images/logo.png',
    tags: ['Vue', 'Django', 'PostgreSQL'],
    repo: 'https://github.com/ByteScratchers',
    live: 'https://aeroclube.wemakecode.dev/',
    features: ['Gestão Financeira', 'Geração de PDF', 'Gestão de Usuários', 'Gestão do Acadêmico', 'Auth JWT']
  },
  {
    title: 'Portfólio Pessoal',
    shortDesc: 'Hub central da minha carreira como desenvolvedor, focado em performance e design minimalista.',
    fullDesc: 'Desenvolvido para consolidar minha presença digital, este projeto utiliza Vite para um build ultrarrápido e TypeScript para garantir a escalabilidade do código. O foco principal foi criar uma interface limpa que destaca meus projetos e habilidades técnicas, priorizando a experiência do usuário (UX) em qualquer dispositivo.',
    image: 'https://devruche.vercel.app/assets/logo-W2uxCNhW.gif',
    tags: ['Vite', 'TypeScript', 'Tailwind CSS'],
    repo: 'https://github.com/ViniciusRuche/portifolio_ruche',
    live: 'https://devruche.vercel.app/',
    features: ['SEO Otimizado', 'Dark Mode', 'Formulários Validados']
  },
  {
    title: 'Portfólio Sandra Oliveira Auriculoterapeuta',
    shortDesc: 'Landing page profissional focada em conversão e autoridade para atendimentos de auriculoterapia.',
    fullDesc: 'Um projeto desenvolvido para converter visitantes em pacientes. A interface foi pensada para transmitir calma e confiança, utilizando as cores da identidade visual da profissional. Implementei um fluxo de contato otimizado e estratégias de SEO local para garantir que a Sandra seja encontrada facilmente por quem busca seus serviços.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    tags: ['Vite', 'TypeScript', 'Tailwind CSS'],
    repo: 'https://github.com/SandraOliveiraAuri/portifolio',
    live: 'https://sandraoliveira.vercel.app/',
    features: ['SEO Otimizado', 'Call-to-Action estratégico para WhatsApp.', 'Layout Responsivo.']
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
                <img :src="p.image" :alt="p.title" class="w-full h-full bg-gray-200 object-cover group-hover:scale-105 transition-all duration-700" />
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
            <div class="bg-gray-200 h-64 w-full relative">
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