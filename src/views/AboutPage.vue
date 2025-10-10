<template>
  <div>
    <main>
      <!-- Hệ thống giáo dục chất lượng hàng đầu -->
      <section id="education-system" class="education-system-section container">
        <h2 class="section-title">{{ aboutData.educationSystem.title }}</h2>
        <div class="education-content">
          <div class="education-info">
            <div class="info-box">
              <h3>{{ aboutData.educationSystem.content }}</h3>
              <ul class="feature-list">
                <li v-for="(feature, index) in aboutData.educationSystem.features" :key="index">{{ feature }}</li>
              </ul>
              <p class="cta-text">{{ aboutData.educationSystem.ctaText }}</p>
            </div>
          </div>
          <!-- <img :src="aboutData.educationSystem.image" alt="Hệ thống giáo dục Việt Anh Quốc" class="education-image"> -->
        </div>
      </section>

      <!-- Tầm nhìn, Sứ mệnh, Giá trị cốt lõi -->
      <section id="vision-mission" class="vision-mission-section">
        <div class="container">
          <div class="values-grid">
            <div class="value-card" v-for="(value, index) in aboutData.visionMission.values" :key="index">
              <div class="icon-container">
                <i :class="value.icon" v-if="value.icon.includes('fas')"></i>
                <img v-else :src="value.icon" :alt="value.title" class="value-icon-img">
              </div>
              <h3>{{ value.title }}</h3>
              <p v-if="!value.values">{{ value.content }}</p>
              <ul v-else class="core-values">
                <li v-for="(item, i) in value.values" :key="i">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Học viên xuất sắc -->
      <section id="students" class="students-section container">
        <h2 class="section-title">{{ aboutData.students.title }}</h2>
        <swiper
          :modules="modules"
          :slides-per-view="3"
          :space-between="30"
          :loop="true"
          :pagination="{ clickable: true }"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
          }"
          :breakpoints="{
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30
            }
          }"
          class="swiper-container"
        >
          <swiper-slide v-for="(student, index) in aboutData.students.studentsList" :key="index">
            <div class="student-card">
              <img :src="student.image" :alt="'Học viên ' + student.name" class="student-image">
              <div class="student-info">
                <div class="achievement">{{ student.achievement }}</div>
                <h3>Học viên</h3>
                <p>{{ student.name }}</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </section>

      <!-- Phản hồi từ phụ huynh -->
      <section id="testimonials" class="testimonials-section container">
        <h2 class="section-title">{{ aboutData.testimonials.title }}</h2>
        <swiper
          :modules="modules"
          :slides-per-view="3"
          :space-between="30"
          :loop="true"
          :pagination="{ clickable: true }"
          :autoplay="{
            delay: 4000,
            disableOnInteraction: false,
          }"
          :breakpoints="{
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30
            }
          }"
          class="swiper-container"
        >
          <swiper-slide v-for="(testimonial, index) in aboutData.testimonials.testimonialsList" :key="index">
            <div class="testimonial-card">
              <img :src="testimonial.image" :alt="'Phụ huynh ' + testimonial.name" class="parent-image">
              <div class="testimonial-info">
                <div class="experience">{{ testimonial.experience }}</div>
                <h3>Phụ huynh</h3>
                <p>{{ testimonial.name }}</p>
                <div class="testimonial-text">
                  {{ testimonial.content }}
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Import required modules
import { Pagination, Autoplay } from 'swiper/modules';

const aboutData = ref({
  educationSystem: {
    title: '',
    image: '',
    content: '',
    features: [],
    ctaText: ''
  },
  visionMission: {
    values: []
  },
  students: {
    title: '',
    studentsList: []
  },
  testimonials: {
    title: '',
    testimonialsList: []
  }
});

// Gán các module đã import để Swiper sử dụng
const modules = [Pagination, Autoplay];

// Fetch data từ file public/data.json
onMounted(async () => {
  try {
    const response = await fetch('/data.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    aboutData.value = data.aboutPage;
  } catch (error) {
    console.error('Không thể tải file data.json:', error);
  }
});
</script>

<style scoped>
.about-section {
  padding: 60px 0;
  background-color: #f9f9f9;
}

.section-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 32px;
  color: #24478f;
}

.highlight {
  color: #ff6b00;
}

.about-content {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 50px;
}

.about-image {
  width: 45%;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.text-content {
  width: 55%;
}

.info-box h3 {
  font-size: 20px;
  margin-bottom: 20px;
  color: #24478f;
  line-height: 1.5;
}

.feature-list {
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
}

.feature-list li {
  padding: 10px 0 10px 30px;
  position: relative;
  line-height: 1.6;
}

.feature-list li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #ff6b00;
  font-weight: bold;
}

.cta-text {
  font-weight: bold;
  color: #24478f;
  margin-top: 20px;
  font-size: 18px;
}

/* Tầm nhìn, Sứ mệnh, Giá trị cốt lõi */
.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
}

.value-card {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-10px);
}

.icon-container {
  width: 80px;
  height: 80px;
  background-color: #f0f7ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.value-icon {
  font-size: 32px;
  color: #24478f;
}

.value-card h3 {
  color: #24478f;
  margin-bottom: 15px;
  font-size: 22px;
}

.value-card p {
  color: #555;
  line-height: 1.6;
}

.core-values {
  text-align: left;
  padding-left: 20px;
}

.core-values li {
  margin-bottom: 10px;
  color: #555;
  line-height: 1.6;
}

/* Học viên xuất sắc và Phản hồi phụ huynh */
.students-section,
.testimonials-section {
  margin: 50px auto;
}

.swiper-container {
  padding-bottom: 40px;
}

.swiper-pagination {
  bottom: 0 !important;
}

.student-card,
.testimonial-card {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.student-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.student-info,
.testimonial-info {
  padding: 20px;
  background-color: #24478f;
  text-align: center;
  color: white;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.achievement,
.experience {
  display: inline-block;
  background-color: white;
  color: #24478f;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 10px;
  font-weight: bold;
}

.student-info h3,
.testimonial-info h3 {
  margin: 0;
  color: white;
  font-size: 1.1rem;
}

.student-info p,
.testimonial-info p {
  margin: 5px 0 0;
  color: white;
  font-weight: bold;
}

.parent-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.testimonial-text {
  margin-top: 15px;
  color: white;
  font-style: italic;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 992px) {
  .about-content {
    flex-direction: column-reverse;
  }
  
  .about-image, .text-content {
    width: 100%;
  }
  
  .values-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>