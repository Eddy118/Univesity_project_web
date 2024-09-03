<template>
  <div class="search-container">
    <input
      type="text"
      v-model="query"
      @input="handleInput"
      placeholder="Search tags"
      class="search-input"
    />
<!--    <button @click="performSearch" class="search-button">Search</button>-->
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      query: '',
    };
  },
  methods: {
    handleInput() {
      // Emit an event with the search query to the parent component
      this.$emit('update:searchQuery', this.query);
    },
    performSearch() {
      // Perform the search action (e.g., emit an event or call an API)
      this.$emit('search', this.query);
    },
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  width: 100vw;
  justify-content: center;
  margin-top: 10px;

}

.search-input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
  border-radius: 20px;
}

.search-button {
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #0056b3;
}
</style>
