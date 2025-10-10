// src/components/TeachersSection.vue

<template>
  <section id="teachers" class="teachers-section container">
    <h2 class="section-title">ĐỘI NGŨ GIÁO VIÊN TIÊU BIỂU</h2>
    
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
      <swiper-slide v-for="(teacher, i) in teachers" :key="i">
        <TeacherCard :teacher="teacher" />
      </swiper-slide>
    </swiper>
  </section>
</template>

<script setup>
import { defineProps } from 'vue';
import TeacherCard from './TeacherCard.vue';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Import required modules
import { Pagination, Autoplay } from 'swiper/modules';

defineProps({
  teachers: Array
});

// Gán các module đã import để Swiper sử dụng
const modules = [Pagination, Autoplay];

</script>