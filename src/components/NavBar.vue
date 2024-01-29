<script setup>
import { defineProps } from "vue"

import SortBlock from "@/components/SortBlock.vue"
import SearchBlock from "@/components/SearchBlock.vue"

const props = defineProps({
    currentView: Number,
})
</script>

<template>
    <b-navbar
        toggleable="lg"
        variant="dark"
        v-b-color-mode="'dark'"
        sticky="top"
    >
        <b-navbar-brand
            @click="$router.push(`${'/'}`)"
            style = "cursor: pointer;"
            >Поиск кино</b-navbar-brand
        >
        <b-navbar-toggle target="nav-collapse" />
        <b-collapse
            id="nav-collapse"
            is-nav
        >
            <router-link
                to="favourites"
                class="favourites_link"
                >Избранное</router-link
            >
            <b-navbar-nav class="ms-auto mb-2 mb-lg-0">
                <sort-block :currentView="props.currentView"></sort-block>
            </b-navbar-nav>
            <b-nav-form class="d-flex">
                <SearchBlock v-if="currentView === 2"></SearchBlock>
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
