<script setup>
import NavBar from '@/views/components/NavBar.vue'
import Header from '@/views/components/Header.vue'
import Bio from '@/views/components/Bio.vue'
import Habilidade from '@/views/components/Habilidade.vue'
import Projetos from '@/views/components/Projetos.vue'
import Certificados from '@/views/components/Certificados.vue' // Novo componente
import Contatos from '@/views/components/Contatos.vue'
import Separator from '@/components/ui/separator/Separator.vue'
</script>

<template>
  <div class="min-h-screen bg-[#050505]"> <NavBar />
      <Header />
      <Bio />
      <Projetos />
      <Habilidade />
      <Certificados /> 
      <Contatos />
    <Separator class="bg-indigo-500/30 w-[80%] mx-auto"/> <footer class="bg-[#050505] py-10 text-center text-sm text-muted-foreground">
      <p class="text-slate-500 italic">
        © 2026 - Vinícius Ruche. Todos os direitos reservados. Desenvolvido com Vue.js e Tailwind CSS.
      </p>
    </footer>
  </div>
</template>