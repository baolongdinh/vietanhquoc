<template>
  <div class="about-page">
    <section class="hero">
      <div class="decor-shapes"></div>
      <div class="hero-inner fade-up">
        <h1>Giới thiệu</h1>
        <p>Hệ thống giáo dục chất lượng, lấy học viên làm trung tâm.</p>
        <div class="badges">
          <span v-for="(v, i) in aboutPage.missionVision.coreValues" :key="i" :class="['badge', accent(i)]">{{ v }}</span>
        </div>
      </div>
      <svg class="wave" viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,64 C240,128 480,0 720,64 C960,128 1200,16 1440,64 L1440,120 L0,120 Z" fill="#ffffff"/></svg>
    </section>

    <section class="section container">
      <h2 class="section-title">{{ aboutPage.introduction.title }}</h2>
      <ul class="timeline">
        <li v-for="(paragraph, index) in aboutPage.introduction.content" :key="index" class="timeline-item fade-up">
          <span class="dot"></span>
          <div class="timeline-card">
            <p>{{ paragraph }}</p>
          </div>
        </li>
      </ul>
    </section>

    <section class="section section-muted">
      <div class="container">
        <h2 class="section-title">{{ aboutPage.missionVision.title }}</h2>
        <div class="mv-grid">
          <div class="mv-card fade-up">
            <h3>Sứ mệnh</h3>
            <p>{{ aboutPage.missionVision.mission }}</p>
          </div>
          <div class="mv-card fade-up">
            <h3>Tầm nhìn</h3>
            <p>{{ aboutPage.missionVision.vision }}</p>
          </div>
          <div class="mv-card fade-up">
            <h3>Giá trị cốt lõi</h3>
            <ul class="core-values-list">
              <li v-for="(v, i) in aboutPage.missionVision.coreValues" :key="i">{{ v }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section container">
      <div class="split">
        <div class="split-text fade-up">
          <h2 class="section-title">{{ aboutPage.faculty.title }}</h2>
          <p>{{ aboutPage.faculty.description }}</p>
        </div>
        <div class="split-image fade-up">
          <div class="frame">
            <img :src="`${baseUrl}images/teacher/giang-vien.png`" alt="Teacher" />
          </div>
        </div>
      </div>
    </section>

    <section class="section section-muted">
      <div class="container">
        <h2 class="section-title">{{ aboutPage.facilities.title }}</h2>
        <p class="section-desc">{{ aboutPage.facilities.description }}</p>
        <div class="gallery">
          <img v-for="(img, idx) in aboutPage.facilities.images" :key="idx" :src="`${baseUrl}${img}`" alt="Facility" class="gallery-item fade-up" />
        </div>
      </div>
    </section>

    <section class="section achievements">
      <div class="container">
        <h2 class="section-title">Thành tựu & Giải thưởng</h2>
        <div class="stats-grid">
          <div class="stat-card fade-up">
            <div class="stat-icon yellow"></div>
            <div class="stat-number" data-target="5000">0</div>
            <div class="stat-label">Học viên tốt nghiệp</div>
          </div>
          <div class="stat-card fade-up">
            <div class="stat-icon red"></div>
            <div class="stat-number" data-target="120">0</div>
            <div class="stat-label">Giải thưởng & chứng nhận</div>
          </div>
          <div class="stat-card fade-up">
            <div class="stat-icon yellow"></div>
            <div class="stat-number" data-target="98">0</div>
            <div class="stat-label">Tỉ lệ đạt chứng chỉ</div>
          </div>
        </div>
      </div>
    </section>

      <section class="section container">
      <div class="quote fade-up">
        <h2 class="section-title">{{ aboutPage.philosophy.title }}</h2>
        <p class="quote-text">“{{ aboutPage.philosophy.content }}”</p>
      </div>
    </section>

  </div>
 </template>

<script setup>
import { ref, onMounted } from 'vue'

const baseUrl = process.env.VUE_APP_BASE_URL || '/'
const aboutPage = ref({
  introduction: { title: '', content: [] },
  missionVision: { title: '', mission: '', vision: '', coreValues: [] },
  faculty: { title: '', description: '' },
  facilities: { title: '', description: '', images: [] },
  philosophy: { title: '', content: '' },
})

onMounted(async () => {
  try {
    const g = typeof window !== 'undefined' ? window.APP_DATA : null
    if (g && g.aboutPage) {
      aboutPage.value = g.aboutPage
    } else {
      const base = process.env.VUE_APP_BASE_URL || '/'
      const response = await fetch(`${base}data.json`)
      if (!response.ok) throw new Error('Network response was not ok')
      const data = await response.json()
      aboutPage.value = data.aboutPage || aboutPage.value
    }
  } catch (error) {
    console.error('Không thể tải file data.json:', error)
  }

  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-target') || '0')
    let current = 0
    const step = Math.max(1, Math.floor(target / 60))
    const tick = () => {
      current = Math.min(target, current + step)
      el.textContent = current.toString()
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

const accent = (i) => ['red', 'yellow', 'green'][i % 3]
</script>

<style scoped>
.about-page {
  background: #ffffff;
}

.hero {
  position: relative;
  background: linear-gradient(45deg, var(--blue-900) 0%, var(--blue-accent) 100%);
  padding: 100px 20px 60px;
  text-align: center;
  overflow: hidden;
}

.hero-inner h1 {
  font-size: 3.2rem;
  color: #ffffff;
}

.hero-inner p {
  color: #FFDD80;
  margin-top: 10px;
}

.decor-shapes {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(rgba(255, 184, 0, 0.2) 2px, transparent 2px),
    radial-gradient(rgba(255, 184, 0, 0.1) 2px, transparent 2px);
  background-size: 40px 40px, 80px 80px;
  background-position: 0 0, 20px 20px;
  pointer-events: none;
}

.wave {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
}

.badges {
  margin-top: 16px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.badge {
  display: inline-block;
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 0.9rem;
  background: #fff;
  border: 1px solid var(--blue-100);
  box-shadow: 0 6px 12px rgba(2, 132, 199, 0.08);
}

.badge.red { border-color: rgba(239, 68, 68, 0.3); color: var(--accent-red); }
.badge.yellow { border-color: rgba(245, 158, 11, 0.3); color: var(--accent-yellow); }
.badge.green { border-color: rgba(16, 185, 129, 0.3); color: #10b981; }

.section {
  padding: 60px 20px;
}

.section-muted {
  background:
    radial-gradient(circle at 20px 20px, rgba(0, 61, 130, 0.04) 2px, transparent 2px) 0 0/40px 40px,
    linear-gradient(180deg, var(--blue-50), #ffffff);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.2rem;
  color: var(--blue-700);
  text-align: center;
  margin-bottom: 30px;
}

.timeline {
  position: relative;
  padding-left: 24px;
}

.timeline:before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  transform: translateX(-2px);
  background: var(--blue-900);
}

.timeline-item {
  position: relative;
  width: calc(50% - 20px);
  margin-bottom: 24px;
}
.timeline-item:nth-child(odd) { margin-right: auto; padding-right: 24px; }
.timeline-item:nth-child(even) { margin-left: auto; padding-left: 24px; }

.timeline-item .dot {
  position: absolute;
  top: 8px;
  left: 100%;
  transform: translateX(-50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #ffffff;
  font-weight: 700;
}
.timeline-item:nth-child(odd) .dot { background: var(--accent-yellow); }
.timeline-item:nth-child(even) .dot { background: var(--accent-red); }
.timeline-item .dot::before { content: "✓"; }

.timeline-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 61, 130, 0.12);
  padding: 16px 20px;
  border-left: 8px solid var(--accent-yellow);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.timeline-item:nth-child(even) .timeline-card { border-left-color: var(--accent-red); }
.timeline-card:hover { transform: translateY(-6px); box-shadow: 0 12px 28px rgba(0, 61, 130, 0.2); }

.timeline-card p,
.mv-card p,
.split-text p,
.section-desc {
  font-size: 1.15rem;
  line-height: 1.8;
}

.mv-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.mv-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 61, 130, 0.1);
  padding: 24px;
  border-top: 4px solid var(--blue-900);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.mv-card:nth-child(2) { border-top-color: var(--accent-yellow); }
.mv-card:nth-child(3) { border-top-color: var(--accent-red); }
.mv-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0, 61, 130, 0.15); }

.mv-icon {
  height: 48px;
  margin-bottom: 10px;
}

.mv-icon img {
  height: 100%;
}

.core-values-list {
  margin: 0;
  padding-left: 20px;
  font-size: 1.15rem;
  line-height: 1.8;
}
.core-values-list li { margin-bottom: 8px; }

.split {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 24px;
  align-items: center;
}

.split-image img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(11, 42, 111, 0.12);
}
.frame { background: linear-gradient(135deg, var(--blue-900), var(--blue-100)); padding: 6px; border-radius: 14px; }

.section-desc {
  text-align: center;
  color: var(--text-dark);
  margin-bottom: 20px;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.gallery-item {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(11, 42, 111, 0.1);
}

.quote {
  text-align: center;
}

.quote-text {
  font-size: 1.4rem;
  color: var(--text-dark);
}

.cta {
  background: #ffffff;
  padding: 40px 20px;
}

.cta-inner {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  background: linear-gradient(135deg, var(--blue-50), #fff);
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 61, 130, 0.12);
  padding: 24px;
}

.achievements {
  background: #002855;
  color: #ffffff;
}
.achievements .section-title { color: #ffffff; }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.stat-card {
  background: rgba(255,255,255,0.06);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
}

.stat-icon { width: 56px; height: 56px; border-radius: 50%; margin: 0 auto 12px; background: linear-gradient(135deg, var(--blue-500), var(--blue-accent)); }
.stat-icon.yellow { background: linear-gradient(135deg, #FFD54F, var(--accent-yellow)); }
.stat-icon.red { background: linear-gradient(135deg, #ff6b6b, var(--accent-red)); }

.stat-number { font-size: 2.4rem; font-weight: 800; background: linear-gradient(90deg, #ffffff, #cfe8ff); -webkit-background-clip: text; background-clip: text; color: transparent; }
.stat-label { opacity: 0.9; }

.btn {
  display: inline-block;
  padding: 10px 16px;
  border-radius: 10px;
  text-decoration: none;
}

.btn-primary {
  background: var(--blue-500);
  color: #fff;
}

.notice {
  background: var(--blue-25);
  padding: 40px 20px;
}

.notice-inner {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 16px;
  align-items: start;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(11, 42, 111, 0.12);
  padding: 20px;
  border-left: 6px solid var(--blue-600);
}

.notice-inner.warning {
  border-left-color: var(--yellow-500);
}

.dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--blue-600);
}

.warning .dot {
  background: var(--yellow-500);
}

.fade-up {
  animation: fadeUp 0.6s ease both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .hero-inner h1 { font-size: 2.4rem; }
  .section { padding: 40px 16px; }
  .split { grid-template-columns: 1fr; }
  .section-title { font-size: 1.8rem; }
  .timeline-card p,
  .mv-card p,
  .split-text p { font-size: 1.05rem; }
  .quote-text { font-size: 1.2rem; }
}
</style>