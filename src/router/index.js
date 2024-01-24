import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FilmView from '@/views/FilmView.vue'
import FavouritesView from '@/views/FavouritesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/film/:id',
      name:'film',
      component:FilmView
    },
    {
      path:'/favourites',
      name:'bookmarks',
      component:FavouritesView
    },
  ]
})

export default router
