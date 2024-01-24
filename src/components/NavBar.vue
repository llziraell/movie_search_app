<script setup>
import { ref } from "vue"

import SortBlock from '@/components/SortBlock.vue'

import { useFilmsStore } from "@/stores/FilmsStore.js"
const Films = useFilmsStore()

const inputFilm = ref("")
</script>

<template>
    <b-navbar
        toggleable="lg"
        variant="dark"
        v-b-color-mode="'dark'"
        sticky="top"
    >
        <b-navbar-brand href="#" @click="$router.push(`${'/'}`)">Поиск кино</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" />
        <b-collapse
            id="nav-collapse"
            is-nav
        >
            <router-link to="favourites" class = "favourites_link">Избранное</router-link>
            <b-navbar-nav class="ms-auto mb-2 mb-lg-0">
                <sort-block></sort-block>
            </b-navbar-nav>
            <b-nav-form class="d-flex">
                <b-dropdown>
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
                            @click.prevent="Films.toggleSearchBtn()"
                            >Найти</b-button
                        >
                    </template>
                    <div v-show = "Films.searchedFilms.length !== 0">
                        <b-dropdown-item
                        v-for="film in Films.searchedFilms"
                        @click="inputFilm = film.name"
                        >{{ film.name }}</b-dropdown-item
                    >
                    </div>
                </b-dropdown>
            </b-nav-form>
        </b-collapse>
    </b-navbar>
</template>

<style lang="scss">
.btn-group > .btn {
    display: flex;
    background: none;
    flex: none;
}

.favourites_link {
    color: gold;
}
</style>
