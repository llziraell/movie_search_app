<script setup>

import { defineProps } from 'vue'
const props = defineProps({
    movieData: {}
})

</script>

<template>
    <div
        class="movie_recommend"
        
    >
        <div>
            <img
                :src="movieData.poster.previewUrl"
                class="movie__cover__recommend"
            />
        </div>
        <div class="movie__info">
            <div class="movie__title">{{ movieData.name }}</div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/my-styles.scss';

.movie_recommend {
    width: 100px;
    @include movie_base;
}

.movie__cover__recommend {
    max-width: 100%;
    cursor: pointer;
}

.movie__info {
    padding: 10px 0px;
}

.movie__title {
    font-size: 16px;
    color: #fff;
}
</style>