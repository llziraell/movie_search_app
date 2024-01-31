<script setup>
import { ref } from "vue"

import { useFilmsStore } from "@/stores/FilmsStore.js"

const filmsStore = useFilmsStore()

const inputFilm = ref("")
</script>

<template>
    <b-dropdown 
        no-caret 
        :class="{ 'close_drop': filmsStore.searchedFilms.length === 0 }">
        <template
            #button-content
            class="input_form"
        >
            <b-form-input
                class="me-2 input_form"
                placeholder="Ищу..."
                type="text"
                v-model.trim="inputFilm"
                @input="filmsStore.searchFilms(inputFilm)"
                style="width: 270px"
            />
            <b-button
                type="submit"
                variant="outline-success"
                @click="filmsStore.showSearchedFilms(inputFilm)"
            >
                Найти
            </b-button>
        </template>
        <div>
            <b-dropdown-item
                v-for="film in filmsStore.searchedFilms"
                @click="inputFilm = film.name"
            >
                {{ film.name }}
            </b-dropdown-item>
        </div>
    </b-dropdown>
</template>

<style lang="scss">
.dropdown-menu.show {
    display: block; 

    .close_drop & {
      display: none;
    }
}
</style>
