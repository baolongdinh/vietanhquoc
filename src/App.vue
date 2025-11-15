<template>
  <div id="app">
    <div class="scroll-progress" :style="{ width: `${progress}%` }"></div>
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

    <div class="quality-badge">Cam kết chất lượng</div>
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
const progress = ref(0)

// Fetch data từ file data.json sử dụng process.env.VUE_APP_BASE_URL
onMounted(async () => {
  try {
    const base = process.env.VUE_APP_BASE_URL || '/'
    const response = await fetch(`${base}data.json`)
    if (!response.ok) throw new Error('Network response was not ok')
    data.value = await response.json()
    dataLoaded.value = true
  } catch (error) {
    console.error('Không thể tải file data.json:', error)
  }
  const onScroll = () => {
    const doc = document.documentElement
    const top = doc.scrollTop
    const height = doc.scrollHeight - doc.clientHeight
    progress.value = Math.min(100, Math.round((top / height) * 100))
  }
  window.addEventListener('scroll', onScroll, { passive: true })
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

.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: var(--blue-600);
  z-index: 9999;
}

.quality-badge {
  position: fixed;
  right: 16px;
  bottom: 110px;
  background: var(--accent-yellow);
  color: #111827;
  padding: 10px 14px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(11,42,111,0.16);
  font-weight: 800;
}
</style>
