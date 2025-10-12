<template>
  <div class="course-detail-page" v-if="course">
    <div class="container">
      <div class="course-header">
        <div class="course-image">
          <img :src="course.image" :alt="course.name" loading="lazy">
          <div class="age-range">{{ course.age_range }}</div>
        </div>
        <div class="course-info">
          <h1>{{ course.name }}</h1>
          <div class="level">Trình độ: {{ course.level }}</div>
          <div class="hours">Thời lượng: {{ course.hours }} giờ học</div>
          <p class="description">{{ course.desc }}</p>
        </div>
      </div>

      <div class="course-content">
        <h2>Nội dung khóa học</h2>
        <ul class="feature-list">
          <li v-for="(feature, index) in course.features" :key="index">
            <span class="feature-icon">✓</span>
            <span>{{ feature }}</span>
          </li>
        </ul>
      </div>

      <div class="course-benefits">
        <h2>Lợi ích khi tham gia khóa học</h2>
        <div class="benefits-grid">
          <div class="benefit-item">
            <div class="benefit-icon">🎯</div>
            <h3>Lộ trình rõ ràng</h3>
            <p>Chương trình học được thiết kế theo chuẩn CEFR quốc tế, giúp học viên tiến bộ nhanh chóng.</p>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">👨‍🏫</div>
            <h3>Giáo viên chất lượng</h3>
            <p>100% giáo viên có chứng chỉ giảng dạy quốc tế và nhiều năm kinh nghiệm.</p>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">📚</div>
            <h3>Giáo trình chuẩn quốc tế</h3>
            <p>Sử dụng giáo trình từ các nhà xuất bản uy tín trên thế giới.</p>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">🌐</div>
            <h3>Môi trường học tập hiện đại</h3>
            <p>Lớp học trang bị đầy đủ thiết bị hiện đại, tạo môi trường học tập tốt nhất.</p>
          </div>
        </div>
      </div>

      <div class="related-courses" v-if="relatedCourses.length > 0">
        <h2>Khóa học liên quan</h2>
        <div class="courses-grid">
          <CourseCard 
            v-for="relatedCourse in relatedCourses" 
            :key="relatedCourse.id" 
            :course="relatedCourse" 
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading">
    <p>Đang tải thông tin khóa học...</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CourseCard from '../components/CourseCard.vue'

const route = useRoute()
const courseId = computed(() => parseInt(route.params.id))
const allCourses = ref([])
const course = computed(() => {
  return allCourses.value.find(c => c.id === courseId.value) || null
})

const relatedCourses = computed(() => {
  if (!course.value) return []
  
  return allCourses.value
    .filter(c => c.id !== courseId.value)
    .slice(0, 3)
})

onMounted(async () => {
  try {
    const response = await fetch('./data.json')
    const data = await response.json()
    allCourses.value = data.courses
  } catch (error) {
    console.error('Error loading course data:', error)
  }
})
</script>

<style scoped>
.course-detail-page {
  padding: 60px 0;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.course-header {
  display: flex;
  margin-bottom: 50px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.course-image {
  position: relative;
  flex: 0 0 40%;
}

.course-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.age-range {
  position: absolute;
  top: 20px;
  left: 0;
  background: #e74c3c;
  color: white;
  padding: 8px 15px;
  font-weight: bold;
}

.course-info {
  flex: 0 0 60%;
  padding: 30px;
}

.course-info h1 {
  font-size: 2rem;
  color: #333;
  margin: 0 0 15px;
}

.level, .hours {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 10px;
}

.description {
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
}

.register-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 12px 25px;
  font-size: 1.1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.register-btn:hover {
  background: #c0392b;
}

.course-content, .course-benefits, .related-courses {
  background: white;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.8rem;
  color: #333;
  margin: 0 0 20px;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  margin-bottom: 15px;
  display: flex;
  align-items: flex-start;
}

.feature-icon {
  color: #2ecc71;
  font-size: 1.2rem;
  margin-right: 10px;
  font-weight: bold;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.benefit-item {
  text-align: center;
  padding: 20px;
}

.benefit-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.benefit-item h3 {
  font-size: 1.2rem;
  color: #333;
  margin: 0 0 10px;
}

.benefit-item p {
  color: #666;
  line-height: 1.5;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.loading {
  text-align: center;
  padding: 100px 0;
  font-size: 1.2rem;
  color: #666;
}

@media (max-width: 768px) {
  .course-header {
    flex-direction: column;
  }
  
  .course-image, .course-info {
    flex: 0 0 100%;
  }
  
  .course-image {
    height: 250px;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}
</style>