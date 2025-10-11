<template>
  <div>
    <!-- Nội dung chính -->
    <main>
      <HeroSection :hero="data.hero" />

      <!-- Khóa học -->
      <section id="courses" class="courses-section container">
        <h2 class="section-title">KHÓA HỌC</h2>
        <div class="course-list">
          <CourseCard
            v-for="(course, i) in data.courses"
            :key="i"
            :course="course"
          />
        </div>
      </section>

      <!-- Teachers Section -->
      <TeachersSection :teachers="data.teachers" />

       <!-- Passion Section -->
      <!-- <PassionSection :passion="data.passion" /> -->

      <!-- About Page -->
      <AboutPage />

      <!-- Activities Page -->
      <ActivitiesPage />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Import component
import HeroSection from '../components/HeroSection.vue'
import CourseCard from '../components/CourseCard.vue'
import TeachersSection from '../components/TeachersSection.vue'
import PassionSection from '../components/PassionSection.vue'
import AboutPage from './AboutPage.vue'
import ActivitiesPage from './ActivitiesPage.vue'

// State mặc định tránh undefined khi render sớm
const data = ref({
  hero: { cta: {} },
  courses: [],
  passion: null,
  about: { highlights: [] },
  teachers: [],
})

// Fetch data từ file data.json sử dụng process.env.VUE_APP_BASE_URL
onMounted(async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_BASE_URL}data.json`)
    if (!response.ok) throw new Error('Network response was not ok')
    data.value = await response.json()
  } catch (error) {
    console.error('Không thể tải file data.json:', error)
  }
})
</script>
