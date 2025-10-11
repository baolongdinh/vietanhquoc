<template>
  <div class="activities-page">
    <div class="page-header">
      <h1>Hoạt động nổi bật</h1>
      <p>Khám phá các hoạt động thú vị tại Ngoại ngữ Việt Anh Quốc</p>
    </div>
    
    <div class="activities-container">
      <div v-for="activity in activities" :key="activity.id" class="activity-card">
        <h2 class="activity-title">{{ activity.title }}</h2>
        <p class="activity-description">{{ activity.description }}</p>
        
        <div class="activity-images">
          <div class="image-gallery">
            <div v-for="(image, index) in getPaginatedImages(activity)" :key="index" class="gallery-item">
              <img 
                :src="`${baseUrl}${image}`" 
                :alt="`${activity.title} - Ảnh ${getImageIndex(activity, index) + 1}`" 
                class="activity-image"
                @click="openImageModal(activity, getImageIndex(activity, index))"
              >
              <div class="image-overlay" @click="openImageModal(activity, getImageIndex(activity, index))">
                <span class="zoom-icon">🔍</span>
              </div>
            </div>
          </div>
          
          <!-- Pagination controls -->
          <div v-if="activity.images && activity.images.length > imagesPerPage" class="pagination-controls">
            <button 
              @click="prevPage(activity.id)" 
              :disabled="activityPages[activity.id] === 1"
              class="pagination-btn"
            >
              &laquo; Trước
            </button>
            
            <span class="pagination-info">
              Trang {{ activityPages[activity.id] }} / {{ getTotalPages(activity) }}
            </span>
            
            <button 
              @click="nextPage(activity.id)" 
              :disabled="activityPages[activity.id] >= getTotalPages(activity)"
              class="pagination-btn"
            >
              Sau &raquo;
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <div v-if="showModal" class="image-modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close-button" @click="closeModal">&times;</span>
        <div class="modal-image-container">
          <img 
            v-if="selectedImage" 
            :src="`${baseUrl}${selectedImage}`" 
            :alt="selectedImageAlt" 
            class="modal-image"
          >
        </div>
        <div class="modal-navigation">
          <button 
            @click="prevImage" 
            class="nav-button prev-button" 
            :disabled="selectedImageIndex === 0"
          >
            &laquo;
          </button>
          <div class="image-counter">
            {{ selectedImageIndex + 1 }} / {{ currentActivityImages.length }}
          </div>
          <button 
            @click="nextImage" 
            class="nav-button next-button" 
            :disabled="selectedImageIndex >= currentActivityImages.length - 1"
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue'

const activities = ref([])
const baseUrl = ref(process.env.VUE_APP_BASE_URL || '')
const imagesPerPage = 8
const activityPages = reactive({})

// Modal state
const showModal = ref(false)
const selectedImage = ref(null)
const selectedImageAlt = ref('')
const selectedImageIndex = ref(0)
const currentActivity = ref(null)

const currentActivityImages = computed(() => {
  if (!currentActivity.value || !currentActivity.value.images) return []
  return currentActivity.value.images
})

// Mở modal xem ảnh phóng to
const openImageModal = (activity, imageIndex) => {
  console.log('Opening modal for image:', imageIndex, 'of activity:', activity.title)
  currentActivity.value = activity
  selectedImageIndex.value = imageIndex
  selectedImage.value = activity.images[imageIndex]
  selectedImageAlt.value = `${activity.title} - Ảnh ${imageIndex + 1}`
  showModal.value = true
  
  // Ngăn cuộn trang khi modal mở
  document.body.style.overflow = 'hidden'
  
  // Đảm bảo modal hiển thị đúng
  setTimeout(() => {
    if (!showModal.value) {
      console.log('Modal không hiển thị, thử lại')
      showModal.value = true
    }
  }, 100)
}

// Đóng modal
const closeModal = () => {
  showModal.value = false
  document.body.style.overflow = 'auto'
}

// Chuyển đến ảnh trước trong modal
const prevImage = () => {
  if (selectedImageIndex.value > 0) {
    selectedImageIndex.value--
    selectedImage.value = currentActivityImages.value[selectedImageIndex.value]
    selectedImageAlt.value = `${currentActivity.value.title} - Ảnh ${selectedImageIndex.value + 1}`
  }
}

