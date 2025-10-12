<template>
  <header>
    <router-link to="/">
      <img :src="`${baseUrl}${header.logo}`" alt="Logo" class="logo" loading="lazy">
    </router-link>
    
    <!-- Menu hamburger cho mobile -->
    <div class="menu-toggle" :class="{ 'active': menuActive }" @click="toggleMenu">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    
    <nav :class="{ 'active': menuActive }">
      <ul>
        <li v-for="(item, i) in header.menu" :key="i">
          <router-link v-if="item.link.startsWith('/')" :to="item.link" @click="closeMenu">{{ item.label }}</router-link>
          <a v-else :href="item.link" @click="closeMenu">{{ item.label }}</a>
        </li>
      </ul>
    </nav>
  </header>
  
  <!-- Nút CTA cố định -->
  <div class="fixed-cta">
    <button class="cta-button" @click="showModal = true">{{ header.cta.label }}</button>
  </div>
  
  <!-- Modal liên hệ -->
  <div class="modal-overlay" v-if="showModal" @click="showModal = false">
    <div class="modal-content" @click.stop>
      <h2>Liên hệ với chúng tôi</h2>
      <div class="social-buttons">
        <a href="https://www.facebook.com/NNVietAnhQuoc/" target="_blank" class="social-button facebook">
          Facebook
        </a>
        <a href="https://zalo.me/NNVietAnhQuoc" target="_blank" class="social-button zalo">
          Zalo
        </a>
      </div>
      <button class="close-button" @click="showModal = false">×</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  header: Object
})

const baseUrl = ref(process.env.VUE_APP_BASE_URL || '')
const showModal = ref(false)
const menuActive = ref(false)

function toggleMenu() {
  menuActive.value = !menuActive.value
  if (menuActive.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

function closeMenu() {
  menuActive.value = false
  document.body.style.overflow = ''
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 100;
}

.logo {
  height: 80px;
  max-width: 100%;
  object-fit: contain;
}

nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

nav ul {
  display: flex;
  list-style: none;
  margin: 0 auto;
  padding: 0;
  justify-content: center;
}

nav li {
  margin-left: 1.5rem;
}

nav a {
  text-decoration: none;
  color: #1a4b8c;
  font-weight: 700;
  font-size: 1.2rem;
  transition: color 0.3s, transform 0.2s;
}

nav a:hover {
  color: #3a7bd5;
  transform: translateY(-2px);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  z-index: 101;
}

.bar {
  width: 25px;
  height: 3px;
  background-color: #24478f;
  margin: 3px 0;
  transition: 0.4s;
}

/* Hiệu ứng cho nút menu khi active */
.menu-toggle.active .bar:nth-child(1) {
  transform: rotate(-45deg) translate(-5px, 6px);
}

.menu-toggle.active .bar:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active .bar:nth-child(3) {
  transform: rotate(45deg) translate(-5px, -6px);
}

/* Nút CTA cố định */
.fixed-cta {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 99;
}

.cta-button {
  background-color: #ff5252;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(255, 82, 82, 0.3);
}

.cta-button:hover {
  background-color: #e03e3e;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(255, 82, 82, 0.4);
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
  border-radius: 5px;
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: opacity 0.3s;
}

.social-button:hover {
  opacity: 0.9;
}

.facebook {
  background-color: #1877f2;
}

.zalo {
  background-color: #0068ff;
}

/* Responsive styles */
@media (max-width: 768px) {
  header {
    padding: 0.8rem 1.5rem;
    justify-content: space-between;
  }
  
  .logo {
    margin-right: auto;
    margin-left: 0;
  }
  
  .menu-toggle {
    display: flex;
    margin-left: auto;
  }
  
  nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    height: 100vh;
    background-color: #f8f9fa;
    flex-direction: column;
    padding: 100px 2rem 2rem;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  }
  
  nav.active {
    right: 0;
  }
  
  nav ul {
    flex-direction: column;
    width: 100%;
  }
  
  nav li {
    margin: 1.2rem 0;
    text-align: center;
    width: 100%;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 1rem;
  }
  
  nav a {
    font-size: 1.2rem;
    display: block;
    padding: 0.5rem 0;
  }
  
  .fixed-cta {
    bottom: 1rem;
    right: 1rem;
  }
  
  .cta-button {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}
</style>
