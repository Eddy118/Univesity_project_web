<template>
  <div>
    <div class="article-listing-container">
      <h2>Selected tags</h2>
      <div>
        <ul class="list-container">
          <h3>Topics : </h3>
          <li v-if="data?.length === 0">
            <strong>No topic selected</strong>
          </li>
          <div v-else class="selected-topics">
            <li  class="list-item" v-for="val in data" :key="val">
              <strong>{{ val }},</strong>
            </li>
          </div>

        </ul>
      </div>
    </div>

    <div v-if="loading">
      <div class="article-listing-container">
        <h2>Matching Articles Listing</h2>
        <SkeletonLoader />
      </div>
    </div>

    <div v-else>
      <div v-if="articles?.length">
        <div class="article-listing-container">
          <h2>Matching Articles Listing</h2>
          <div>
            <div class="search-results-container">
              <div
                  v-for="(article, index) in articles"
                  :key="index"
                  class="search-result-item"
                  @click="viewDetails(index, article)"
              >
                <div class="result-content">
                  <!-- Clickable title -->
                  <a href="javascript:void(0)" class="result-title">
                    {{ article.text?.split(' ').slice(0, 2).join(' ') }}
                  </a>

                  <!-- Short snippet of the text -->
                  <p class="result-snippet">
                    {{ article.text?.split(' ').slice(2).join(' ').slice(0, 500) }}...
                  </p>

                  <!-- Topic metadata -->
                  <div class="topic-container">
                  <span class="result-topics">
                    Topics:
                    <span v-for="(topic, index) in article.uniqueTopics" :key="index" class="result-topic">
                      {{ topic }}<span v-if="index !== article.uniqueTopics.length - 1">,</span>
                    </span>
                  </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="totalPages">
            <Pagination
                :currentPage="currentPage"
                :totalPages="totalPages"
                @page-changed="handlePageChange"
            />
          </div>

        </div>
      </div>
      <div v-else class="no-results-found">
        <h3>
          No documents found for selected categories
        </h3>
      </div>


      <div v-if="recommendedArticles?.length" class="article-listing-container">
        <h2>Recommended Articles Listing</h2>
        <div>
          <div class="search-results-container">
            <div
                v-for="(article, index) in recommendedArticles"
                :key="index"
                class="search-result-item"
                @click="viewDetails(index, article)"
            >
              <div class="result-content">
                <!-- Clickable title -->
                <a href="javascript:void(0)" class="result-title">
                  {{ article.text?.split(' ').slice(0, 2).join(' ') }}
                </a>

                <!-- Short snippet of the text -->
                <p class="result-snippet">
                  {{ article.text?.split(' ').slice(2).join(' ').slice(0, 500) }}...
                </p>

                 Topic metadata
                <div class="topic-container">
                  <span class="result-topics">
                    Topics:
                    <span v-for="(topic, index) in article.uniqueTopics" :key="index" class="result-topic">
                      {{ topic }}<span v-if="index !== article.uniqueTopics.length - 1">,</span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
<!--        <Pagination-->
<!--            :currentPage="currentPage"-->
<!--            :totalPages="totalPages"-->
<!--            @page-changed="handlePageChange"-->
<!--        />-->
<!--        <div>-->
<!--          <div class="search-results-container">-->

<!--          </div>-->
<!--        </div>-->
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
  setup(props) {
    const articles = ref([])
    const recommendedArticles = ref([])
    const loading = ref(true)
    const currentPage = ref(1)
    const totalPages = ref(10)
    const router = useRouter()

    const fetchDocuments = async (page = 1) => {
      try {
        loading.value = true

        const response = await axios.post(
            'https://4b13-2a02-6b6f-e986-1c00-102d-c6ff-5deb-b45e.ngrok-free.app/documents/match',
            {
              categories: props?.data,
            },  // This is the request body
            {
              headers: {
                'ngrok-skip-browser-warning': 'true',  // Custom header
                'Content-Type': 'application/json'     // You can specify additional headers if needed
              }
            }
        );

        const articlesWithUniqueTopics = response?.data?.matched_documents.map((article) => ({
          ...article,
          uniqueTopics: extractUniqueTopics(article.topics)
        }))

        const recommendedArticlesWithUniqueTopics = response?.data?.recommended_documents.map((article) => ({
          ...article?.document,
          uniqueTopics: extractUniqueTopics(article?.document?.topics)
        }))

        articles.value = articlesWithUniqueTopics
        recommendedArticles.value = recommendedArticlesWithUniqueTopics
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

    return { articles, loading, viewDetails, currentPage, totalPages, handlePageChange, recommendedArticles }
  }
}
</script>

<style scoped>
.title {
  font-size: large;
  font-weight: bold;
}

.list-container{
  align-items: center;
  display: flex;
}

.list-item {
  list-style: none;
  margin-left: 10px;
}
.article-listing-container {
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
}
.search-results-container {

  margin: 0 auto;
  padding: 20px 20px;
}

.search-result-item {
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
}

.search-result-item:hover {
  background-color: #f8f8f8;
}

.result-title {
  color: #1a0dab; /* Google's blue color for links */
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
}

.result-title:hover {
  text-decoration: underline;
}

.result-snippet {
  font-size: 14px;
  color: #4d5156;
  margin-top: 8px;
  margin-bottom: 8px;
}

.result-url {
  display: block;
  font-size: 14px;
  color: #006621; /* Green URL color in Google search */
}

.result-topics {
  font-size: 13px;
  color: #6a6a6a;
}

.result-topic {
  font-size: 13px;
  color: #202124;
}

.no-results-found {
  margin-left: 10px;
  margin-top: 20px;
}

.selected-topics {
  display: flex;
  flex-direction: row;
}
</style>
