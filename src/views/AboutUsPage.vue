<template>
  <div class="about-us-page">
    <section class="hero">
      <div class="decor-shapes"></div>
      <div class="hero-inner reveal">
        <h1>{{ aboutUsPage.introduction.title }}</h1>
        <p>Giới thiệu chi tiết về Ngoại ngữ Việt Anh Quốc</p>
      </div>
      <svg class="wave" viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,64 C240,128 480,0 720,64 C960,128 1200,16 1440,64 L1440,120 L0,120 Z" fill="#ffffff"/></svg>
    </section>
    
    <div class="about-us-container">
      <div v-for="(paragraph, index) in aboutUsPage.introduction.content" :key="index" class="about-us-paragraph reveal">
        <p>{{ paragraph }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const aboutUsPage = ref({
  introduction: {
    title: '',
    content: []
  }
});

onMounted(async () => {
  try {
    const g = typeof window !== 'undefined' ? window.APP_DATA : null
    if (g && g.aboutUsPage) {
      aboutUsPage.value = g.aboutUsPage
    } else {
      const base = process.env.VUE_APP_BASE_URL || '/'
      const response = await fetch(`${base}data.json`)
      if (!response.ok) throw new Error('Network response was not ok')
      const data = await response.json()
      aboutUsPage.value = data.aboutUsPage || { introduction: { title: '', content: [] } }
    }
  } catch (error) {
    console.error('Không thể tải file data.json:', error)
  }
})
</script>

<style scoped>
.about-us-page { background: #ffffff; }

.hero { position: relative; background: linear-gradient(45deg, var(--blue-900) 0%, var(--blue-accent) 100%); padding: 100px 20px 60px; text-align: center; overflow: hidden; }
.hero-inner h1 { font-size: 3rem; color: #fff; }
.hero-inner p { color: #FFDD80; margin-top: 8px; }
.decor-shapes { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,184,0,0.2) 2px, transparent 2px), radial-gradient(rgba(255,184,0,0.1) 2px, transparent 2px); background-size: 40px 40px, 80px 80px; background-position: 0 0, 20px 20px; pointer-events: none; }
.wave { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 80px; }

.about-us-container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; line-height: 1.8; }
.about-us-paragraph { margin-bottom: 20px; }
</style>