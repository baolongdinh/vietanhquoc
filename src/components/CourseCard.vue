<template>
  <div class="course-card reveal" :class="levelClass">
    <div class="course-badge-pulse">Khóa học</div>
    <div class="course-image" v-if="course.image">
      <img :src="`${baseUrl}${course.image}`" :alt="course.name" loading="lazy">
      <div class="age-range">🎯 {{ course.age_range }}</div>
      <span v-if="categoryLabel !== 'Khóa học'" class="category-badge" :class="categoryClass">{{ categoryLabel }}</span>
    </div>
    <div class="course-content">
      <span class="level-badge" :class="levelClass">{{ course.level }}</span>
      <h3 class="name">{{ course.name }}</h3>
      <div class="course-meta">
        <span class="meta-item">🕐 {{ course.hours }} giờ học</span>
        <span class="meta-item">📚 {{ course.sessions || Math.ceil(course.hours/2) }} buổi</span>
      </div>
      <p class="desc">{{ course.desc }}</p>
      <div class="course-footer">
        <router-link :to="'/courses/' + course.id" class="btn course-cta">Xem chi tiết</router-link>
        <span class="price-tag" v-if="course.price">{{ new Intl.NumberFormat('vi-VN').format(course.price) }} VND</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  course: Object
})

const baseUrl = ref(process.env.VUE_APP_BASE_URL || '')

const levelClass = computed(() => {
  const lvl = (typeof props.course?.level === 'string' ? props.course.level.toLowerCase() : '')
  if (lvl.includes('pre') || lvl.includes('a1') || lvl.includes('beginner')) return 'lvl-green'
  if (lvl.includes('a2') || lvl.includes('ket') || lvl.includes('intermediate')) return 'lvl-yellow'
  if (lvl.includes('b1') || lvl.includes('pet') || lvl.includes('advanced')) return 'lvl-red'
  if (lvl.includes('professional')) return 'lvl-blue'
  return 'lvl-blue'
})

const categoryLabel = computed(() => {
  const ar = (typeof props.course?.age_range === 'string' ? props.course.age_range : '')
  if (ar.includes('4-') || ar.includes('6-') || ar.includes('Trẻ')) return 'Thiếu nhi'
  if (ar.includes('11-')) return 'Thiếu niên'
  if (ar.includes('15') || ar.includes('Người')) return 'Người lớn'
  return 'Khóa học'
})

const categoryClass = computed(() => {
  const label = categoryLabel.value.toLowerCase()
  if (label.includes('thiếu nhi')) return 'cat-yellow'
  if (label.includes('thiếu niên')) return 'cat-red'
  if (label.includes('người lớn')) return 'cat-green'
  return 'cat-blue'
})
</script>

<style scoped>
.course-card {
  position: relative;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(11, 42, 111, 0.12);
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-left: 8px solid;
}

.course-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,61,130,0.15);
}

.course-image {
  position: relative;
  height: 180px; /* Giảm chiều cao ảnh */
  overflow: hidden;
}

.course-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.course-card:hover .course-image img { transform: scale(1.1); }

.age-range {
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: var(--accent-red);
  color: white;
  padding: 6px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: bold;
}

.category-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 6px 10px;
  border-radius: 999px;
  color: #111827;
  font-weight: 800;
  background: var(--accent-yellow);
}
.category-badge.cat-red { background: var(--accent-red); color: #fff; }
.category-badge.cat-green { background: var(--accent-green); color: #fff; }
.category-badge.cat-blue { background: var(--blue-500); color: #fff; }

.course-content {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: white;
}

.level-badge {
  display: inline-block;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 6px;
}
.level-badge.lvl-blue { background: var(--blue-600); color: #fff; }
.level-badge.lvl-green { background: var(--accent-green); color: #fff; }
.level-badge.lvl-yellow { background: var(--accent-yellow); color: #111827; }
.level-badge.lvl-red { background: var(--accent-red); color: #fff; }

.name {
  font-size: 20px;
  color: #003D82;
  margin-bottom: 12px;
  line-height: 1.3;
  font-weight: 700;
}

.course-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.meta-item {
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
}

.desc {
  color: #555;
  line-height: 1.5;
  margin-bottom: 16px;
  flex-grow: 1;
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.course-footer {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* layout fixes for large screens */
.course-footer { flex-wrap: wrap; gap: 8px 12px; }
.course-cta { flex-shrink: 0; }
.price-tag { white-space: nowrap; margin-left: auto; }

.btn { font-size: 0.9rem; }

.price-tag {
  font-size: 18px;
  color: #E63946;
  font-weight: 800;
}

.course-cta { 
  background: #FFB800; 
  color: #111827; 
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}
.course-cta:hover { 
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(255,184,0,0.3);
}

/* Level-based gradient backgrounds and border colors */
.course-card.lvl-green {
  background: linear-gradient(135deg, #E8F5E9 0%, #FFFFFF 100%);
  border-left-color: #4CAF50;
}

.course-card.lvl-yellow {
  background: linear-gradient(135deg, #FFF9E6 0%, #FFFFFF 100%);
  border-left-color: #FFB800;
}

.course-card.lvl-red {
  background: linear-gradient(135deg, #FFEBEE 0%, #FFFFFF 100%);
  border-left-color: #E63946;
}

.course-card.lvl-blue {
  background: linear-gradient(135deg, #E8F4FA 0%, #FFFFFF 100%);
  border-left-color: #003D82;
}

/* Course badge animation */
.course-badge-pulse {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #FFB800;
  color: #111827;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  z-index: 2;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@media (max-width: 768px) {
  .course-image {
    height: 140px;
  }
  
  .course-content {
    padding: 8px;
  }
  
  .name {
    font-size: 1rem;
  }
  
  .course-footer {
    flex-direction: column;
    gap: 6px;
    align-items: flex-start;
  }

  .course-cta {
    padding: 8px 14px;
    font-size: 0.85rem;
  }

  .price-tag {
    font-size: 18px;
  }
}
</style>