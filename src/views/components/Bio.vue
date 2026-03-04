<script setup>
import { GraduationCap, MapPin, Code2, Rocket } from 'lucide-vue-next'
</script>

<template>
  <section id="sobre" class="py-24 bg-[#050505] text-white">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        <div class="lg:col-span-5 relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div class="relative bg-black rounded-2xl overflow-hidden border border-white/10">
            <img 
              src="@/assets/perfil.jpeg" 
              alt="Sua Foto" 
              class="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          
          <div class="absolute -bottom-6 -right-6 p-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl hidden md:block">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                <GraduationCap size="20" />
              </div>
              <div>
                <p class="text-[10px] uppercase tracking-widest font-bold text-slate-500">Graduação</p>
                <p class="text-xs font-semibold">Eng. de Software @ UCS</p>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-7 space-y-8">
          <div class="space-y-4">
            <h2 class="text-3xl md:text-4xl font-black tracking-tighter italic italic">
              "A tecnologia é o meio, <br/>
              <span class="text-indigo-500 text-4xl md:text-5xl">a solução é o fim.</span>"
            </h2>
            <div class="w-20 h-1 bg-indigo-500 rounded-full"></div>
          </div>

          <div class="space-y-6 text-slate-400 text-lg leading-relaxed">
            <p>
              Sou acadêmico na <span class="text-white font-medium">Universidade de Caxias do Sul</span>, 
              atualmente no 5º semestre, onde mergulho na arquitetura de sistemas e inteligência artificial.
            </p>
            
            <p>
              Meu foco é transformar problemas complexos em interfaces intuitivas e backends robustos. 
              Gosto de trabalhar na intersecção entre o design moderno e a engenharia precisa.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div class="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex gap-4 items-start">
              <Code2 class="text-indigo-400 shrink-0" size="24" />
              <div>
                <h4 class="text-sm font-bold text-white uppercase tracking-wider">Atuação Atual</h4>
                <p class="text-sm text-slate-400 mt-1">Sistemas para o Aeroclube de Caxias do Sul.</p>
              </div>
            </div>

            <div class="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex gap-4 items-start">
              <Rocket class="text-purple-400 shrink-0" size="24" />
              <div>
                <h4 class="text-sm font-bold text-white uppercase tracking-wider">Interesses</h4>
                <p class="text-sm text-slate-400 mt-1">E2E Testing, IA Generativa e Performance Web.</p>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-4 text-sm text-slate-500 pt-4">
            <MapPin size="16" />
            <span>Caxias do Sul, RS - Brasil</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>