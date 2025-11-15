<template>
  <div class="course-detail-page" v-if="course">
    <div class="container">
      <div class="course-header">
        <div class="course-image">
          <img :src="`${baseUrl}${course.image}`" :alt="course.name" loading="lazy">
          <div class="age-range">{{ course.age_range }}</div>
        </div>
        <div class="course-info">
          <h1>{{ course.name }}</h1>
          <div class="level">🎓 Trình độ: {{ course.level }}</div>
          <div class="hours">⏱️ Thời lượng: {{ course.hours }} giờ học</div>
          <div class="schedule" v-if="course.schedule">📅 Lịch học: {{ course.schedule }}</div>
          <div class="price">💰 Học phí: {{ formatPrice(course.price) }}</div>
          <p class="description">{{ course.desc }}</p>
        </div>
      </div>

      <!-- Các section thông tin chi tiết -->
      <div class="course-details-grid">
        <!-- Mục tiêu khóa học -->
        <div class="detail-card objectives" v-if="course.objectives">
          <h2>🎯 Mục tiêu khóa học</h2>
          <ul>
            <li v-for="(objective, index) in course.objectives" :key="index">{{ objective }}</li>
          </ul>
        </div>

        <!-- Phương pháp học -->
        <div class="detail-card method" v-if="course.method">
          <h2>📚 Phương pháp học</h2>
          <p>{{ course.method }}</p>
        </div>

        <!-- Ưu điểm nổi bật -->
        <div class="detail-card advantages" v-if="course.advantages">
          <h2>⭐ Ưu điểm nổi bật</h2>
          <ul>
            <li v-for="(advantage, index) in course.advantages" :key="index">{{ advantage }}</li>
          </ul>
        </div>

        <!-- Nội dung khóa học -->
        <div class="detail-card features" v-if="course.features">
          <h2>📖 Nội dung khóa học</h2>
          <ul>
            <li v-for="(feature, index) in course.features" :key="index">{{ feature }}</li>
          </ul>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="cta-section">
        <h2>Sẵn sàng bắt đầu hành trình tiếng Anh?</h2>
        <p>Đăng ký ngay hôm nay để nhận ưu đãi đặc biệt!</p>
        <div class="cta-buttons">
          <button class="btn-primary" @click="$router.push('/contact')">
            📞 Liên hệ tư vấn
          </button>
          <button class="btn-secondary" @click="$router.push('/courses')">
            📚 Xem khóa học khác
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading">
    <div class="spinner"></div>
    <p>Đang tải thông tin khóa học...</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const courseId = computed(() => parseInt(route.params.id))
const allCourses = ref([])
const baseUrl = process.env.VUE_APP_BASE_URL || '/'

const course = computed(() => {
  return allCourses.value.find(c => c.id === courseId.value) || null
})

// Format price to VND
function formatPrice(price) {
  if (!price) return 'Liên hệ'
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}data.json`)
    const data = await response.json()
    allCourses.value = data.courses
    
    console.log('Loaded course:', course.value)
  } catch (error) {
    console.error('Error loading course data:', error)
  }
})
</script>

<style scoped>
.course-detail-page {
  padding: 80px 0;
  background: linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 50%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Course Header */
.course-header {
  display: flex;
  margin-bottom: 60px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 61, 130, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.course-header:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(0, 61, 130, 0.15);
}

.course-image {
  position: relative;
  flex: 0 0 45%;
  overflow: hidden;
}

.course-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.course-header:hover .course-image img {
  transform: scale(1.1);
}

.age-range {
  position: absolute;
  top: 20px;
  left: 0;
  background: linear-gradient(135deg, #E63946, #FF6B6B);
  color: white;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 1rem;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  box-shadow: 0 4px 12px rgba(230, 57, 70, 0.3);
}

.course-info {
  flex: 0 0 55%;
  padding: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.course-info h1 {
  font-size: 2.8rem;
  color: #003D82;
  margin: 0 0 24px;
  font-weight: 800;
  line-height: 1.2;
}

.level, .hours, .schedule {
  font-size: 1.15rem;
  color: #555;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.price {
  font-size: 1.5rem;
  font-weight: 800;
  color: #E63946;
  margin: 20px 0;
  padding: 16px 24px;
  background: linear-gradient(135deg, #FFF5F5, #FFE8E8);
  border-left: 5px solid #E63946;
  border-radius: 8px;
  display: inline-block;
}

.description {
  color: #666;
  line-height: 1.8;
  font-size: 1.1rem;
  margin-top: 20px;
}

/* Course Details Grid */
.course-details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 60px;
}

.detail-card {
  background: white;
  border-radius: 16px;
  padding: 35px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-top: 4px solid transparent;
}

.detail-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 61, 130, 0.12);
}

.detail-card.objectives {
  border-top-color: #4CAF50;
}

.detail-card.method {
  border-top-color: #FFB800;
}

.detail-card.advantages {
  border-top-color: #E63946;
}

.detail-card.features {
  border-top-color: #003D82;
}

.detail-card h2 {
  font-size: 1.7rem;
  color: #003D82;
  margin: 0 0 24px;
  padding-bottom: 12px;
  border-bottom: 3px solid #E8F4FA;
  font-weight: 700;
}

.detail-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.detail-card li {
  color: #555;
  margin-bottom: 16px;
  padding-left: 35px;
  position: relative;
  line-height: 1.7;
  font-size: 1.05rem;
}

.objectives li::before {
  content: "🎯";
  position: absolute;
  left: 0;
  font-size: 1.3rem;
}

.advantages li::before {
  content: "⭐";
  position: absolute;
  left: 0;
  font-size: 1.3rem;
}

.features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #4CAF50;
  font-weight: bold;
  font-size: 1.5rem;
}

.method p {
  color: #555;
  line-height: 1.8;
  font-size: 1.1rem;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #003D82, #4A9FE7);
  border-radius: 20px;
  padding: 50px;
  text-align: center;
  color: white;
  box-shadow: 0 10px 40px rgba(0, 61, 130, 0.2);
}

.cta-section h2 {
  font-size: 2.2rem;
  margin: 0 0 16px;
  font-weight: 800;
}

.cta-section p {
  font-size: 1.2rem;
  margin-bottom: 32px;
  opacity: 0.95;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
  padding: 16px 40px;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: #FFB800;
  color: white;
}

.btn-primary:hover {
  background: #E6A500;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 184, 0, 0.4);
}

.btn-secondary {
  background: white;
  color: #003D82;
}

.btn-secondary:hover {
  background: #F0F0F0;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.3);
}

/* Loading State */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 20px;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 5px solid #E8F4FA;
  border-top-color: #003D82;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading p {
  font-size: 1.3rem;
  color: #666;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 992px) {
  .course-details-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .course-header {
    flex-direction: column;
  }
  
  .course-image, .course-info {
    flex: 0 0 100%;
  }
  
  .course-image {
    height: 300px;
  }
  
  .course-info {
    padding: 30px;
  }
  
  .course-info h1 {
    font-size: 2rem;
  }
  
  .price {
    font-size: 1.3rem;
  }
  
  .cta-section {
    padding: 35px 25px;
  }
  
  .cta-section h2 {
    font-size: 1.8rem;
  }
  
  .cta-buttons {
    flex-direction: column;
  }
  
  .btn-primary, .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .course-info h1 {
    font-size: 1.6rem;
  }
  
  .detail-card {
    padding: 25px;
  }
  
  .detail-card h2 {
    font-size: 1.4rem;
  }
}
</style>