<!--<script setup lang="ts">-->
<!--import HeaderComponent from '@/components/header.vue';-->
<!--import PreferencesListing from '@/components/preferencesListing.vue'-->

<!--</script>-->

<!--<template>-->
<!--  <div id="app">-->
<!--    <HeaderComponent />-->
<!--    <PreferencesListing />-->
<!--    <main>-->

<!--    </main>-->
<!--  </div>-->

<!--</template>-->

<!--<style scoped>-->

<!--</style>-->

<template>
  <HeaderComponent />
  <SliderComponent />
  <!--  <nav>-->
  <!--    <RouterLink to="/">Go to Home</RouterLink>-->
  <!--    <RouterLink to="/about">Go to About</RouterLink>-->
  <!--  </nav>-->
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
