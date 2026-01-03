<template>
  <div class="courses-page">
    <!-- GIỮ SECTION NÀY -->
    <section class="courses-hero">
      <div class="decor-shapes"></div>
      <div class="hero-content reveal">
        <h1>Khóa học của Việt Anh Quốc </h1>
        <p class="breadcrumb">Chương trình đào tạo chuẩn quốc tế phù hợp với mọi lứa tuổi và nhu cầu</p>
      </div>
      <div class="scroll-indicator">↓</div>
      <svg class="wave" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,64 C240,128 480,0 720,64 C960,128 1200,16 1440,64 L1440,120 L0,120 Z" fill="#F8FBFF"/>
      </svg>
    </section>

    <div class="container">
      
      <!-- Filters -->
      <div class="course-filters reveal">
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

      <!-- Courses Grid -->
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
import { ref, watch, onMounted, nextTick } from 'vue'
import CourseCard from '../components/CourseCard.vue'

const courses = ref([])
const activeFilter = ref('all')
const loading = ref(false)

// Hàm load data từ JSON
async function loadCourses() {
  loading.value = true
  console.log('🔄 Loading courses from JSON...')
  
  try {
    const g = typeof window !== 'undefined' ? window.APP_DATA : null
    if (g && g.courses) {
      courses.value = JSON.parse(JSON.stringify(g.courses))
      console.log('✅ Loaded from APP_DATA:', courses.value.length, 'courses')
    } else {
      const base = process.env.VUE_APP_BASE_URL || '/'
      const response = await fetch(`${base}data.json?t=${Date.now()}`)
      const data = await response.json()
      courses.value = JSON.parse(JSON.stringify(data.courses))
      console.log('✅ Loaded from fetch:', courses.value.length, 'courses')
    }
    
    // Debug: In ra tất cả courses
    courses.value.forEach((course, i) => {
      console.log(`Course ${i + 1}:`, course.name, '| Age:', course.age_range)
    })
  } catch (error) {
    console.error('❌ Error loading courses:', error)
    courses.value = []
  } finally {
    loading.value = false
  }
}

// Hàm filter courses - FIX LOGIC
async function getFilteredCourses() {
  console.log('🔍 Filtering with:', activeFilter.value)
  console.log('📦 Total courses available:', courses.value.length)
  
  
  if (activeFilter.value === 'all') {
    console.log('➡️ Showing all courses', courses.value.length)
    return courses.value
  }
  
  const filtered = courses.value.filter(course => {
    // Lấy age_range và convert thành lowercase
    const ageRange = String(course.age_range || '').toLowerCase().trim()
    console.log(`\n📝 Checking: "${course.name}"`)
    console.log(`   Age range: "${ageRange}"`)
    console.log(`   Filter: "${activeFilter.value}"`)
    
    let match = false
    
    if (activeFilter.value === 'children') {
      // Match: 3-6 tuổi, 7-11 tuổi (4-11 tuổi)
      match = ageRange.includes('3-6') || 
              ageRange.includes('4-6') || 
              ageRange.includes('7-11') ||
              ageRange.includes('6-11') ||
              ageRange.match(/[3-9]\s*-\s*1[01]/) !== null // regex: 3-6, 4-11, 7-10, etc.
      
      console.log(`   Children filter (3-11 tuổi): ${match ? '✅ MATCH' : '❌ NO MATCH'}`)
    }
    
    else if (activeFilter.value === 'teen') {
      // Match: 11-15 tuổi, 12-16 tuổi
      match = ageRange.includes('11-15') || 
              ageRange.includes('12-16') ||
              ageRange.includes('11-16') ||
              ageRange.match(/1[1-5]\s*-\s*1[5-6]/) !== null // regex: 11-15, 12-16, etc.
      
      console.log(`   Teen filter (11-15 tuổi): ${match ? '✅ MATCH' : '❌ NO MATCH'}`)
    }
    
    else if (activeFilter.value === 'adult') {
      // Match: 15+, 16+, 18+ tuổi
      match = ageRange.includes('15+') || 
              ageRange.includes('16+') ||
              ageRange.includes('18+') ||
              ageRange.includes('người lớn') ||
              ageRange.includes('người đi làm') ||
              ageRange.match(/1[5-9]\+|[2-9][0-9]\+/) !== null // regex: 15+, 16+, 20+, etc.
      
      console.log(`   Adult filter (15+ tuổi): ${match ? '✅ MATCH' : '❌ NO MATCH'}`)
    }
    
    return match
  })
  
  console.log('\n📊 FILTERED RESULT:', filtered.length, 'courses')
  filtered.forEach(c => console.log('   ✓', c.name))
  
  return filtered
}

