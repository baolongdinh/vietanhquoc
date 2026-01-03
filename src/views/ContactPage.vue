<template>
  <div class="contact-page">
    <section class="hero">
      <div class="decor-shapes"></div>
      <div class="hero-inner reveal">
        <h1>Liên hệ Trung Tâm Anh Ngữ Việt Anh Quốc</h1>
        <p class="subtitle">Thông tin liên hệ và vị trí bản đồ</p>
      </div>
      <svg class="wave" viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,64 C240,128 480,0 720,64 C960,128 1200,16 1440,64 L1440,120 L0,120 Z" fill="#ffffff"/></svg>
    </section>
    <div class="container">
      <div class="page-header reveal">
        <h1>Liên hệ</h1>
        <p class="subtitle">Thông tin liên hệ và vị trí bản đồ</p>
      </div>
      <div class="grid">
        <div class="info-boxes reveal">
          <div class="info-box">
            <div class="icon-circle"><span class="i">☎</span></div>
            <div>
              <h3>Hotline</h3>
              <p>0837968338</p>
            </div>
          </div>
          <div class="info-box">
            <div class="icon-circle"><span class="i">✉</span></div>
            <div>
              <h3>Email</h3>
              <p>vietanhquoc69@gmail.com</p>
            </div>
          </div>
          <div class="info-box">
            <div class="icon-circle"><span class="i">📍</span></div>
            <div>
              <h3>Địa chỉ</h3>
              <p>Lô E2-12, Đường C, Dự án phát triển Đông A, Đường Trần Thị Vững, Phường Dĩ An, Thành phố Hồ Chí Minh</p>
            </div>
          </div>
        </div>
        <div class="map-box reveal">
          <iframe
            src="https://www.google.com/maps?q=E2-12%2C%20%C4%90%C6%A1%CC%80NG%20C%2C%20KDC%20HIM%20LAM%20PH%C3%9A%20%C4%90%C3%94NG%2C%20PH%C6%B0%E1%BB%9Dng%20An%20B%C3%ACnh%2C%20TP.%20D%C4%A9%20An%2C%20B%C3%ACnh%20D%C6%B0%C6%A1ng&hl=vi&z=17&output=embed"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.contact-page { background: #ffffff; }
.hero { position: relative; background: linear-gradient(45deg, var(--blue-900) 0%, var(--blue-accent) 100%); padding: 80px 20px; text-align: center; overflow: hidden; display: flex; align-items: center; justify-content: center; min-height: 300px; }
.hero-inner { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.8rem; max-width: 900px; }
.hero-inner h1 { font-size: 3.8rem; color: #fff; margin: 0; }
.hero .subtitle { color: #FFDD80; margin: 0; font-size: 1.1rem; }
.decor-shapes { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,184,0,0.2) 2px, transparent 2px), radial-gradient(rgba(255,184,0,0.1) 2px, transparent 2px); background-size: 40px 40px, 80px 80px; background-position: 0 0, 20px 20px; pointer-events: none; }
.wave { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 80px; }
.page-header { display: none; }
.contact-page .container { padding: 40px 20px; }
.contact-page { padding-bottom: 60px; }
.page-header h1 { color: var(--blue-700); font-size: 2.4rem; }
.subtitle { color: var(--text-dark); }
.page-header { text-align: center; margin-bottom: 30px; }
.page-header h1 { color: var(--blue-700); font-size: 2.4rem; }
.subtitle { color: var(--text-dark); }

.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

.contact-form { background: #F8FBFF; border-radius: 12px; box-shadow: 0 10px 20px rgba(0,61,130,0.12); padding: 24px; }
.form-group { margin-bottom: 16px; }
label { display: block; font-weight: 700; color: var(--blue-900); margin-bottom: 6px; }
.input-with-icon { position: relative; }
.input-with-icon .fi { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--blue-900); }
.input-with-icon input { padding-left: 36px; }
input, textarea { width: 100%; padding: 10px 12px; border-radius: 8px; border: 2px solid #E0E0E0; outline: none; background: #fff; }
input:focus, textarea:focus { border-color: var(--blue-900); box-shadow: 0 0 0 4px rgba(0,61,130,0.15); }

.info-boxes { display: grid; gap: 12px; }
.info-box { display: grid; grid-template-columns: 56px 1fr; gap: 12px; align-items: center; background: #fff; border-radius: 12px; box-shadow: 0 10px 20px rgba(0,61,130,0.12); padding: 16px; }
.info-box h3 { margin: 0; color: var(--blue-700); }
.icon-circle { width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center; background: linear-gradient(135deg, var(--blue-900), var(--blue-500)); color: #fff; }
.icon-circle .i { font-size: 1.4rem; }
.info-box:hover .icon-circle { transform: rotate(360deg); transition: transform 0.6s ease; }

.map-box { background: #fff; border-radius: 12px; box-shadow: 0 10px 20px rgba(0,61,130,0.12); overflow: hidden; }
.map-box iframe { border: 0; width: 100%; height: 100%; min-height: 420px; }

@media (max-width: 768px) {
  .grid { grid-template-columns: 1fr; }
  
  .hero-inner h1 {
    font-size: 2.2rem;
  }
  
  .hero .subtitle {
    font-size: 0.95rem;
  }
}

.submit-btn { background: linear-gradient(90deg, var(--blue-900), var(--blue-500)); color: #fff; }
.submit-btn:hover { background: linear-gradient(90deg, var(--blue-500), var(--blue-900)); transform: scale(1.05); }
</style>