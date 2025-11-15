<template>
  <div class="teachers-page">
    <div class="container">
      <div class="page-header">
        <h1>Đội ngũ giáo viên</h1>
        <p class="subtitle">Đội ngũ giảng dạy chuẩn quốc tế sẵn sàng đồng hành cùng học viên</p>
      </div>
      
      <div class="teacher-filters">
        <button 
          @click="activeFilter = 'all'" 
          :class="{ active: activeFilter === 'all' }"
        >
          Tất cả giáo viên
        </button>
        <button 
          @click="activeFilter = 'foreign'" 
          :class="{ active: activeFilter === 'foreign' }"
        >
          Giáo viên Quốc tế
        </button>
        <button 
          @click="activeFilter = 'vietnamese'" 
          :class="{ active: activeFilter === 'vietnamese' }"
        >
          Giáo viên Việt Nam
        </button>
      </div>

      <div class="teacher-stats">
        <div class="stat-item">
          <div class="stat-number">100%</div>
          <div class="stat-desc">Giáo viên có bằng giảng dạy tiếng Anh theo tiêu chuẩn quốc tế</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">3.000+</div>
          <div class="stat-desc">Giáo viên bản xứ và Việt Nam cùng trợ giảng dày dặn kinh nghiệm</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">30+</div>
          <div class="stat-desc">Giáo viên IELTS trên 8.0</div>
        </div>
      </div>

      <div class="teachers-grid">
        <TeacherCard 
          v-for="teacher in filteredTeachers" 
          :key="teacher.name" 
          :teacher="teacher" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TeacherCard from '../components/TeacherCard.vue'

const teachers = ref([])
const activeFilter = ref('all')

const filteredTeachers = computed(() => {
  if (activeFilter.value === 'all') {
    return teachers.value
  }
  return teachers.value.filter(teacher => teacher.type === activeFilter.value)
})

onMounted(async () => {
  try {
    const base = process.env.VUE_APP_BASE_URL || '/'
    const response = await fetch(`${base}data.json`)
    const data = await response.json()
    teachers.value = data.teachers
  } catch (error) {
    console.error('Error loading teachers data:', error)
  }

  const animateCount = (el) => {
    const text = el.textContent.trim()
    const target = parseInt(text.replace(/[^0-9]/g, '')) || 0
    let current = 0
    const step = Math.max(1, Math.floor(target / 60))
    const tick = () => {
      current = Math.min(target, current + step)
      el.textContent = text.includes('%') ? `${current}%` : (text.includes('+') ? `${current}+` : `${current}`)
      if (current < target) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.6 })

  document.querySelectorAll('.stat-number').forEach(el => observer.observe(el))
})
</script>

<style scoped>
.teachers-page {
  padding: 60px 0;
  background-color: var(--blue-50);
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
  color: var(--blue-700);
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--text-dark);
  max-width: 700px;
  margin: 0 auto;
}

.teacher-filters {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.teacher-filters button {
  background: transparent;
  border: 2px solid var(--blue-900);
  color: var(--blue-900);
  padding: 10px 20px;
  margin: 0 10px 10px;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.teacher-filters button.active,
.teacher-filters button:hover {
  background-color: var(--blue-900);
  color: white;
  box-shadow: 0 0 0 4px rgba(0,61,130,0.15);
  transform: scale(1.05);
}

.teacher-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
  padding: 20px;
  max-width: 300px;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(90deg, var(--blue-500), var(--blue-900));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 10px;
}

.stat-desc {
  color: #555;
  line-height: 1.5;
}

.teachers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

@media (max-width: 768px) {
  .teacher-stats {
    flex-direction: column;
    align-items: center;
  }
  
  .stat-item {
    margin-bottom: 20px;
  }
  
  .teachers-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>