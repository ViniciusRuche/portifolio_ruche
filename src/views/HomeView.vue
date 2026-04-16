<script setup>
import NavBar from '@/views/components/NavBar.vue'
import Header from '@/views/components/Header.vue'
import Bio from '@/views/components/Bio.vue'
import Habilidade from '@/views/components/Habilidade.vue'
import Projetos from '@/views/components/Projetos.vue'
import Certificados from '@/views/components/Certificados.vue'
import Contatos from '@/views/components/Contatos.vue'
import Separator from '@/components/ui/separator/Separator.vue'
</script>

<template>
  <div class="min-h-screen bg-background"> 
    <NavBar />
    <main>
      <Header />
      <Bio />
      <Projetos />
      <Habilidade />
      <Certificados /> 
      <Contatos />
    </main>
    <Separator class="bg-border dark:bg-indigo-500/30 w-[80%] mx-auto shadow-sm"/>
    <footer class="bg-background py-10 text-center text-sm transition-colors duration-500">
      <p class="text-muted-foreground italic font-medium">
        © 2026 - <span class="text-foreground font-bold">Vinícius Ruche</span>. 
        Todos os direitos reservados. 
        <br class="md:hidden" /> Desenvolvido com <span class="text-indigo-600 dark:text-indigo-400">Vue.js</span> e <span class="text-indigo-600 dark:text-indigo-400">Tailwind CSS</span>.
      </p>
    </footer>
  </div>
</template>
<style>
html {
  scroll-behavior: smooth;
}

.dark body {
  background-color: hsl(0 0% 3.9%); 
}
</style>