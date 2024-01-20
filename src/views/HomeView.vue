<script setup>
import { onBeforeMount, ref, computed } from "vue"

import NavBar from "@/components/NavBar.vue"
import MovieCard from "@/components/MovieCard.vue"

import { useFilmsStore } from "@/stores/FilmsStore"
const Films = useFilmsStore()

onBeforeMount(() => {
    Films.getFilms()
})

const currentPage = ref(1)

const paginatedFilms = computed(() => {
    if (Films.films) {
        const start = (currentPage.value - 1) * Films.perPage
        const end = start + Films.perPage
        console.log([start, end])
        return Films.films.slice(start, end)
    }
})
</script>

<template>
    <NavBar />
    <div class="cont">
        <div v-if="Films.isSearchBtnActive">
            <div class="title-line">
                <span
                    >Найдено
                    <span
                        @click="Films.toggleSearchBtn()"
                        style="cursor: pointer"
                        >&#10006;</span
                    ></span
                >
            </div>
            <div class="movie_cont">
                <MovieCard
                    v-for="film in Films.searchedFilms"
                    :movieData="film"
                    :key="film.id"
                    @click="
                        $router.push({ name: 'film', params: { id: film.id } })
                    "
                ></MovieCard>
            </div>
            <div class="title-line">
                <span>Другие</span>
            </div>
        </div>
        <div class="movie_cont">
            <MovieCard
                v-for="film in paginatedFilms"
                :movieData="film"
                :key="film.id"
                @click="$router.push({ name: 'film', params: { id: film.id } })"
            ></MovieCard>
        </div>
    </div>
    <div class="pagination">
        <b-pagination
            class="custom-pagination"
            v-model="currentPage"
            :total-rows="Films.totalFilms"
            :per-page="Films.perPage"
            first-number
            last-number
        />
    </div>
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

.movie_cont {
    display: flex;
    background-color: $main-bg-color;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-top: 15px;
    padding-bottom: 15px;
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
