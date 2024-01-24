<script setup>
import { onBeforeMount, ref, computed, onMounted } from "vue"
import NavBar from "@/components/NavBar.vue"
import MovieCard from "@/components/MovieCard.vue"

import { useLocalStore } from "@/stores/LocalStore.js"
const Favourites = useLocalStore()

onMounted(() => {
    Favourites.getMarkedFilms()
})
</script>

<template>
    <NavBar />
    <div class="cont">
        <b-card no-body>
            <b-tabs
                card
                fill
            >
                <b-tab
                    title="Закладки"
                    active
                >
                    <div class="movie_cont">
                        <router-link
                            v-for="film in Favourites.bookmarkedFilms"
                            :key="film.id"
                            :to="{ name: 'film', params: { id: film.id } }"
                        >
                            <MovieCard :movieData="film" />
                        </router-link>
                    </div>
                </b-tab>
                <b-tab title="Понравилось">
                    <div class="movie_cont">
                        <router-link
                            v-for="film in Favourites.ratedFilms"
                            :key="film.id"
                            :to="{ name: 'film', params: { id: film.id } }"
                        >
                            <MovieCard :movieData="film" />
                        </router-link>
                    </div>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>
