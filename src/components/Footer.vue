<template>
  <footer id="footer">
    <div class="footer-content">
      <div class="footer-columns">
        <!-- Cột 1: Thông tin công ty -->
        <div class="footer-column company-info">
          <h3>{{ footer.company.name_vi }}</h3>
          <p>{{ footer.company.name_en }}</p>
          <p>Giấy phép ĐKKD số 3702559981. Cấp ngày 08/05/2017 bởi Sở Kế Hoạch Đầu Tư TP Hồ Chí Minh.</p>
        </div>

        <!-- Cột 2: Thông tin liên hệ -->
        <div class="footer-column contact-info">
          <h3>Thông tin liên hệ:</h3>
          <p><strong>Địa chỉ:</strong> {{ footer.address }}</p>
          <p><strong>Hotline:</strong> {{ footer.phone }}</p>
          <p><strong>Email:</strong> {{ footer.email }}</p>
        </div>
        
      </div>

        <p class="copyright">{{ footer.copyright }}</p>

    </div>
  </footer>
</template>

<script setup>
defineProps({
  footer: Object
})
</script>

<style scoped>
#footer {
  background-color: var(--primary-blue);
  color: white;
  padding: 2rem 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-columns {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.footer-column {
  flex: 1;
  min-width: 250px;
  padding: 0 15px;
  margin-bottom: 1rem;
}

.company-info h3,
.contact-info h3,
.follow-us h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  position: relative;
}

.company-info p,
.contact-info p {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.socials {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.socials a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid white;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.socials a:hover {
  background-color: white;
  color: var(--primary-blue);
}

.social-icons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  color: var(--primary-blue);
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.copyright-bar {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
  text-align: center;
}

.copyright {
  font-size: 0.9rem;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .footer-columns {
    flex-direction: column;
  }
  
  .footer-column {
    width: 100%;
    margin-bottom: 2rem;
  }
}
</style>