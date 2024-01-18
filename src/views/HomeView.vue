<script setup>
import { onBeforeMount } from "vue"

import NavBar from "@/components/NavBar.vue"
import MovieCard from "@/components/MovieCard.vue"

import { useFilmsStore } from "@/stores/FilmsStore"
const Films = useFilmsStore()

onBeforeMount(() => {
    Films.getFilms()
})
</script>

<template>
    <NavBar />
    <div class="container">
        <MovieCard
            v-for="film in Films.films"
            :movieData="film"
        ></MovieCard>
    </div>
    <div class="footer"></div>
</template>

<style lang="scss">
@import "@/assets/my-styles.scss";

.container {
    background-color: $main-bg-color;
}
</style>
