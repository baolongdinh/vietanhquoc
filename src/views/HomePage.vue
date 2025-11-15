<template>
  <div>
    <main>
      <HeroSection :hero="data.hero" />

      <div class="course-section-wrapper">
        <section id="courses" class="courses-section container">
          <h2 class="section-title">KHÓA HỌC NỔI BẬT</h2>
          <div class="course-list">
            <CourseCard v-for="(course, i) in data.courses" :key="i" :course="course" />
          </div>
        </section>
      </div>

      <AbountPage />
      <ContactPage />
      
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

// Import component
import HeroSection from '../components/HeroSection.vue'
import CourseCard from '../components/CourseCard.vue'
import ContactPage from './ContactPage.vue'
import AbountPage from './AboutPage.vue'

const data = ref({
  hero: { cta: {} },
  courses: [],
  about: { highlights: [] },
  teachers: [],
})

onMounted(async () => {
  try {
    const base = process.env.VUE_APP_BASE_URL || '/'
    const response = await fetch(`${base}data.json?t=${Date.now()}`)
    if (!response.ok) throw new Error('Network response was not ok')
    data.value = await response.json()
    await nextTick()
    if (typeof window !== 'undefined') {
      const triggerReveal = () => {
        if (typeof IntersectionObserver === 'undefined') return
        const els = document.querySelectorAll('.reveal:not(.in-view)')
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view')
              observer.unobserve(entry.target)
            }
          })
        }, { threshold: 0.15 })
        els.forEach(el => observer.observe(el))
      }
      window.requestAnimationFrame(triggerReveal)
    }
  } catch (error) {
    console.error('Không thể tải file data.json:', error)
  }
})

</script>

<style scoped>
.course-section-wrapper {
  background-color: var(--blue-50);
  padding: 40px 0;
  width: 100%;
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 40px;
    color: var(--blue-700);
}

.course-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}
</style>
