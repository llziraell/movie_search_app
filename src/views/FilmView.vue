

<template>
    <div class="cont">
        djslkdajsdl
    </div>
    <!-- <div
        v-if="isBackgroundLoaded"
        class="film_container bg-image"
        :style="{
            backgroundImage: `url(${Films.selectedFilmInfo[0].poster.url})`,
        }"
    >
        <span
            class="return"
            @click="$router.push(`${'/'}`)"
            >&lt;-</span
        >
        <div class="film_poster">
            <img
                :src="Films.selectedFilmInfo[0].poster.previewUrl"
                class="movie__cover"
            />
            <div
                class="movie__average_0"
                @click="
                    LocalStore.toggleBookmark(
                        Films.selectedFilmInfo[0].externalId._id
                    )
                "
                :style="{
                    backgroundColor: LocalStore.bookmarks_ids.includes(
                        Films.selectedFilmInfo[0].externalId._id
                    )
                        ? 'yellow'
                        : 'transparent',
                }"
            ></div>
            <span
                style="
                    margin-top: 10px;
                    margin-right: 7px;
                    position: center;
                    cursor: pointer;
                "
                v-for="rating in LocalStore.maxRating"
                :key="rating"
                @click="
                    LocalStore.addMarks(
                        Films.selectedFilmInfo[0].externalId._id,
                        rating
                    )
                "
                :class="{
                    rated:
                        rating <=
                        LocalStore.getMarks(
                            Films.selectedFilmInfo[0].externalId._id
                        ),
                }"
                >★</span
            >
        </div>
        <div
            class="film_text"
            style="color: #fff"
        >
            <h1>
                {{ Films.selectedFilmInfo[0].name }} -
                {{ Films.selectedFilmInfo[0].alternativeName }}
            </h1>
            <h5 style="color: gold">
                {{ Films.selectedFilmInfo[0].year }}
            </h5>
            <div>{{ Films.selectedFilmInfo[0].description }}</div>
            <div style="margin-top: 10px">
                <img
                    src="@/assets/chrono.png"
                    style="filter: hue-rotate(90deg)"
                />
                {{ Films.selectedFilmInfo[0].movieLength }} минут
            </div>
            <div class="recommand">
                {{ Films.getrecommendFilms(Films.selectedFilmInfo[0]) }}
                <h4 v-if="Films.recommendFilms.length !== 0">
                    Смотреть похожие:
                </h4>
                <div class="film_circles">
                    <MovieRecommend
                        debounce="500"
                        v-for="(movie, index) in Films.recommendFilms"
                        :key="index"
                        :movieData="movie"
                    />
                </div>
            </div>
        </div>
    </div> -->
</template>
