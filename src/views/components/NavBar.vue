<template>
  <nav class="navbar">
    <div class="nav-content">
      <a href="#" class="logo">
        <img src="@/assets/logo.gif" alt="Logo Text" class="logo-text" />
      </a>

      <ul class="nav-links" :class="{ 'is-active': isMobileMenuOpen }">
        <li v-for="link in navLinks" :key="link.text">
          <a :href="link.url" @click="isMobileMenuOpen = false">{{ link.text }}</a>
        </li>
      </ul>

      <div class="nav-actions">
        <a href="#contato" class="btn-cta">CONTATO</a>
        
        <div class="mobile-toggle" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);

const navLinks = [
  { text: 'SOBRE', url: '#sobre' },
  { text: 'PROJETOS', url: '#projetos' },
  { text: 'HABILIDADES', url: '#habilidades' }
];

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  z-index: 1000;
}

.nav-content {
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
}

.logo-text {
  width: 110px;
  height: 40px;
  border-radius: 8px;
  position: relative;
}

.nav-links {
  display: flex;
  gap: 32px;
  list-style: none;
}

.nav-links a {
  text-decoration: none;
  color: #c1c1c9;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: #fff;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn-login {
  text-decoration: none;
  color: #a1a1aa;
  font-size: 0.9rem;
  font-weight: 500;
}

.btn-cta {
  background: #fff;
  color: #050505;
  padding: 10px 20px;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.btn-cta:hover {
  transform: translateY(-1px);
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

.mobile-toggle span {
  width: 20px;
  height: 2px;
  background: #fff;
}


/* Responsividade */
@media (max-width: 768px) {
  .nav-links {
    display: none; /* Aqui você poderia adicionar lógica para um menu mobile real */
  }
  
  .nav-links.is-active {
    display: flex;
    position: absolute;
    top: 80px;
    left: 20px;
    right: 20px;
    flex-direction: column;
    background: rgba(10, 10, 10, 0.95);
    padding: 20px;
    border-radius: 20px;
    border: 1px solid var(--glass-border);
  }

  .btn-login {
    display: none;
  }

  .mobile-toggle {
    display: flex;
  }
}
</style>