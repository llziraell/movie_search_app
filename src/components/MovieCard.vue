<script setup>
import { defineProps } from "vue"
import { useFilmsStore } from "@/stores/FilmsStore"
const Films = useFilmsStore()

const props = defineProps({
    movieData: [],
})
</script>

<template>
    <div class="movie">
        <div class="movie__cover-inner">
            <img
                :src="movieData.poster.previewUrl"
                class="movie__cover"
            />
            <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
            <div class="movie__title">{{ movieData.name }}</div>
            <div class="movie__category">{{ movieData.year }}</div>
            <div class="movie__average_rate">
                {{ movieData.rating.imdb }}
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/assets/my-styles.scss";

.movie {
    @include movie_base;
    width: 240px;
}

.movie__cover-inner {
    position: relative;
    height: 360px;
}

.movie__cover {
    max-width: 100%;
    height: 100%;
    cursor: pointer;
}

.movie__cover--darkened {
    background-color: $default_bg_color;
    opacity: 0.1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    max-width: 100%;
    height: 100%;
    z-index: 1;
}

.movie__cover--darkened:hover {
    background-color: grey;
    cursor: pointer;
}

.movie__info {
    padding: 10px 0px;
}

.movie__title {
    font-size: 16px;
    color: $default-text-color;
}

.movie__category {
    font-size: 14px;
    color: $rated;
}

.movie__average_rate {
    @include movie__average;
    left: 10px;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    background-color: $main-bg-color;
    font-size: 14px;
    border: 1px solid green;
}

.movie__average_bookmark {
    @include movie__average;
    right: 10px;
    width: 30px;
    height: 30px;
    background-image: url("@/assets/bookmark.png");
    background-repeat: none;
    cursor: pointer;
}
</style>
