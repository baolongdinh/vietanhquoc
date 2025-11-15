import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import TeachersPage from '../views/TeachersPage.vue'
import CoursesPage from '../views/CoursesPage.vue'
import CourseDetailPage from '../views/CourseDetailPage.vue'
import AboutPage from '../views/AboutPage.vue'
import ActivitiesPage from '../views/ActivitiesPage.vue'
import NewsPage from '../views/NewsPage.vue'
import GalleryPage from '../views/GalleryPage.vue'
import AboutUsPage from '../views/AboutUsPage.vue'
import ContactPage from '../views/ContactPage.vue'
import SchedulePage from '../views/SchedulePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/teachers',
    name: 'Teachers',
    component: TeachersPage
  },
  {
    path: '/courses',
    name: 'Courses',
    component: CoursesPage
  },
  {
    path: '/courses/:id',
    name: 'CourseDetail',
    component: CourseDetailPage
  },
  {
    path: '/activities',
    name: 'Activities',
    component: ActivitiesPage
  },
  {
    path: '/news',
    name: 'News',
    component: NewsPage
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: GalleryPage
  },
  {
    path: '/about-us',
    name: 'AboutUs',
    component: AboutUsPage
  }
  ,{
    path: '/contact',
    name: 'Contact',
    component: ContactPage
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: SchedulePage
  }
]

let APP_DATA = null
let loadPromise = null
const loadData = async () => {
  if (APP_DATA) return APP_DATA
  if (!loadPromise) {
    const base = process.env.VUE_APP_BASE_URL || '/'
    loadPromise = fetch(`${base}data.json`)
      .then(r => r.json())
      .then(d => { APP_DATA = d; if (typeof window !== 'undefined') window.APP_DATA = d; return d })
      .catch(e => { loadPromise = null; throw e })
  }
  return loadPromise
}

const router = createRouter({
  history: createWebHashHistory(process.env.VUE_APP_BASE_URL || '/'),
  routes,
  scrollBehavior() {
    // Luôn cuộn lên đầu trang khi chuyển trang
    return { top: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  try {
    await loadData()
  } catch (e) {
    console.error('Preload data failed:', e)
  }
  next()
})

export default router