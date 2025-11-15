<template>
  <div class="gallery-page">
    <section class="hero">
      <div class="decor-shapes"></div>
      <div class="hero-inner reveal">
        <h1>{{ gallery.title }}</h1>
        <p>Bộ sưu tập hình ảnh hoạt động và cơ sở vật chất</p>
      </div>
      <svg class="wave" viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,64 C240,128 480,0 720,64 C960,128 1200,16 1440,64 L1440,120 L0,120 Z" fill="#ffffff"/></svg>
    </section>
    
    <div class="gallery-container">
      <div v-for="(image, index) in gallery.images" :key="index" class="gallery-item reveal" @click="openLightbox(index)">
        <img :src="`${baseUrl}${image}`" :alt="`Gallery image ${index + 1}`" class="gallery-image" loading="lazy">
        <div class="gallery-overlay">🔍</div>
      </div>
    </div>

    <div v-if="lightbox.open" class="lightbox" @click.self="closeLightbox">
      <button class="lightbox-close" @click="closeLightbox">✕</button>
      <button class="lightbox-prev" @click="prevImage">◀</button>
      <img :src="`${baseUrl}${gallery.images[lightbox.index]}`" :alt="`Image ${lightbox.index + 1}`" class="lightbox-image">
      <button class="lightbox-next" @click="nextImage">▶</button>
      <div class="lightbox-caption">Ảnh {{ lightbox.index + 1 }} / {{ gallery.images.length }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const gallery = ref({
  title: '',
  images: []
});
const baseUrl = ref(process.env.VUE_APP_BASE_URL || '/');

const lightbox = ref({ open: false, index: 0 });
const openLightbox = (i) => { lightbox.value = { open: true, index: i } }
const closeLightbox = () => { lightbox.value.open = false }
const nextImage = () => { lightbox.value.index = (lightbox.value.index + 1) % (gallery.value.images.length || 1) }
const prevImage = () => { lightbox.value.index = (lightbox.value.index - 1 + (gallery.value.images.length || 1)) % (gallery.value.images.length || 1) }

onMounted(async () => {
  try {
    const g = typeof window !== 'undefined' ? window.APP_DATA : null
    if (g && g.gallery) {
      gallery.value = g.gallery
    } else {
      const response = await fetch(`${baseUrl.value}data.json`)
      if (!response.ok) throw new Error('Network response was not ok')
      const data = await response.json()
      gallery.value = data.gallery || { title: '', images: [] }
    }
  } catch (error) {
    console.error('Không thể tải file data.json:', error)
  }
})
</script>

<style scoped>
.gallery-page { background: #ffffff; }

.hero { position: relative; background: linear-gradient(45deg, var(--blue-900) 0%, var(--blue-accent) 100%); padding: 100px 20px 60px; text-align: center; overflow: hidden; }
.hero-inner h1 { font-size: 3rem; color: #fff; }
.hero-inner p { color: #FFDD80; margin-top: 8px; }
.decor-shapes { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,184,0,0.2) 2px, transparent 2px), radial-gradient(rgba(255,184,0,0.1) 2px, transparent 2px); background-size: 40px 40px, 80px 80px; background-position: 0 0, 20px 20px; pointer-events: none; }
.wave { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 80px; }

.page-header { display: none; }

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.gallery-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  column-count: 3;
  column-gap: 20px;
}

.gallery-item {
  position: relative;
  display: inline-block;
  width: 100%;
  margin: 0 0 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(11,42,111,0.12);
  break-inside: avoid;
  cursor: pointer;
}

.gallery-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.gallery-item:hover .gallery-image { transform: scale(1.05); }
.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,61,130,0.6);
  color: #fff;
  font-size: 2rem;
  display: grid;
  place-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.gallery-item:hover .gallery-overlay { opacity: 1; }

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  display: grid;
  place-items: center;
  z-index: 1000;
}
.lightbox-image { max-width: 90vw; max-height: 80vh; border-radius: 8px; }
.lightbox-close {
  position: absolute; top: 20px; right: 20px;
  background: #fff; border: none; border-radius: 999px; padding: 8px 12px; font-size: 1rem; cursor: pointer;
}
.lightbox-prev { position: absolute; left: 20px; background: #fff; border: none; border-radius: 999px; padding: 8px 12px; font-size: 1.2rem; cursor: pointer; }
.lightbox-next { position: absolute; right: 20px; background: #fff; border: none; border-radius: 999px; padding: 8px 12px; font-size: 1.2rem; cursor: pointer; }
.lightbox-caption { position: absolute; bottom: 20px; color: #fff; }

@media (max-width: 992px) { .gallery-container { column-count: 2; } }
@media (max-width: 600px) { .gallery-container { column-count: 1; } }
</style>