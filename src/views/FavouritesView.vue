<script setup>
import { ref, onMounted, computed } from "vue"

import NavBar from "@/components/NavBar.vue"
import MovieCard from "@/components/MovieCard.vue"

import { useLocalStore } from "@/stores/LocalStore.js"
import { useSortStore } from "@/stores/SortStore.js"

const favouritesStore = useLocalStore()
const sortedStore = useSortStore()

const view = ref(null)

onMounted(() => {
    favouritesStore.getMarkedFilms()
})

const isSortedBookmarksActive = computed(() =>{
    return sortedStore.sortedBookmarks && sortedStore.sortedBookmarks.length !== 0
})

const isSortedRatesActive = computed(() =>{
    return sortedStore.sortedRates && sortedStore.sortedRates.length !== 0
})
</script>

<template style="min-height: 100vh">
    <NavBar :currentView="view" />
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
                <div
                    class="movie_cont"
                    v-if="isSortedBookmarksActive"
                >
                    <router-link
                        v-for="sortedFilm in sortedStore.sortedBookmarks"
                        :key="sortedFilm.id"
                        :to="{ name: 'film', params: { id: sortedFilm.id } }"
                    >
                        <MovieCard :movieData="sortedFilm" />
                    </router-link>
                </div>
                <div
                    v-else
                    class="movie_cont"
                >
                    <router-link
                        v-for="film in favouritesStore.bookmarkedFilms"
                        :key="film.id"
                        :to="{ name: 'film', params: { id: film.id } }"
                    >
                        <MovieCard :movieData="film" />
                    </router-link>
                </div>
            </b-tab>
            <b-tab title="Понравилось">
                <div
                    class="movie_cont"
                    v-if="isSortedRatesActive"
                >
                    <router-link
                        v-for="sortedFilm in sortedStore.sortedRates"
                        :key="sortedFilm.id"
                        :to="{ name: 'film', params: { id: sortedFilm.id } }"
                    >
                        <MovieCard :movieData="sortedFilm" />
                    </router-link>
                </div>
                <div
                    v-else
                    class="movie_cont"
                >
                    <router-link
                        v-for="film in favouritesStore.ratedFilms"
                        :key="film.id"
                        :to="{ name: 'film', params: { id: film.id } }"
                    >
                        <MovieCard :movieData="film" />
                    </router-link>
                </div>
            </b-tab>
        </b-tabs>
    </b-card>
</template>

<style lang="scss">
@import "@/assets/my-styles.scss";

.card-header:first-child {
    background-color: #000000;
    border: none;
}

.card-header-tabs .nav-link.active {
    background-color: $main-bg-color;
}

.tab-content > .active {
    background-color: $main-bg-color;
}

.nav-tabs .nav-link.active {
    color: gold;
}

.card-body {
    padding: 0px;
}

.nav-tabs .nav-link {
    color: #fff;
}

.card {
    border: none;
}
</style>
