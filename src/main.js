import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css' 

const app = createApp(App)
  .use(router)
  .mount('#app')

const setupReveal = () => {
  if (typeof IntersectionObserver === 'undefined') return
  const els = document.querySelectorAll('.reveal:not(.in-view)')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })
  els.forEach(el => observer.observe(el))
}

window.requestAnimationFrame(setupReveal)
router.afterEach(() => window.requestAnimationFrame(setupReveal))
