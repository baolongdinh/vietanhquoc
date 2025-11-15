<template>
  <div class="schedule-page">
    <section class="calendar-header">
      <h1>Lịch học</h1>
    </section>

    <div class="container">
      <div class="calendar">
        <div class="calendar-row calendar-weekdays">
          <div v-for="d in ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']" :key="d" class="weekday">{{ d }}</div>
        </div>
        <div class="calendar-grid">
          <div v-for="n in 28" :key="n" :class="dayCellClass(n)">
            <div class="day-number">{{ n }}</div>
            <div class="slots">
              <div class="slot morning">Sáng</div>
              <div class="slot afternoon">Chiều</div>
              <div class="slot evening">Tối</div>
            </div>
          </div>
        </div>
      </div>

      <div class="sessions">
        <div class="session-card level-green">
          <div class="session-info">
            <h3>Tiếng Anh Mầm Non</h3>
            <p><span class="icon">🕒</span> 08:00 - 09:30 • T2, T5</p>
            <p><span class="icon">📍</span> Cơ sở Dĩ An</p>
          </div>
          <span class="status badge-green">Còn chỗ</span>
        </div>
        <div class="session-card level-yellow">
          <div class="session-info">
            <h3>Tiếng Anh Thiếu Nhi</h3>
            <p><span class="icon">🕒</span> 17:30 - 19:00 • T3, T6</p>
            <p><span class="icon">📍</span> Cơ sở Dĩ An</p>
          </div>
          <span class="status badge-yellow">Sắp đầy</span>
        </div>
        <div class="session-card level-red">
          <div class="session-info">
            <h3>Tiếng Anh Thiếu Niên (PET)</h3>
            <p><span class="icon">🕒</span> 19:00 - 20:30 • T4, T7</p>
            <p><span class="icon">📍</span> Cơ sở Dĩ An</p>
          </div>
          <span class="status badge-red">Đã đầy</span>
        </div>
      </div>
    </div>

    <button class="floating-cta">
      <span class="phone">📞</span>
      <span class="label">Gọi tư vấn</span>
    </button>
  </div>
</template>

<script setup>
const dayCellClass = (n) => {
  if (n === 1) return 'day today'
  if (n % 7 === 0) return 'day full'
  if (n % 5 === 0) return 'day selected'
  return 'day available'
}
</script>

<style scoped>
.schedule-page { background: #fff; }

.calendar-header { background: linear-gradient(90deg, var(--blue-900), var(--blue-500)); color: #fff; padding: 30px 20px; text-align: center; }

.container { max-width: 1200px; margin: 0 auto; padding: 20px; }

.calendar { background: #fff; border-radius: 12px; box-shadow: 0 10px 20px rgba(0,61,130,0.12); padding: 16px; }
.calendar-weekdays { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; margin-bottom: 8px; }
.weekday { text-align: center; font-weight: 700; color: var(--blue-900); }
.calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; }

.day { background: #fff; border-radius: 8px; border: 1px solid #e5e7eb; padding: 8px; min-height: 110px; display: flex; flex-direction: column; }
.day .day-number { font-weight: 800; color: var(--blue-900); }
.slots { margin-top: 6px; display: grid; gap: 4px; }
.slot { border-radius: 6px; padding: 4px 6px; font-size: 0.8rem; }
.slot.morning { background: #FFF9E6; }
.slot.afternoon { background: #F0F8FF; }
.slot.evening { background: #E8F0F8; }

.day.available { background: #F8FBFF; border: 1px solid var(--accent-green); }
.day.full { background: #eee; opacity: 0.5; }
.day.selected { background: var(--accent-yellow); border: 2px solid #d49d00; }
.day.today { border: 2px solid var(--accent-red); }

.sessions { margin-top: 24px; display: grid; gap: 12px; }
.session-card { display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: center; background: #fff; border-radius: 12px; box-shadow: 0 10px 20px rgba(0,61,130,0.12); padding: 16px; border-left: 6px solid var(--blue-900); }
.session-info h3 { margin: 0 0 6px; color: var(--blue-900); }
.icon { color: var(--blue-900); }

.level-green { border-left-color: var(--accent-green); }
.level-yellow { border-left-color: var(--accent-yellow); }
.level-red { border-left-color: var(--accent-red); }

.status { padding: 6px 10px; border-radius: 999px; font-weight: 800; }
.badge-green { background: var(--accent-green); color: #fff; box-shadow: 0 0 0 6px rgba(76,175,80,0.15); }
.badge-yellow { background: var(--accent-yellow); color: #111827; box-shadow: 0 0 0 6px rgba(255,184,0,0.18); }
.badge-red { background: var(--accent-red); color: #fff; box-shadow: 0 0 0 6px rgba(230,57,70,0.18); }

.floating-cta { position: fixed; right: 18px; bottom: 18px; border: none; color: #111827; background: linear-gradient(90deg, var(--accent-red), var(--accent-yellow)); padding: 10px 14px; border-radius: 999px; display: grid; grid-auto-flow: column; gap: 8px; align-items: center; box-shadow: 0 10px 24px rgba(0,0,0,0.2); cursor: pointer; animation: pulse 1.8s infinite; }
.phone { display: inline-block; animation: ring 1.2s infinite; }
@keyframes ring { 0%{ transform: rotate(0deg);} 20%{ transform: rotate(-15deg);} 40%{ transform: rotate(15deg);} 60%{ transform: rotate(-10deg);} 80%{ transform: rotate(10deg);} 100%{ transform: rotate(0deg);} }
@keyframes pulse { 0%{ box-shadow: 0 0 0 0 rgba(230,57,70,0.6);} 70%{ box-shadow: 0 0 0 12px rgba(230,57,70,0);} 100%{ box-shadow: 0 0 0 0 rgba(230,57,70,0);} }

@media (max-width: 768px) {
  .calendar-grid { grid-template-columns: repeat(4, 1fr); }
}
</style>