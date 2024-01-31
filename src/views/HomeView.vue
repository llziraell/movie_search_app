<script setup>
import { onBeforeMount, ref, computed } from "vue"

import NavBar from "@/components/NavBar.vue"
import MovieCard from "@/components/MovieCard.vue"

import { useFilmsStore } from "@/stores/FilmsStore"
import { useSortStore } from "@/stores/SortStore"

const filmsStore = useFilmsStore()
const sortedStore = useSortStore()

const view = ref(2)

const currentPageOfFilms = ref(1)
const currentPageOfSortedFilms = ref(1)

onBeforeMount(() => {
    filmsStore.getFilms()
})

const paginatedFilms = computed(() => {
    return (selectedStore) => {
        if (filmsStore.films) {
            if (selectedStore.sortedFilms) {
                const start =
                    (currentPageOfSortedFilms.value - 1) * selectedStore.perPage
                const end = start + selectedStore.perPage
                return selectedStore.sortedFilms.slice(start, end)
            } else if (selectedStore.films) {
                const start =
                    (currentPageOfFilms.value - 1) * selectedStore.perPage
                const end = start + selectedStore.perPage
                return selectedStore.films.slice(start, end)
            }
        }
    }
})

const isSortedFilmsActive = computed(() =>{
    return sortedStore.sortedFilms && sortedStore.sortedFilms.length !== 0
})

</script>

<template>
    <NavBar :currentView="view" />
    <div class="cont">
        <div v-if="filmsStore.isSearchBtnActive">
            <div class="title-line">
                <span>
                    Найдено
                    <span
                        @click="filmsStore.closeSearchedFilms()"
                        style="cursor: pointer"
                    >
                        &#10006;
                    </span>
                </span>
            </div>
            <div class="movie_cont">
                <router-link
                    v-for="film in filmsStore.searchedFilms"
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
        <div
            class="movie_cont"
            v-if="isSortedFilmsActive"
        >
            <router-link
                v-for="sortedFilm in paginatedFilms(sortedStore)"
                :key="sortedFilm.id"
                :to="{ name: 'film', params: { id: sortedFilm.id } }"
            >
                <MovieCard :movieData="sortedFilm" />
            </router-link>
        </div>
        <div
            class="movie_cont"
            v-else
        >
            <router-link
                v-for="film in paginatedFilms(filmsStore)"
                :key="film.id"
                :to="{ name: 'film', params: { id: film.id } }"
            >
                <MovieCard :movieData="film" />
            </router-link>
        </div>
    </div>
    <footer class="fixed-bottom pagination">
        <b-pagination
            v-if="isSortedFilmsActive"
            class="custom-pagination"
            v-model="currentPageOfSortedFilms"
            :total-rows="sortedStore.totalFilms"
            :per-page="sortedStore.perPage"
            first-number
            last-number
        />
        <b-pagination
            v-else
            class="custom-pagination"
            v-model="currentPageOfFilms"
            :total-rows="filmsStore.totalFilms"
            :per-page="filmsStore.perPage"
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
