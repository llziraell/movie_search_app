<script setup>
import { onBeforeMount, ref, computed } from "vue"

import NavBar from "@/components/NavBar.vue"
import MovieCard from "@/components/MovieCard.vue"

import { useFilmsStore } from "@/stores/FilmsStore"
const Films = useFilmsStore()

import { useSortStore } from "@/stores/SortStore"
const SortedStore = useSortStore()

onBeforeMount(() => {
    Films.getFilms()
})

const currentPageFilm = ref(1)
const currentPageSortedFilm = ref(1)

const paginatedFilms = computed(() => {
    return (selectedStore) => {
        if (Films.films) {
            if (selectedStore.sortedFilms) {
                const start = (currentPageSortedFilm.value - 1) * selectedStore.perPage
                const end = start + selectedStore.perPage
                return selectedStore.sortedFilms.slice(start, end)
            } else if (selectedStore.films) {
                const start = (currentPageFilm.value - 1) * selectedStore.perPage
                const end = start + selectedStore.perPage
                return selectedStore.films.slice(start, end)
            }
        }
    }
})
</script>

<template>
    <NavBar currentView ="films" />
    <div class="cont">
        <div v-if="Films.isSearchBtnActive">
            <div class="title-line">
                <span
                    >Найдено
                    <span
                        @click="Films.closeSearchedFilms()"
                        style="cursor: pointer"
                        >&#10006;</span
                    ></span
                >
            </div>
            <div class="movie_cont">
                <router-link
                    v-for="film in Films.searchedFilms"
                    :key="film.id"
                    :to="{ name: 'film', params: { id: film.id } }"
                >
                    <MovieCard :movieData="film" />
                </router-link>
            </div>
            <div class="title-line">
                <span>Другие</span>
            </div>
        </div>
        <div class="movie_cont">
            <router-link
                v-if="SortedStore.sortedFilms && SortedStore.sortedFilms.length !== 0"
                v-for="sorted_film in paginatedFilms(SortedStore)"
                :key="sorted_film.id"
                :to="{ name: 'film', params: { id: sorted_film.id } }"
            >
                <MovieCard :movieData="sorted_film" />
            </router-link>
            <router-link
                v-else
                v-for="film in paginatedFilms(Films)"
                :key="film.id"
                :to="{ name: 'film', params: { id: film.id } }"
            >
                <MovieCard :movieData="film" />
            </router-link>
        </div>
    </div>
    <footer class="fixed-bottom pagination">
        <b-pagination
            v-if="SortedStore.sortedFilms && SortedStore.sortedFilms.length !== 0"
            class="custom-pagination"
            v-model="currentPageSortedFilm"
            :total-rows="SortedStore.totalFilms"
            :per-page="SortedStore.perPage"
            first-number
            last-number
        />
        <b-pagination
            v-else
            class="custom-pagination"
            v-model="currentPageFilm"
            :total-rows="Films.totalFilms"
            :per-page="Films.perPage"
            first-number
            last-number
        />
    </footer>
</template>

<style lang="scss">
@import "@/assets/my-styles.scss";

.pagination {
    display: flex;
    justify-content: center;
    background-color: $main-bg-color;
}

.custom-pagination .page-item.active .page-link {
    background-color: $rated;
    border-color: $default_bg_color;
    color: $default_bg_color;
}

.custom-pagination .page-item .page-link {
    background-color: $main-bg-color;
    border-color: $default_bg_color;
    color: $default_text_color;
}


.title-line {
    font-size: 15px;
    color: rgb(50, 50, 50);
    text-transform: uppercase;
    line-height: 1.5;
    text-align: center;
    position: relative;
}

.title-line span {
    background: $main-bg-color;
    color: $default-text-color;
    display: inline-block;
    padding: 0 15px;
    position: relative;
}

.title-line:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    border-top: 2px solid $default-text-color;
}
</style>
