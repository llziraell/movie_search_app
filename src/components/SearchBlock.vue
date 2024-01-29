<script setup>
import { ref } from "vue"

import { useFilmsStore } from "@/stores/FilmsStore.js"
const Films = useFilmsStore()

const inputFilm = ref("")
</script>

<template>
    <b-dropdown no-caret>
        <template
            #button-content
            class="input_form"
        >
            <b-form-input
                class="me-2"
                placeholder="Ищу..."
                type="text"
                v-model.trim="inputFilm"
                @input="Films.searchFilms(inputFilm)"
                style="width: 270px"
            />
            <b-button
                type="submit"
                variant="outline-success"
                @click="Films.showSearchedFilms(inputFilm)"
                >Найти</b-button
            >
        </template>
        <div>
            <b-dropdown-item
                v-for="film in Films.searchedFilms"
                @click="inputFilm = film.name"
            >
                {{ film.name }}
            </b-dropdown-item>
        </div>
    </b-dropdown>
</template>
