import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import TeachersPage from '../views/TeachersPage.vue'
import CoursesPage from '../views/CoursesPage.vue'
import CourseDetailPage from '../views/CourseDetailPage.vue'
import AboutPage from '../views/AboutPage.vue'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.VUE_APP_BASE_URL),
  routes,
  scrollBehavior() {
    // Luôn cuộn lên đầu trang khi chuyển trang
    return { top: 0 }
  }
})

export default router