// Computed property cho filtered courses
const filteredCourses = ref([])

function triggerReveal() {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return
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

// Watch activeFilter và LOAD LẠI DATA mỗi khi thay đổi
watch(activeFilter, async (newFilter, oldFilter) => {
  console.log(`\n🎯 Filter changed from "${oldFilter}" to "${newFilter}"`)
  
  // Load lại data từ JSON
  await loadCourses()
  
  // Sau đó filter
  filteredCourses.value = await getFilteredCourses()
  console.log('📊 Watch Filtered courses:', filteredCourses.value.length)
  await nextTick()
  window.requestAnimationFrame(triggerReveal)
}, { immediate: false })

// Load data lần đầu
onMounted(async () => {
  console.log('🚀 Component mounted')
  await loadCourses()
  filteredCourses.value = await getFilteredCourses()
  await nextTick()
  window.requestAnimationFrame(triggerReveal)
})
</script>

<style scoped>
.courses-page {
  padding-top: 0;
  background-color: #F8FBFF;
}

/* Hero Section - ĐIỀU CHỈNH CHO GIỐNG ABOUT PAGE */
.courses-hero {
  position: relative;
  background: linear-gradient(45deg, var(--blue-900) 0%, var(--blue-accent) 100%);
  padding: 80px 30px; 
  text-align: center;
  overflow: hidden;
  margin-bottom: 0; /* BỎ margin-bottom 60px */
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.decor-shapes {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(rgba(255,184,0,0.2) 2px, transparent 2px),
    radial-gradient(rgba(255,184,0,0.1) 2px, transparent 2px);
  background-size: 40px 40px, 80px 80px;
  background-position: 0 0, 20px 20px;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  max-width: 1200px;
}

.hero-content h1 {
  font-size: 3.8rem; /* Tăng lên 3.8rem để khớp với About page */
  font-weight: 800;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0,0,0,0.1);
  color: #ffffff !important;
}

.breadcrumb {
  font-size: 1.1rem; /* GIẢM từ 1.3rem xuống 1.15rem */
  color: #FFDD80;
  margin: 0; /* THÊM margin-top */
  font-weight: 400; /* GIẢM từ 500 xuống 400 */
}

.scroll-indicator {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 1.5s infinite;
  font-size: 2rem;
  color: white;
  z-index: 2;
}

@keyframes bounce {
  0%, 100% { transform: translate(-50%, 0); }
  50% { transform: translate(-50%, -12px); }
}

.wave {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 80px; /* GIỐNG ABOUT */
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Course Filters */
.course-filters {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 60px 0 48px 0; /* THÊM margin-top 60px để cách hero */
  flex-wrap: wrap;
}

.course-filters button {
  background: white;
  border: 2px solid #003D82;
  color: #003D82;
  padding: 14px 28px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.course-filters button:hover {
  background: #E8F4FA;
  transform: scale(1.05);
}

.course-filters button.active {
  background: #003D82;
  color: white;
  box-shadow: 0 4px 16px rgba(0,61,130,0.3);
  transform: scale(1.05);
}

/* Courses Grid */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 32px;
  padding-bottom: 80px;
}

/* Responsive */
@media (max-width: 768px) {
  .courses-hero {
    padding: 60px 20px 40px; /* GIẢM padding trên mobile */
  }
  
  .hero-content h1 {
    font-size: 2.6rem; /* Tăng lên 2.6rem để khớp với About page */
  }
  
  .breadcrumb {
    font-size: 1.05rem;
  }
  
  .course-filters {
    margin: 40px 0 32px 0; /* GIẢM margin trên mobile */
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .course-filters {
    gap: 12px;
  }
  
  .course-filters button {
    padding: 12px 20px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .breadcrumb {
    font-size: 1rem;
  }
}
</style>