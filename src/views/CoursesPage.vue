<template>
  <div class="courses-page">
    <div class="container">
      <div class="page-header">
        <h1>Khóa học tiếng Anh</h1>
        <p class="subtitle">Chương trình đào tạo chuẩn quốc tế phù hợp với mọi lứa tuổi và nhu cầu</p>
      </div>
      
      <div class="course-filters">
        <button 
          @click="activeFilter = 'all'" 
          :class="{ active: activeFilter === 'all' }"
        >
          Tất cả khóa học
        </button>
        <button 
          @click="activeFilter = 'children'" 
          :class="{ active: activeFilter === 'children' }"
        >
          Trẻ em (4-11 tuổi)
        </button>
        <button 
          @click="activeFilter = 'teen'" 
          :class="{ active: activeFilter === 'teen' }"
        >
          Thiếu niên (11-15 tuổi)
        </button>
        <button 
          @click="activeFilter = 'adult'" 
          :class="{ active: activeFilter === 'adult' }"
        >
          Người lớn (15+ tuổi)
        </button>
      </div>

      <div class="courses-grid">
        <CourseCard 
          v-for="course in filteredCourses" 
          :key="course.id" 
          :course="course" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CourseCard from '../components/CourseCard.vue'

const courses = ref([])
const activeFilter = ref('all')

const filteredCourses = computed(() => {
  if (activeFilter.value === 'all') {
    return courses.value
  }
  
  if (activeFilter.value === 'children') {
    return courses.value.filter(course => 
      course.age_range.includes('4-6') || 
      course.age_range.includes('6-11')
    )
  }
  
  if (activeFilter.value === 'teen') {
    return courses.value.filter(course => 
      course.age_range.includes('11-15')
    )
  }
  
  if (activeFilter.value === 'adult') {
    return courses.value.filter(course => 
      course.age_range.includes('15+') || 
      course.age_range.includes('Người đi làm')
    )
  }
  
  return courses.value
})

onMounted(async () => {
  try {
    const response = await fetch('/data.json')
    const data = await response.json()
    courses.value = data.courses
  } catch (error) {
    console.error('Error loading courses data:', error)
  }
})
</script>

<style scoped>
.courses-page {
  padding: 60px 0;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
}

.course-filters {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.course-filters button {
  background: none;
  border: 2px solid #3498db;
  color: #3498db;
  padding: 10px 20px;
  margin: 0 10px 10px;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.course-filters button.active,
.course-filters button:hover {
  background-color: #3498db;
  color: white;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

@media (max-width: 768px) {
  .courses-grid {
    grid-template-columns: 1fr;
  }
}
</style>