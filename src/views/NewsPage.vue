<template>
  <div class="news-page">
    <section class="hero">
      <div class="decor-shapes"></div>
      <div class="hero-inner reveal">
        <h1>Tin tức</h1>
        <p>Cập nhật những tài liệu và thông tin mới nhất từ Việt Anh Quốc.</p>
      </div>
      <svg class="wave" viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,64 C240,128 480,0 720,64 C960,128 1200,16 1440,64 L1440,120 L0,120 Z" fill="#ffffff"/></svg>
    </section>
    
    <div class="news-container">
      <div v-for="item in news" :key="item.id" class="news-item reveal">
        <h2 class="news-title">{{ item.title }}</h2>
        <p class="news-description">{{ item.description }}</p>
        <a :href="`${baseUrl}${item.file}`" target="_blank" class="news-link">Tải về</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const news = ref([]);
const baseUrl = ref(process.env.VUE_APP_BASE_URL || '/');

onMounted(async () => {
  try {
    const g = typeof window !== 'undefined' ? window.APP_DATA : null
    if (g && g.news) {
      news.value = g.news
    } else {
      const response = await fetch(`${baseUrl.value}data.json`)
      if (!response.ok) throw new Error('Network response was not ok')
      const data = await response.json()
      news.value = data.news || []
    }
  } catch (error) {
    console.error('Không thể tải file data.json:', error)
  }
})
</script>

<style scoped>
.news-page { background: #ffffff; }

.hero {
  position: relative;
  background: linear-gradient(45deg, var(--blue-900) 0%, var(--blue-accent) 100%);
  padding: 100px 20px 60px;
  text-align: center;
  overflow: hidden;
}
.hero-inner h1 { font-size: 3rem; color: #fff; }
.hero-inner p { color: #FFDD80; margin-top: 8px; }
.decor-shapes { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,184,0,0.2) 2px, transparent 2px), radial-gradient(rgba(255,184,0,0.1) 2px, transparent 2px); background-size: 40px 40px, 80px 80px; background-position: 0 0, 20px 20px; pointer-events: none; }
.wave { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 80px; }

.news-page .page-header { display: none; }

.news-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  gap: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.news-container {
  display: grid;
  gap: 20px;
}

.news-item {
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 6px 16px rgba(11,42,111,0.1);
}

.news-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.news-description {
  margin-bottom: 15px;
}

.news-link {
  display: inline-block;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.news-link:hover {
  background-color: #0056b3;
}
</style>