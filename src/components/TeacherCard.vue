<template>
  <div class="teacher-card-wrapper">
    <div class="teacher-image-container">
      <img :src="`${baseUrl}${teacher.image}`" :alt="teacher.name" loading="lazy">
      <div class="overlay"></div>
      <div class="overlay-title">{{ teacher.name }}</div>
      <div class="experience-tag">
        <span>+{{ teacher.experience }}</span>
        <span>năm</span>
        <span>kinh nghiệm</span>
      </div>
      <div class="teacher-type" :class="teacher.type">
        {{ teacher.type === 'foreign' ? 'Giáo viên Quốc tế' : 'Giáo viên Việt Nam' }}
      </div>
    </div>
    <div class="teacher-info">
      <h3>{{ teacher.name }}</h3>
      <div class="badges">
        <span class="badge green">{{ teacher.type === 'foreign' ? 'International' : 'VN' }}</span>
        <span class="badge yellow">{{ teacher.qualification }}</span>
      </div>
      <p class="description">{{ teacher.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  teacher: Object
})

const baseUrl = ref(process.env.VUE_APP_BASE_URL || '')
</script>

<style scoped>
.teacher-card-wrapper {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 24px rgba(0, 61, 130, 0.12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.teacher-card-wrapper:hover {
  transform: translateY(-5px);
}

.teacher-image-container {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.teacher-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.overlay { position: absolute; inset: 0; background: rgba(0,61,130,0.0); transition: background 0.3s ease; }
.overlay-title { position: absolute; inset: auto 0 12px 0; text-align: center; color: #FFB800; font-weight: 800; opacity: 0; transition: opacity 0.3s ease; }
.teacher-card-wrapper:hover .overlay { background: rgba(0,61,130,0.8); }
.teacher-card-wrapper:hover img { transform: scale(1.08); }
.teacher-card-wrapper:hover .overlay-title { opacity: 1; }

.experience-tag {
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 12px;
  border-radius: 0 15px 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 600;
}

.teacher-type {
  position: absolute;
  top: 10px;
  left: 0;
  padding: 5px 10px;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
}

.teacher-type.foreign { background-color: var(--accent-red); }
.teacher-type.vietnamese { background-color: var(--blue-900); }

.teacher-info {
  padding: 16px;
  background-color: #F5FAFF;
  color: var(--text-dark);
  min-height: 150px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.teacher-info h3 {
  margin: 0 0 10px;
  font-size: 1.2rem;
  color: var(--blue-900);
  text-align: center;
  text-transform: uppercase;
}

.badges { display: flex; gap: 8px; justify-content: center; margin-bottom: 10px; flex-wrap: wrap; }
.badge { display: inline-block; padding: 6px 10px; border-radius: 999px; font-weight: 700; font-size: 0.8rem; }
.badge.green { background: var(--accent-green); color: #fff; }
.badge.yellow { background: var(--accent-yellow); color: #111827; }

.description {
  font-size: 0.9rem;
  color: #333;
  line-height: 1.5;
  flex-grow: 1;
  text-align: center;
}
</style>