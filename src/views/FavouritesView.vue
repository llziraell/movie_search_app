<script setup>
import { onBeforeMount, ref, computed, onMounted } from "vue"
import NavBar from "@/components/NavBar.vue"
import MovieCard from "@/components/MovieCard.vue"

import { useLocalStore } from "@/stores/LocalStore.js"
const Favourites = useLocalStore()

import { useSortStore } from "@/stores/SortStore.js"
const SortedStore = useSortStore()

const view = ref("")

// const getViewName = computed(() => {
//     console.log(typeof(view.value))
//     if (view.value === 0 || view.value === "rates") {
//         return (view.value = "bookmarks")
//     } else {
//         return (view.value = "rates")
//     }
// })

onMounted(() => {
    Favourites.getMarkedFilms()
})
</script>

<template>
    <NavBar :currentView="view" />
    <div class="cont">
        <b-card no-body>
            <b-tabs
                v-model="view"
                card
                fill
            >
                <b-tab
                    title="Закладки"
                    active
                >
                    <div class="movie_cont">
                        <router-link
                            v-if="
                                SortedStore.sortedBookmarks &&
                                SortedStore.sortedBookmarks.length !== 0
                            "
                            v-for="sorted_film in SortedStore.sortedBookmarks"
                            :key="sorted_film.id"
                            :to="{
                                name: 'film',
                                params: { id: sorted_film.id },
                            }"
                        >
                            <MovieCard :movieData="sorted_film" />
                        </router-link>
                        <router-link
                            v-else
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
                            v-if="
                                SortedStore.sortedRates &&
                                SortedStore.sortedRates.length !== 0
                            "
                            v-for="sorted_film in SortedStore.sortedRates"
                            :key="sorted_film.id"
                            :to="{
                                name: 'film',
                                params: { id: sorted_film.id },
                            }"
                        >
                            <MovieCard :movieData="sorted_film" />
                        </router-link>
                        <router-link
                            v-else
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
