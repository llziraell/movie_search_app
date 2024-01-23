<script setup>
import { useRoute } from "vue-router"
import { ref, onBeforeMount, onMounted } from "vue"
import { useFilmsStore } from "@/stores/FilmsStore.js"
import { useLocalStore } from "@/stores/LocalStore.js"

const route = useRoute()
const film_id = ref(0)
const Films = useFilmsStore()
const Favourites = useLocalStore()
const isBackgroundLoaded = ref(false)

onBeforeMount(() => {
    film_id.value = route.params.id
    Films.getFilmById(film_id.value)
    const backgroundImageUrl = Films.selectedFilm[0].poster.url

    const image = new Image()
    image.src = backgroundImageUrl
    image.onload = () => {
        isBackgroundLoaded.value = true
    }
})

onMounted(() => {
    Favourites.getLocalStoreData(film_id.value)
})

</script>

<template>
    <div
        v-if="isBackgroundLoaded"
        class="cont film_cont bg-image"
        :style="{
            backgroundImage: `url(${Films.selectedFilm[0].poster.url})`,
        }"
    >
        <span
            class="return"
            @click="$router.push(`${'/'}`)"
            >&lt;-</span
        >
        <div class="film_poster">
            <img
                :src="Films.selectedFilm[0].poster.previewUrl"
                class="movie__cover"
            />
            <!-- <div
                class="movie__average_0"
                @click="LocalStore.toggleBookmark(Films.selectedFilm[0].id)"
                :style="{
                    backgroundColor: LocalStore.bookmarks_ids.includes(
                        Films.selectedFilm[0].id
                    )
                        ? 'yellow'
                        : 'transparent',
                }"
            ></div> -->
            <span
                class="rates"
                v-for="rate in Favourites.maxRate"
                :key = "rate"
                @click = "Favourites.setRate(rate, film_id)"
                :class = "{rated: rate <= Favourites.currentRate}"
                >★</span
            >
        </div>
        <div
            class="film_text"
            style="color: #fff"
        >
            <h1>
                {{ Films.selectedFilm[0].name }} -
                {{ Films.selectedFilm[0].alternativeName }}
            </h1>
            <h5 style="color: gold">
                {{ Films.selectedFilm[0].year }}
            </h5>
            <div>{{ Films.selectedFilm[0].description }}</div>
            <div style="margin-top: 10px">
                <img
                    src="@/assets/chrono.png"
                    style="filter: hue-rotate(90deg)"
                />
                {{ Films.selectedFilm[0].movieLength }} минут
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
    background-size: auto 100%;
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

.movie__average_0 {
    @include movie__average;
    right: 10px;
    width: 30px;
    height: 30px;
    background-image: url("@/assets/bookmark.png");
    background-repeat: none;
    cursor: pointer;
}

.rated {
    color: $rated;
}

.rates {
    margin-top: 10px;
    margin-right: 7px;
    cursor: pointer;
}

.recommand {
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
