<script setup>
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Award, GraduationCap, Eye } from 'lucide-vue-next'

const certificates = [
  {
    title: 'Técnico em Informática',
    issuer: 'QI Faculdade e Escola Técnica',
    date: 'Março 2023',
    image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=1000',
    category: 'Educação'
  },
  {
    title: 'A1 Básico de Inglês - 80 Horas',
    issuer: 'Skill Idiomas',
    date: 'Dezembro 2017',
    image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=1000',
    category: 'Idioma'
  },
  {
    title: 'Inglês - 195 Horas',
    issuer: 'TopWay',
    date: 'Maio 2020',
    image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=1000',
    category: 'Idioma'
  },
  {
    title: 'Formação Front-end - HTML, CSS, JavaScript, React e +',
    issuer: 'Udemy - Matheus Battisi, Hora de Codar',
    date: 'Janeiro 2025',
    image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=1000',
    category: 'Especialização'
  },
]
</script>

<template>
  <section id="certificados" class="py-24 bg-[#050505]">
    <div class="container mx-auto px-6">
      
      <div class="mb-16">
        <h2 class="text-4xl md:text-5xl font-black tracking-tighter text-white italic uppercase">
          Certificações <span class="text-indigo-500">&</span> Educação
        </h2>
        <div class="w-20 h-1 bg-indigo-500 mt-4 rounded-full"></div>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Dialog v-for="cert in certificates" :key="cert.title">
          <DialogTrigger as-child>
            <div class="group relative flex items-center justify-between p-6 bg-white/[0.02] border border-white/10 rounded-2xl 
                        hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all duration-300 cursor-pointer">
              
              <div class="flex items-center gap-5">
                <div class="p-4 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                  <GraduationCap v-if="cert.category === 'Educação'" :size="24" />
                  <Award v-else :size="24" />
                </div>

                <div>
                  <h3 class="text-white font-bold text-base md:text-lg leading-tight group-hover:text-indigo-400 transition-colors">
                    {{ cert.title }}
                  </h3>
                  <div class="flex items-center gap-3 mt-1">
                    <p class="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                      {{ cert.issuer }}
                    </p>
                    <span class="w-1 h-1 bg-slate-700 rounded-full"></span>
                    <p class="text-slate-500 text-[10px] font-medium uppercase italic">
                      {{ cert.date }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                <span class="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">Detalhes</span>
                <Eye :size="16" class="text-indigo-400" />
              </div>
            </div>
          </DialogTrigger>

          <DialogContent class="sm:max-w-[700px] bg-[#0c0c0c] border border-white/10 rounded-[2rem] overflow-hidden p-0 shadow-2xl">
            <div class="p-8 bg-gradient-to-br from-indigo-600/20 to-transparent border-b border-white/5">
              <div class="flex justify-between items-start">
                <div>
                  <div class="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full w-fit mb-4">
                    <span class="text-indigo-400 text-[10px] font-bold uppercase tracking-widest">{{ cert.category }}</span>
                  </div>
                  <h2 class="text-2xl font-black text-white italic uppercase tracking-tight leading-none">{{ cert.title }}</h2>
                  <p class="text-slate-400 text-xs mt-2 uppercase tracking-widest">{{ cert.issuer }} — {{ cert.date }}</p>
                </div>
              </div>
            </div>
            
            <div class="p-4 bg-black/40 flex justify-center group/img relative">
              <img 
                :src="cert.image" 
                :alt="cert.title" 
                class="max-w-full h-auto rounded-xl shadow-2xl border border-white/5 grayscale-[0.5] hover:grayscale-0 transition-all duration-700" 
              />
            </div>

            <div class="p-6 text-center bg-[#0c0c0c]">
              <p class="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-medium">Documento Digital Autenticado</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Estilização para garantir que o modal siga o padrão arredondado */
:deep(.fixed) {
  backdrop-filter: blur(8px);
}
</style>