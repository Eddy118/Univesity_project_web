<template>
  <div class="container">
      <h2 class="title">Preferences    {{selectedPreferences?.length ?? 0}} / 5</h2>
      <ul class="list-container">
        <li class="list-item" :class="{ selected: isSelected(preference) }"
             @click="toggleSelection(preference)"
             v-for="preference in preferences" :key="preference">
          <strong>{{preference}}</strong>
        </li>
      </ul>
    <GradientButton  :preferences="selectedPreferences" />
  </div>
</template>

<script>
import { PreferenceListing } from '../assets/preferences.js'
import GradientButton from '@/components/GradientButton.vue'
export default {
  name : 'PreferencesListing',
  components: { GradientButton },
data(){
return {
  preferences : [],
  selectedPreferences: [],

}
},
  created() {
    this.fetchPreferences()
  },
  methods:{
    async fetchPreferences(){
      try {
        this.preferences = PreferenceListing;
      } catch (error) {
        console.error('Error fetching the preferences:', error);
      }
    },

    toggleSelection(preference) {
      if (this.isSelected(preference)) {
        this.selectedPreferences = this.selectedPreferences.filter(
          (selected) => selected !== preference
        );
      } else if(this.selectedPreferences?.length < 5){
        this.selectedPreferences.push(preference);
      }
    },
    isSelected(preference) {
      return this.selectedPreferences.includes(preference);
    },
  }
}
</script>
<style scoped>

.container {
  background-color: white;
}
.title {
  margin-left: 10px;
}

.list-container {
  display: flex;
  flex-direction: row;
  list-style: none;
  flex-wrap: wrap;
}

.list-item {
  margin-left: 10px;
  border:1px #181818 solid;
  padding: 5px 10px 5px 10px;
  border-radius: 20px;
  margin-top: 5px;
}

li.selected {
  background-color: #c89666;
  color: white;
  border-color: white;
}

</style>