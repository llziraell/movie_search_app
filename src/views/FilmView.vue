<script setup>
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router"
import { ref, onBeforeMount, computed } from "vue"

import RecommendBlock from "@/components/RecommendBlock.vue"

import { useFilmsStore } from "@/stores/FilmsStore.js"
import { useLocalStore } from "@/stores/LocalStore.js"

const filmsStore = useFilmsStore()
const favouritesStore = useLocalStore()

const route = useRoute()
const router = useRouter()

const filmId = ref(null)
const isBackgroundLoaded = ref(false)

// при переходе с одного фильма на другой
onBeforeRouteUpdate((to, from, next) => {
    filmId.value = to.params.id
    favouritesStore.getLocalStoreData(filmId.value)
    loadFilmData(filmId.value)
    next()
})

const loadFilmData = (filmId) => {
    filmsStore.getFilmById(filmId)

    const backgroundImageUrl = filmsStore.selectedFilm[0].poster.url

    const image = new Image()
    image.src = backgroundImageUrl
    image.onload = () => {
        isBackgroundLoaded.value = true
    }

    filmsStore.getRecommendFilms(filmsStore.selectedFilm[0])
}

onBeforeMount(() => {
    filmId.value = route.params.id
    favouritesStore.getLocalStoreData(filmId.value)
    loadFilmData(filmId.value)
})

// возвращение на предыдущий путь
const backStep = () => {
    router.go(-1)
}

const toggleBookmarkClass = computed(() => {
    return favouritesStore.currentBookmark? 'active_bookmark_img' : 'default_bookmark_img'
})
</script>

<template>
    <div
        v-if="isBackgroundLoaded"
        class="cont film_cont bg-image"
        :style="{ backgroundImage: `url(${filmsStore.selectedFilm[0].poster.url})`}"
    >
        <span
            class="return"
            @click="backStep()"
        >
            &lt;-
        </span>
        <div class="film_poster">
            <img
                :src="filmsStore.selectedFilm[0].poster.previewUrl"
                class="movie__cover"
            />
            <span
                class="movie__bookmark"
                @click="favouritesStore.setBookmark(filmId)"
                :class="toggleBookmarkClass"
            >
            </span>
            <div class = "rates_group">
                <span
                    class="rates"
                    v-for="rate in favouritesStore.maxRate"
                    :key="rate"
                    @click="favouritesStore.setRate(rate, filmId)"
                    :class="{ rated: rate <= favouritesStore.currentRate }"
                >
                    ★
                </span>
            </div>
        </div>
        <div
            class="film_text"
            style="color: #fff"
        >
            <h1>
                {{ filmsStore.selectedFilm[0].name }} -
                {{ filmsStore.selectedFilm[0].alternativeName }}
            </h1>
            <h5 style="color: gold">
                {{ filmsStore.selectedFilm[0].year }}
            </h5>
            <div>{{ filmsStore.selectedFilm[0].description }}</div>
            <div style="margin-top: 10px">
                <img
                    src="@/assets/chrono.png"
                    style="filter: hue-rotate(90deg)"
                />
                {{ filmsStore.selectedFilm[0].movieLength }} минут
            </div>
            <div class="recommend">
                <h4 v-if="filmsStore.recommendFilms.length !== 0">
                    Смотреть похожие:
                </h4>
                <div class="film_circles">
                    <router-link
                        v-for="film in filmsStore.recommendFilms"
                        :key="film.id"
                        :to="{ name: 'film', params: { id: film.id } }"
                    >
                        <RecommendBlock :movieData="film" />
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/assets/my-styles.scss";

.return {
    background-color: $default_bg_color;
    height: 40px;
    width: 40px;
    color: $default-text-color;
    border-radius: 50%;
    @include flexy;
    margin-left: 30px;
    cursor: pointer;
}

.bg-image {
    background-size: cover;
    opacity: 0.8;
    background-position: right center;
}

.bg-image::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 95vh;
    height: 100vh;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    z-index: -1;
}
.film_cont {
    display: flex;
    align-items: center;
    min-height: 95vh;
    height: 100vh;
    left: 0;
    right: 0;
    overflow-y: scroll;
    flex-direction: row;
}

.film_cont .film_poster {
    background-color: $default_bg_color;
    height: 360px;
    width: 240px;
    min-height: 360px;
    min-width: 240px;
    position: relative;
    margin-left: 10vw;
    margin-right: 42px;
}

.film_cont .film_text {
    max-height: 360px;
    width: 50vw;
}

.movie__cover {
    max-width: 100%;
    height: 100%;
}

.movie__bookmark {
    top: 10px;
    right: 10px;
    cursor: pointer;
    position: absolute;
}

.default_bookmark_img,
.active_bookmark_img {
    background-size: contain;
    background-repeat: no-repeat;
    width: 20%;
    height: 20%;
}

.default_bookmark_img {
    background-image: url("@/assets/default_bookmark.png");
}

.active_bookmark_img {
    background-image: url("@/assets/active_bookmark.png");
}

.recommend {
    margin-top: 40px;
    width: 100%;
    position: relative;
}

.film_circles {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
</style>
