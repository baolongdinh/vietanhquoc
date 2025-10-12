<template>
  <section v-if="passion" class="passion-section container">
    <div class="passion-image">
      <img :src="`${baseUrl}${passion.image}`" :alt="passion.title" loading="lazy" />
    </div>
    <div class="passion-content">
      <h2>{{ passion.title }}</h2>
      <p class="description">{{ passion.description }}</p>
      <ul class="highlight-list">
        <li v-for="(item, index) in passion.highlights" :key="index">
          <i class="icon-check"></i>
          <span>{{ item.text }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  passion: {
    type: Object,
    required: true
  }
})

const baseUrl = ref(process.env.VUE_APP_BASE_URL || '')
</script>

<style scoped>
.passion-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 3rem 0;
}
.passion-image img {
  max-width: 500px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
.passion-content {
  max-width: 600px;
}
.passion-content h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.passion-content .description {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
.highlight-list {
  list-style: none;
  padding: 0;
}
.highlight-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.icon-check {
  color: #f39c12;
}

/* Responsive styles */
@media (max-width: 768px) {
  .passion-section {
    flex-direction: column;
    padding: 2rem 1rem;
  }
  
  .passion-image {
    width: 100%;
    margin-bottom: 1.5rem;
  }
  
  .passion-image img {
    width: 100%;
    max-width: 100%;
  }
  
  .passion-content {
    width: 100%;
  }
  
  .passion-content h2 {
    font-size: 1.5rem;
    text-align: center;
  }
}
</style>
