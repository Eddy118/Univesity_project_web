<!-- <template>
  <Suspense>
    <template #default>
      <div>
        <SearchInput @search="handleSearch" />
        <h2 class="title">Preferred tags</h2>
        <div>
          <ul class="list-container">
            <li class="list-item" v-for="val in data" :key="val">
              <strong>{{ val }}</strong>
            </li>
          </ul>
        </div>
        <div>
          <div class="article-listing-container">
            <h2>Recommended Articles Listing</h2>
            <div>
              <div class="articles-container">
                <div
                  v-for="(article, index) in articles"
                  :key="index"
                  class="article-item"
                  @click="viewDetails(index)"
                >
                  <h2>{{ article.title }}</h2>

                  <p>{{ article.text.split(' ').splice(0, 2).join(' ') }}</p>
                  <p>{{ article.text.slice(2, 500) }}...</p>

                  <div class="topic-container">
                    <h3>Topics :</h3>
                    <ul class="list-container">
                      <li
                        class="list-item"
                        v-for="(topic, index) in article.uniqueTopics"
                        :key="index"
                      >
                        <strong>{{ topic }},</strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #fallback>
      <p>fallback</p>
    </template>
  </Suspense>
</template>

<script>
import SearchInput from '@/components/SearchInput.vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'AboutComponent',
  components: { SearchInput },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      articles: [],
      selectedArticle: null
    }
  },
  methods: {
    extractUniqueTopics(topicsArray) {
      const allTopics = topicsArray.map((obj) =>
        obj.topic.match(/"([^"]+)"/g).map((str) => str.replace(/"/g, ''))
      )
      const uniqueTopicsSet = new Set(allTopics.flat())
      return Array.from(uniqueTopicsSet)
    },
    async fetchDocuments() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/documents')
        console.log('response ========>', response)
        const articlesWithUniqueTopics = response.data?.documents.map((article) => ({
          ...article,
          uniqueTopics: this.extractUniqueTopics(article.topics)
        }))
        this.articles = articlesWithUniqueTopics
      } catch (error) {
        console.error('Error fetching documents:', error)
      }
    }
  },
  mounted() {
    this.fetchDocuments()
  },
  setup() {
    const router = useRouter()
    const viewDetails = (index) => {
      router.push({ name: 'ArticleDetails', params: { id: index } })
    }
    return { viewDetails }
  }
}
</script>

<style scoped>
.article-listing-container {
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
}
.articles-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Space between items */
  margin-top: 10px;
}
.container {
  background-color: white;
}
.title {
  margin-left: 10px;
}
.article-item {
  flex: 1 1 calc(50% - 20px); /* Two columns, considering gap */
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}
.article-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.topic-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.list-container {
  display: flex;
  flex-direction: row;
  list-style: none;
  /* flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px; */
}
.list-item {
  margin-left: 10px;
  /* border: 1px #181818 solid; */
  /* padding: 5px 10px 5px 10px; */
  /* border-radius: 20px; */
  /* margin-top: 5px; */
}
li.selected {
  background-color: lightblue;
  color: white;
  border-color: white;
}
.list-container-tag {
  display: flex;
  flex-direction: row;
  list-style: none;
  flex-wrap: wrap;
}
.list-item-tag {
  margin-left: 10px;
  border: 1px #181818 solid;
  padding: 5px 10px 5px 10px;
  border-radius: 20px;
  margin-top: 5px;
}
li.selected {
  background-color: lightblue;
  color: white;
  border-color: white;
}
</style> -->

