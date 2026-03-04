<script setup>
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);

const navLinks = [
  { text: 'SOBRE', url: '#sobre' },
  { text: 'PROJETOS', url: '#projetos' },
  { text: 'HABILIDADES', url: '#habilidades' },
  { text: 'CERTIFICAÇÕES', url: '#certificados' }
];

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>
<template>
  <nav class="fixed top-0 left-0 w-full flex justify-center p-5 z-[1000]">
    <div class="w-full max-w-[1200px] flex items-center justify-between px-6 py-3 
                bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
      
      <a href="#" class="flex items-center">
        <img src="@/assets/logo.gif" alt="Logo" class="w-[110px] h-10 object-contain rounded-lg" />
      </a>

      <ul :class="[
        'flex gap-8 list-none transition-all duration-300',
        isMobileMenuOpen 
          ? 'absolute top-24 left-5 right-5 flex-col bg-black/95 p-5 rounded-2xl border border-white/10 flex' 
          : 'hidden md:flex'
      ]">
        <li v-for="link in navLinks" :key="link.text">
          <a :href="link.url" 
             @click="isMobileMenuOpen = false"
             class="text-[0.85rem] tracking-widest font-bold text-[#c1c1c9] hover:text-white transition-colors duration-200">
            {{ link.text }}
          </a>
        </li>
      </ul>

      <div class="flex items-center gap-4">
        <a href="#contato" 
        
           class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-all flex items-center px-5 py-2.5 rounded-full text-[0.8rem] font-bold 
                  hover:bg-indigo-500 hover:text-white transition-all duration-300">
          CONTATO
        </a>
        <div class="flex md:hidden flex-col gap-[5px] cursor-pointer" @click="toggleMenu">
          <span :class="['w-5 h-[2px] bg-white transition-all', isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : '']"></span>
          <span :class="['w-5 h-[2px] bg-white transition-all', isMobileMenuOpen ? 'opacity-0' : '']"></span>
          <span :class="['w-5 h-[2px] bg-white transition-all', isMobileMenuOpen ? '-rotate-45 -translate-y-2' : '']"></span>
        </div>
      </div>
    </div>
  </nav>
</template>