<!-- SkeletonLoader.vue -->
<template>
  <div class="skeleton-container">
    <div class="skeleton-item" v-for="index in 6" :key="index">
      <div class="skeleton-title"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text-short"></div>
      <div class="skeleton-topics">
        <div class="skeleton-topic" v-for="topic in 6" :key="topic"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Space between items */
  margin-top: 10px;
}
.skeleton-item {
  flex: 1 1 calc(100% - 20px); /* Two columns, considering gap */
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
}
.skeleton-title,
.skeleton-text,
.skeleton-text-short,
.skeleton-topic {
  background: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 8px;
}
.skeleton-title {
  height: 20px;
  width: 80%;
}
.skeleton-text {
  height: 14px;
  width: 100%;
}
.skeleton-text-short {
  height: 14px;
  width: 60%;
}
.skeleton-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.skeleton-topic {
  height: 16px;
  width: 60px;
}
</style>