// Chuyển đến ảnh sau trong modal
const nextImage = () => {
  if (selectedImageIndex.value < currentActivityImages.value.length - 1) {
    selectedImageIndex.value++
    selectedImage.value = currentActivityImages.value[selectedImageIndex.value]
    selectedImageAlt.value = `${currentActivity.value.title} - Ảnh ${selectedImageIndex.value + 1}`
  }
}

// Lấy ảnh theo trang
const getPaginatedImages = (activity) => {
  if (!activity.images) return []
  
  const currentPage = activityPages[activity.id] || 1
  const startIndex = (currentPage - 1) * imagesPerPage
  const endIndex = startIndex + imagesPerPage
  
  return activity.images.slice(startIndex, endIndex)
}

// Lấy index thực của ảnh
const getImageIndex = (activity, localIndex) => {
  const currentPage = activityPages[activity.id] || 1
  return (currentPage - 1) * imagesPerPage + localIndex
}

// Tính tổng số trang
const getTotalPages = (activity) => {
  if (!activity.images) return 1
  return Math.ceil(activity.images.length / imagesPerPage)
}

// Chuyển đến trang trước
const prevPage = (activityId) => {
  if (activityPages[activityId] > 1) {
    activityPages[activityId]--
  }
}

// Chuyển đến trang sau
const nextPage = (activityId) => {
  const activity = activities.value.find(a => a.id === activityId)
  if (activity && activityPages[activityId] < getTotalPages(activity)) {
    activityPages[activityId]++
  }
}

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl.value}data.json`)
    const data = await response.json()
    activities.value = data.activities || []
    
    // Khởi tạo trang đầu tiên cho mỗi hoạt động
    activities.value.forEach(activity => {
      activityPages[activity.id] = 1
    })
  } catch (error) {
    console.error('Error loading activities data:', error)
  }
})
</script>

<style scoped>
.activities-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  color: #24478f;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.page-header p {
  font-size: 1.2rem;
  color: #666;
}

.activities-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.activity-card {
  background-color: #f8f9ff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-left: 5px solid #24478f;
}

.activity-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.activity-title {
  color: #24478f;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.activity-description {
  color: #444;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.activity-images {
  margin-top: 1.5rem;
}

/* Pagination styles */
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1rem;
}

.pagination-btn {
  background-color: #24478f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #1a3366;
  transform: translateY(-2px);
}

.pagination-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 0.9rem;
  color: #666;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.gallery-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  height: 200px;
  position: relative;
  cursor: pointer;
}

.activity-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.zoom-icon {
  color: white;
  font-size: 2rem;
  transform: scale(0.8);
  transition: transform 0.3s ease;
}

.gallery-item:hover .activity-image {
  transform: scale(1.05);
}

.gallery-item:hover .image-overlay {
  opacity: 1;
}

.gallery-item:hover .zoom-icon {
  transform: scale(1);
}

/* Modal styles */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
  opacity: 1;
  visibility: visible;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  animation: zoomIn 0.3s ease;
}

@keyframes zoomIn {
  from { transform: scale(0.9); }
  to { transform: scale(1); }
}

.close-button {
  position: absolute;
  top: -40px;
  right: 0;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
  transition: transform 0.3s ease;
}

.close-button:hover {
  transform: scale(1.2);
}

.modal-image-container {
  width: 100%;
  height: calc(90vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.modal-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.modal-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  color: white;
}

.nav-button {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-button:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.1);
}

.nav-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.image-counter {
  font-size: 1rem;
}

/* Responsive styles */
@media (max-width: 768px) {
  .activities-page {
    padding: 1.5rem;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .activity-title {
    font-size: 1.5rem;
  }
  
  .image-gallery {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .gallery-item {
    height: 150px;
  }
  
  .modal-content {
    width: 95%;
  }
}

@media (max-width: 480px) {
  .activities-page {
    padding: 1rem;
  }
  
  .page-header {
    margin-bottom: 2rem;
  }
  
  .page-header h1 {
    font-size: 1.8rem;
  }
  
  .activity-card {
    padding: 1.5rem;
  }
  
  .image-gallery {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  }
  
  .gallery-item {
    height: 130px;
  }
  
  .zoom-icon {
    font-size: 1.5rem;
  }
  
  .nav-button {
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
  }
}
</style>