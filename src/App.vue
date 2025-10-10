<template>
  <div id="app">
    <template v-if="dataLoaded">
      <!-- Header -->
      <Header :header="data.header" />

      <!-- Router View -->
      <router-view />

      <!-- Footer -->
      <Footer :footer="data.footer" />
    </template>

    <!-- Loading -->
    <div v-else class="loading">
      <p>Đang tải dữ liệu...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Import component
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import HomePage from './views/HomePage.vue'

// State mặc định tránh undefined khi render sớm
const data = ref({
  header: { menu: [], cta: {} },
  hero: { cta: {} },
  courses: [],
  passion: null,
  about: { highlights: [] },
  teachers: [],
  footer: { socials: {} }
})

const dataLoaded = ref(false)

// Fetch data từ file public./public/data.json
onMounted(async () => {
  try {
    const response = await fetch('./data.json')
    if (!response.ok) throw new Error('Network response was not ok')
    data.value = await response.json()
    dataLoaded.value = true
  } catch (error) {
    console.error('Không thể tải file data.json:', error)
  }
})
</script>

<style>
@import './style.css'; /* CSS toàn cục */
/* @import 'swiper/swiper-bundle.css'; nếu bạn dùng swiper */

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
}
</style>
