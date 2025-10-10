<template>
  <div class="course-card">
    <div class="course-image" v-if="course.image">
      <img :src="course.image" :alt="course.name">
      <div class="age-range">{{ course.age_range }}</div>
    </div>
    <div class="course-content">
      <h3 class="level">{{ course.level }}</h3>
      <p class="name"><strong>{{ course.name }}</strong></p>
      <p class="hours">{{ course.hours }} giờ học</p>
      <p class="desc">{{ course.desc }}</p>
      <div class="features" v-if="course.features">
        <h4>Nội dung khóa học:</h4>
        <ul>
          <li v-for="(feature, index) in course.features" :key="index">{{ feature }}</li>
        </ul>
      </div>
      <div class="course-footer">
        <router-link :to="'/courses/' + course.id" class="view-more">Xem chi tiết</router-link>
        <p class="price" v-if="course.price">{{ new Intl.NumberFormat('vi-VN').format(course.price) }} VND</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  course: Object
})
</script>

<style scoped>
.course-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.course-card:hover {
  transform: translateY(-5px);
}

.course-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.course-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.age-range {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #e74c3c;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
}

.course-content {
  padding: 20px;
}

.level {
  color: #3498db;
  margin: 0 0 10px;
  font-size: 1.1rem;
}

.name {
  font-size: 1.3rem;
  margin: 0 0 10px;
  color: #333;
}

.hours {
  color: #666;
  margin: 0 0 10px;
  font-size: 0.9rem;
}

.desc {
  color: #777;
  margin: 0 0 15px;
  line-height: 1.5;
}

.features {
  margin-top: 15px;
}

.features h4 {
  margin: 0 0 10px;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  min-height: 40px;
}

.price {
  color: #e74c3c;
  font-weight: 700;
  font-size: 1.1rem;
  margin: 0;
}

.features ul {
  padding-left: 20px;
  margin: 0;
}

.features li {
  margin-bottom: 5px;
  color: #555;
  font-size: 0.9rem;
}

.view-more {
  display: inline-block;
  padding: 8px 15px;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: background 0.3s;
  width: 100px;
  text-align: center;
}

.view-more:hover {
  background: #2980b9;
}
</style>