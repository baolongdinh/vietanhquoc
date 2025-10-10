<template>
  <footer id="footer">
    <div class="footer-content">
      <p><strong>Địa chỉ:</strong> {{ footer.address }}</p>
      <p><strong>Hotline:</strong> {{ footer.phone }} | <strong>Email:</strong> {{ footer.email }}</p>
      <div class="socials">
        <a :href="footer.socials.facebook" target="_blank">Facebook</a>
        <a :href="footer.socials.zalo" target="_blank">Zalo</a>
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