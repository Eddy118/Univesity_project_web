<template>
  <div class="carousel-container">
    <div class="carousel">
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li
          v-for="(slide, index) in slides"
          :key="index"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
        ></li>
      </ol>

      <!-- Wrapper for slides -->
      <div class="carousel-inner">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="carousel-item"
          :class="{ active: currentSlide === index }"
        >
          <img :src="slide.src" :alt="slide.alt" />
        </div>
      </div>

      <!-- Left and right controls -->

      <button class="carousel-control left" @click="prevSlide">
      <span>&lt;</span>
      <span class="sr-only">Previous</span>
    </button>
      <button class="carousel-control right" @click="nextSlide">
        <span>&gt;</span>
        <span class="sr-only">Next</span>
      </button>

    </div>
  </div>
</template>

<script>
import Image1 from '@/assets/image1.jpg'
import Image2 from '@/assets/image2.jpg'
import Image3 from '@/assets/image3.jpg'

export default {
  name: 'SliderComponent',
  data() {
    return {
      slides: [
        { src: Image1, alt: 'Los Angeles' },
        { src: Image2, alt: 'Chicago' },
        { src: Image3, alt: 'New York' }
      ],
      currentSlide: 0
    }
  },
  methods: {
    goToSlide(index) {
      this.currentSlide = index
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length
    }
  }
}
</script>

<style scoped>
.carousel-container {
  width: 100%;
  margin: auto;
}

.carousel {
  position: relative;
}

.carousel-inner {
  position: relative;
  overflow: hidden;
}

.carousel-item {
  display: none;
}

.carousel-item.active {
  display: block;
}

.carousel img {
  width: 100%;
  height: 550px;
  object-fit: cover;
  object-position: 50% 50%;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
  list-style: none;
  position: absolute;
  top: 10px;
  width: 100%;
}

.carousel-indicators li {
  background-color: #fff;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  cursor: pointer;
}

.carousel-indicators li.active {
  background-color: #007bff;
}

.carousel-control {
  position: absolute;
  top: 50%;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-control.left {
  left: 10px;
}

.carousel-control.right {
  right: 10px;
}

.carousel-control span {
  font-size: 24px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
