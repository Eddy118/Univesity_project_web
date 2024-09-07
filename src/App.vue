<template>
  <HeaderComponent />
  <SliderComponent />
  <main>
    <RouterView />
  </main>
  <FooterComponent />
</template>
<script setup lang="ts">
import HeaderComponent from '@/components/header.vue'
import FooterComponent from '@/components/Footer.vue'
import SliderComponent from '@/components/Slider.vue'
</script>
