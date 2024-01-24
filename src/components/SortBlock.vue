<script setup>
import { useSortStore } from "@/stores/SortStore.js"
import { computed, ref } from "vue"

const SortedStore = useSortStore()

SortedStore.getFilmsOptions()

const maxRate = ref(10)

const toggleYear = ref([
    { caption: "70-ые", state: false },
    { caption: "80-ые", state: false },
    { caption: "90-ые", state: false },
    { caption: "2000", state: false },
    { caption: "2010", state: false },
    { caption: "новое", state: false },
])

const toggleMovieLength = ref([
    { caption: "короткий метр", state: false },
    { caption: "полнометражный фильм (90+ мин)", state: false },
])

const toggleRates = ref(Array.from({ length: 10 }, () => ({ state: false })))

const btnStates = computed(() => toggleYear.value.map((btn) => btn.state))

const toggleYaerButton = (index) => {
    toggleYear.value[index].state = !toggleYear.value[index].state
}

const toggleRateButton = (index) => {
    toggleRates.value.forEach((btn, i) => {
        btn.state = i <= index
    })
}

const toggleMovieLengthButton = (index) => {
    toggleMovieLength.value.forEach((btn, i) => {
        btn.state = i === index
    })
}

const clearStateButton = () => {
    toggleMovieLength.value.forEach((btn) => {
        btn.state = false
    })
    toggleRates.value.forEach((btn) => {
        btn.state = false
    })
    toggleYear.value.forEach((btn) => {
        btn.state = false
    })
}
</script>

<template>
    <b-nav-item-dropdown no-caret>
        <template #button-content>
            <b-button
                type="submit"
                variant="outline-success"
                >Фильтр</b-button
            >
        </template>
        <b-dropdown-form class="sort_form">
            <b-form-group label="Год:">
                <b-button-group size="sm">
                    <b-button
                        v-for="(btn, idx) in toggleYear"
                        :key="idx"
                        :pressed.sync="btn.state"
                        :variant="btn.state ? 'success' : 'primary'"
                        @click.stop="toggleYaerButton(idx)"
                    >
                        {{ btn.caption }}
                    </b-button>
                </b-button-group>

                <b-button-group size="sm">
                    <b-button
                        v-for="(btn, idx) in toggleRates"
                        :key="idx"
                        :pressed.sync="btn.state"
                        :variant="btn.state ? 'success' : 'primary'"
                        @click.stop="toggleRateButton(idx)"
                    >
                        {{ idx + 1 }}
                    </b-button>
                </b-button-group>

                <b-button-group size="sm">
                    <b-button
                        v-for="(btn, idx) in toggleMovieLength"
                        :key="idx"
                        :pressed.sync="btn.state"
                        :variant="btn.state ? 'success' : 'primary'"
                        @click.stop="toggleMovieLengthButton(idx)"
                    >
                        {{ btn.caption }}
                    </b-button>
                </b-button-group>
            </b-form-group>
            <div class="btn_zone">
                <b-button @click="SortedStore.sortFilms(toggleYear, toggleRates, toggleMovieLength)">Найти</b-button>
                <b-button @click.stop="clearStateButton">Очистить</b-button>
            </div>
        </b-dropdown-form>
    </b-nav-item-dropdown>
</template>

<style lang="scss">
.sort_form {
    width: 400px;
}

// .drop_item {

// }
</style>
