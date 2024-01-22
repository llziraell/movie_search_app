<script setup>
import { ref } from "vue"

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
        <b-navbar-brand href="#">Поиск кино</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" />
        <b-collapse
            id="nav-collapse"
            is-nav
        >
            <b-navbar-nav>
                <b-nav-item href="#">Link</b-nav-item>
                <b-nav-item
                    href="#"
                    disabled
                    >Disabled</b-nav-item
                >
            </b-navbar-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ms-auto mb-2 mb-lg-0">
                <b-nav-item-dropdown
                    text="Lang"
                    right
                >
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    <b-dropdown-item href="#">ES</b-dropdown-item>
                    <b-dropdown-item href="#">RU</b-dropdown-item>
                    <b-dropdown-item href="#">FA</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template #button-content>
                        <em>User</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
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
</style>
