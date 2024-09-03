<template>
  <div v-if="article" class="container">
    <div class="image-container">
      <div class="image-item" @click="downloadText">
        <img class="downloadText" :src="DocImage" alt="Download Text File" />
        <p>Download Text File</p>
      </div>
      <div class="image-item" @click="downloadPdf">
        <img :src="PdfImage" alt="Download PDF File" />
        <p>Download PDF File</p>
      </div>
    </div>

    <div class="article-details-container">
      <p>
        <span style="font-weight: bold; font-size: x-large">
          {{ article.text.split(' ').slice(0, 2).join(' ') }}
        </span>
        {{ article.text.split(' ').slice(2).join(' ').slice(0, 500) }}...
      </p>

      <ul class="list-container">
        <h3>Topics:</h3>
        <li v-for="tag in article.uniqueTopics" :key="tag">
          <strong class="list-item">{{ tag }},</strong>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import JsPDF from 'jspdf'
import DocImage from '@/assets/text_download.png'
import PdfImage from '@/assets/pdf_download.png'

export default {
  name: 'ArticleDetails',
  data() {
    return {
      article: null,
      DocImage: DocImage,
      PdfImage: PdfImage
    }
  },
  computed: {
    index() {
      return this.$route.params.id
    },
    selectedArticle() {
      return this.$route.params?.selectedArticle
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
    async fetchDocument() {
      try {
        if (this.selectedArticle) {
          const selectedArticle = JSON.parse(this.selectedArticle)
          this.article = JSON.parse(this.selectedArticle)
        } else {
          const response = await axios.get('http://127.0.0.1:5000/documents')
          const articles = response.data?.documents
          if (this.index >= 0 && this.index < articles.length) {
            const article = articles[this.index]
            article.uniqueTopics = this.extractUniqueTopics(article.topics)
            this.article = article
          } else {
            console.error('Index out of bounds')
          }
        }
      } catch (error) {
        console.error('Error fetching document:', error)
      }
    },
    downloadText() {
      if (!this.article) return

      const firstThreeWords = this.article.text.split(' ').slice(0, 3).join(' ')
      const sanitizedFileName = firstThreeWords.replace(/[^a-z0-9]/gi, '_').toLowerCase()

      const element = document.createElement('a')
      const file = new Blob([this.article.text], { type: 'text/plain' })
      element.href = URL.createObjectURL(file)
      element.download = `${sanitizedFileName}.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    },
    downloadPdf() {
      // Create a new jsPDF instance
      const doc = new JsPDF()
      const firstThreeWords = this.article.text.split(' ').slice(0, 3).join(' ')

      // Add text to the PDF
      doc.text(this.article.text, 10, 10)

      // Save the PDF
      doc.save(`${firstThreeWords}.pdf`)
    }
  },
  mounted() {
    this.fetchDocument()
  }
}
</script>

<style scoped>
.container {
  margin-left: 10px;
  margin-right: 10px;
}
.tags {
  margin-bottom: 20px;
}
.tag {
  display: inline-block;
  background-color: #eee;
  border-radius: 3px;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
}
.list-container {
  display: flex;
  flex-direction: row;
  list-style: none;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}
.list-item {
  margin-left: 10px;
  margin-top: 5px;
}
.download-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.download-icon {
  min-height: 30px;
  max-height: 30px;
  object-fit: contain;
}
.download-button:hover {
  background-color: #0056b3;
}

.image-container {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 20px;
}

.image-item {
  text-align: center;
}

.image-item:hover {
  text-align: center;
  cursor: pointer;
}

.image-item img {
  max-width: 100%;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.image-item p {
  margin-top: 10px;
  font-size: 16px;
  color: #333;
}

.article-details-container {
  margin-top: 50px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 10px;
  border-radius: 10px;
}
</style>
