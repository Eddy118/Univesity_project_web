// // import { createRouter, createWebHistory } from 'vue-router';
// // // import Home from '@/components/Home.vue';
// // // import About from '@/components/About.vue';
// // import DocumentListing from '@/documentListing.vue'
// //
// // const routes = [
// //   {
// //     path: '/documents',
// //     name: 'documents',
// //     component: DocumentListing
// //   },
// //   // {
// //   //   path: '/about',
// //   //   name: 'About',
// //   //   component: About
// //   // }
// // ];
// //
// // const index = createRouter({
// //   history: createWebHistory("/"),
// //   routes
// // });
// //
// // export default index;
//
//
// import { createMemoryHistory, createRouter } from 'vue-router'
//
// import HomeView from '../screens/home.vue'
// import AboutView from '../screens/about.vue'
//
// const routes = [
//   { path: '/', component: HomeView },
//   { path: '/about', component: AboutView ,
//     props: (route) => ({ data: route.query.data ? JSON.parse(route.query.data) : [] }),
//   },
// ]
//
//  const router = createRouter({
//   history: createMemoryHistory(),
//   routes,
// })
//
// export default router;

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../screens/home.vue';
import About from '../screens/about.vue';
import ArticleDetails from '@/screens/article-details.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    props: (route) => ({ data: route.query.data ? JSON.parse(route.query.data) : [] }),
  },
  {
    path: '/article-details/:id',
    name: 'ArticleDetails',
    component: ArticleDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

