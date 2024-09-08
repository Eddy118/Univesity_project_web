<template>
  <div class="btn-container">
    <button @click="goBack" class="gradient-button">Continue</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'GradientButton',
  props: {
    preferences: {
      type: Array
    }
  },
  setup(props) {
    const router = useRouter()
    const goBack = () => {
      router.push({
        name: 'About',
        query: { data: JSON.stringify(props?.preferences || []) }
      })
    }
    return { goBack }
  }
}
</script>

<style scoped>
.btn-container {
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.gradient-button {
  /* background: linear-gradient(to right, #89f7fe, #66a6ff); */
  background-color: black;
  border: none;
  color: white;
  padding: 10px 50px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  transition: background 0.3s ease-in-out;
  align-self: center;
}

.gradient-button:hover {
  //background: linear-gradient(to right, #66a6ff, #89f7fe);
  background: #c89666;
}
</style>
