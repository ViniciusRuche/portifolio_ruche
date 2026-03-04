<script setup>
import { 
  Code2, 
  Database, 
  Wrench, 
  Layout, 
  Terminal, 
  Smartphone 
} from 'lucide-vue-next'

const skillGroups = [
  {
    category: 'Frontend',
    icon: Layout,
    color: 'text-emerald-400',
    skills: [
      { name: 'Vue.js 3', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg' },
      { name: 'TypeScript', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg' },
    ]
  },
  {
    category: 'Backend',
    icon: Database,
    color: 'text-indigo-400',
    skills: [
      { name: 'Python', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
      { name: 'Django / DRF', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg' },
      { name: 'PostgreSQL', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg' },
    ]
  },
  {
    category: 'Ferramentas & Testes',
    icon: Wrench,
    color: 'text-purple-400',
    skills: [
      { name: 'Git / GitHub', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg' },
      { name: 'Vitest', icon: 'https://vitest.dev/logo-shadow.svg' },
      { name: 'Docker', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg' },
    ]
  }
]
</script>

<template>
  <section id="habilidades" class="py-24 bg-[#050505] overflow-hidden">
    <div class="container mx-auto px-6">
      
      <div class="mb-16">
        <h2 class="text-4xl font-black tracking-tighter text-white italic">
          TECH <span class="text-indigo-500">STACK</span>
        </h2>
        <p class="text-slate-500 mt-2 font-medium">As tecnologias que utilizo para dar vida aos projetos.</p>
        <div class="w-20 h-1 bg-indigo-500 rounded-full mt-4"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="group in skillGroups" :key="group.category" class="space-y-6">
          
          <div class="flex items-center gap-3">
            <component :is="group.icon" :class="['w-5 h-5', group.color]" />
            <h3 class="text-white font-bold tracking-widest uppercase text-sm">{{ group.category }}</h3>
          </div>

          <div class="grid grid-cols-1 gap-3">
            <div 
              v-for="skill in group.skills" 
              :key="skill.name"
              class="group relative flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all duration-300 overflow-hidden"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div class="relative z-10 w-8 h-8 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                <img :src="skill.icon" :alt="skill.name" class="max-w-full max-h-full object-contain" />
              </div>

              <span class="relative z-10 text-slate-400 group-hover:text-white font-semibold text-sm transition-colors">
                {{ skill.name }}
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>