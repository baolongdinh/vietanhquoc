<template>
  <div class="about-section">
    <div class="container">
      <div class="about-content">
        <div class="about-text">
          <h2>{{ about.title }}</h2>
          <p>{{ about.desc }}</p>
          <ul>
            <li v-for="(highlight, index) in about.highlights" :key="index">
              <i class="fas fa-check-circle"></i> {{ highlight }}
            </li>
          </ul>
        </div>
        <div class="about-image">
          <img :src="`${baseUrl}${about.image}`" alt="About us">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutSection',
  props: {
    about: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL || '/'
    };
  }
};
</script>

<style scoped>
.about-section {
  padding: 60px 0;
  background-color: var(--blue-50);
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.about-content {
  display: flex;
  align-items: center;
  gap: 40px;
}
.about-text {
  flex: 1;
}
.about-text h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: var(--blue-700);
}
.about-text p {
  margin-bottom: 20px;
  line-height: 1.6;
}
.about-text ul {
  list-style: none;
  padding: 0;
}
.about-text ul li {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.about-text ul li i {
  color: var(--blue-600);
  margin-right: 10px;
}
.about-image {
  flex: 1;
}
.about-image img {
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(11, 42, 111, 0.12);
}

@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
  }
}
</style>