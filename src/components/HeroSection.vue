<template>
  <section class="hero-section" :style="{ backgroundImage: `url(${baseUrl}${hero.bannerImage})` }">
    <div class="overlay"></div>
    <div class="hero-content">
      <h1>{{ hero.title }}</h1>
      <h2>{{ hero.subtitle }}</h2>
      <p>{{ hero.description }}</p>
      <a :href="hero.cta.link" class="btn btn-secondary">{{ hero.cta.label }}</a>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  hero: Object
})

const baseUrl = ref(process.env.VUE_APP_BASE_URL || '')
</script>