<template>
  <div>
    <SearchInput @search="handleSearch" />
    <div class="article-listing-container">
      <h2>Selected tags</h2>
      <div>
        <ul class="list-container">
          <h3>Topics :</h3>
          <li class="list-item" v-for="val in data" :key="val">
            <strong>{{ val }}</strong>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="loading">
      <div class="article-listing-container">
        <h2>Recommended Articles Listing</h2>
        <SkeletonLoader />
      </div>
    </div>
    <div v-else>
      <div class="article-listing-container">
        <h2>Recommended Articles Listing</h2>
        <div>
          <div class="articles-container">
            <div
              v-for="(article, index) in articles"
              :key="index"
              class="article-item"
              @click="viewDetails(index, article)"
            >
              <!-- <p class="">{{ article.text.split(' ').slice(0, 2).join(' ') }}</p> -->
              <!-- <p>{{ article.text.slice(2, 500) }}...</p> -->
              <div>
                <p>
                  <span style="font-weight: bold; font-size: x-large">
                    {{ article.text.split(' ').slice(0, 2).join(' ') }}
                  </span>
                  {{ article.text.split(' ').slice(2).join(' ').slice(0, 500) }}...
                </p>

                <div class="topic-container">
                  <h3>Topics :</h3>
                  <ul class="list-container">
                    <li
                      class="list-item"
                      v-for="(topic, index) in article.uniqueTopics"
                      :key="index"
                    >
                      <strong>{{ topic }},</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @page-changed="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from '@/components/SearchInput.vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import SkeletonLoader from '@/components/Skeleton-loader.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'AboutComponent',
  components: { SearchInput, SkeletonLoader, Pagination },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup() {
    const articles = ref([])
    const loading = ref(true)
    const currentPage = ref(1)
    const totalPages = ref(10)
    const router = useRouter()

    const fetchDocuments = async (page = 1, pageSize) => {
      try {
        loading.value = true
        const response = await axios.get(`http://127.0.0.1:5000/documents?page=${page}`)
        const articlesWithUniqueTopics = response.data?.documents.map((article) => ({
          ...article,
          uniqueTopics: extractUniqueTopics(article.topics)
        }))

        articles.value = articlesWithUniqueTopics
        currentPage.value = response?.data?.page
        totalPages.value = Math.ceil(response?.data?.total_documents / response?.data?.page_size)
      } catch (error) {
        console.error('Error fetching documents:', error)
      } finally {
        loading.value = false
      }
    }

    const extractUniqueTopics = (topicsArray) => {
      const allTopics = topicsArray.map((obj) =>
        obj.topic.match(/"([^"]+)"/g).map((str) => str.replace(/"/g, ''))
      )
      const uniqueTopicsSet = new Set(allTopics.flat())
      return Array.from(uniqueTopicsSet)
    }

    const viewDetails = (index, article) => {
      router.push({
        name: 'ArticleDetails',
        params: { id: index, selectedArticle: JSON.stringify(article) }
      })
    }

    const handlePageChange = (page) => {
      currentPage.value = page
      fetchDocuments(page)
    }
    onMounted(() => {
      fetchDocuments()
    })

    return { articles, loading, viewDetails, currentPage, totalPages, handlePageChange }
  }
}
</script>

<style scoped>
.title {
  font-size: large;
  font-weight: bold;
}
.article-listing-container {
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
}
.articles-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Space between items */
  margin-top: 10px;
}
.container {
  background-color: white;
}
.title {
  margin-left: 10px;
}
.article-item {
  flex: 1 1 calc(50% - 20px); /* Two columns, considering gap */
  /* border: 1px solid #ccc; */
  border-radius: 8px;
  overflow: hidden;
  padding: 16px;
  /* 
 
  cursor: pointer;
  transition: box-shadow 0.3s ease; */
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.article-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.topic-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.list-container {
  display: flex;
  flex-direction: row;
  list-style: none;
  align-items: center;
}
.list-item {
  margin-left: 10px;
}
li.selected {
  background-color: lightblue;
  color: white;
  border-color: white;
}
.list-container-tag {
  display: flex;
  flex-direction: row;
  list-style: none;
  flex-wrap: wrap;
}
.list-item-tag {
  margin-left: 10px;
  border: 1px #181818 solid;
  padding: 5px 10px;
  border-radius: 20px;
  margin-top: 5px;
}
li.selected {
  background-color: lightblue;
  color: white;
  border-color: white;
}

.article-details-container {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
