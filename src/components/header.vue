<!-- <template>
  <header class="header">
    <div class="header-content">
      <img src="@/assets/logo.png" alt="Centered Logo" class="centered-image" />
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  background: linear-gradient(to right, #89f7fe, #66a6ff);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

.header-content {
  position: relative;
}

.centered-image {
  width: 100px; /* Adjust as needed */
  height: 100px; /* Adjust as needed */
  border-radius: 50%; /* Rounded image */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Shadow around the image */
  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
}

.centered-image:hover {
  transform: scale(1.2);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .header {
    height: 200px; /* Adjust as needed for smaller screens */
  }

  .centered-image {
    width: 100px; /* Adjust as needed for smaller screens */
    height: 100px; /* Adjust as needed for smaller screens */
  }
}
</style> -->

<template>
  <header class="header">
    <div class="container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.logo {
  width: 100px;
  height: 100px;
}
.header {
  background-color: black;
  padding: 10px 0;
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
}

.logo {
  max-height: 100px;
}

@media (max-width: 768px) {
  .container {
    justify-content: center;
  }

  .logo {
    max-height: 40px;
  }
}
</style>
