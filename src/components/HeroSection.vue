<template>
  <section class="hero-section" :style="{ backgroundImage: `url(${hero.bannerImage})` }">
    <div class="overlay"></div>
    <div class="hero-content">
      <h1>{{ hero.title }}</h1>
      <h2>{{ hero.subtitle }}</h2>
      <p>{{ hero.description }}</p>
      <a :href="hero.cta.link" class="cta-button">{{ hero.cta.label }}</a>
    </div>
  </section>
</template>

<script setup>
defineProps({
  hero: Object
})
</script>