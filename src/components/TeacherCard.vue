<template>
  <div class="teacher-card-wrapper">
    <div class="teacher-image-container">
      <img :src="`${baseUrl}${teacher.image}`" :alt="teacher.name">
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
      <p class="qualification">{{ teacher.qualification }}</p>
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
  background: #0a4d8c;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
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
}

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

.teacher-type.foreign {
  background-color: #e74c3c;
}

.teacher-type.vietnamese {
  background-color: #3498db;
}

.teacher-info {
  padding: 15px;
  background-color: #0a4d8c;
  color: white;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.teacher-info h3 {
  margin: 0 0 10px;
  font-size: 1.2rem;
  color: white;
  text-align: center;
  text-transform: uppercase;
}

.qualification {
  color: #f8f8f8;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  font-size: 0.9rem;
}

.description {
  font-size: 0.9rem;
  color: #ffffff;
  line-height: 1.5;
  flex-grow: 1;
  text-align: center;
}
</style>