<script setup>
import { computed, ref, defineProps } from "vue"

import { useSortStore } from "@/stores/SortStore.js"
const SortedStore = useSortStore()

const props = defineProps({
    currentView: String,
})

const currentRate = ref(0)

const toggleYear = ref([
    { caption: "70-ые", state: false },
    { caption: "80-ые", state: false },
    { caption: "90-ые", state: false },
    { caption: "2000", state: false },
    { caption: "2010", state: false },
    { caption: "новое", state: false },
])

const toggleMovieLength = ref([
    { caption: "короткий метр (до 90 мин)", state: false },
    { caption: "полнометражный", state: false },
])

const toggleRates = ref(Array.from({ length: 10 }, () => ({ state: false })))

const toggleYaerButton = (index) => {
    toggleYear.value[index].state = !toggleYear.value[index].state
}

const toggleRateButton = (index) => {
    toggleRates.value.forEach((btn, i) => {
        btn.state = i <= index
    })
    currentRate.value = index
}

const toggleMovieLengthButton = (index) => {
    toggleMovieLength.value.forEach((btn, i) => {
        btn.state = i === index
    })
}

const btnStates = computed(() => toggleYear.value.map((btn) => btn.state))

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

    SortedStore.clearSortedStore()
}
</script>

<template>
    <b-nav-item-dropdown no-caret>
        <template #button-content>
            <b-button class="btn_disabled">Фильтр</b-button>
        </template>
        <b-dropdown-form class="sort_form">
            <b-form-group>
                <p>Год:</p>
                <b-button-group size="sm">
                    <b-button
                        v-for="(btn, idx) in toggleYear"
                        :key="idx"
                        :pressed.sync="btn.state"
                        :variant="btn.state ? 'warning' : 'primary'"
                        style="color: #fff"
                        @click.stop="toggleYaerButton(idx)"
                    >
                        {{ btn.caption }}
                    </b-button>
                </b-button-group>
                <p>Рейтинг:</p>
                <b-button-group
                    size="sm"
                    class="rates_group"
                >
                    <span
                        v-for="(btn, idx) in toggleRates"
                        class="rates"
                        :key="idx"
                        :pressed.sync="btn.state"
                        @click.stop="toggleRateButton(idx)"
                        :class="{ rated: btn.state === true }"
                        >★</span
                    >
                </b-button-group>
                <p>Хронометраж:</p>
                <b-button-group size="sm">
                    <b-button
                        v-for="(btn, idx) in toggleMovieLength"
                        :key="idx"
                        :pressed.sync="btn.state"
                        :variant="btn.state ? 'warning' : 'primary'"
                        @click.stop="toggleMovieLengthButton(idx)"
                        style="color: #fff"
                    >
                        {{ btn.caption }}
                    </b-button>
                </b-button-group>
            </b-form-group>
            <div class="btn_zone">
                <b-button
                    variant="outline-success"
                    @click="
                        SortedStore.sortFilms(
                            toggleYear,
                            toggleRates,
                            toggleMovieLength,
                            props.currentView
                        )
                    "
                    >Применить</b-button
                >
                <b-button
                    @click.stop="clearStateButton"
                    variant="outline-secondary"
                    >Очистить</b-button
                >
            </div>
        </b-dropdown-form>
    </b-nav-item-dropdown>
</template>

<style lang="scss">
.sort_form {
    width: 400px;
}

p {
    margin-top: 10px;
    margin-bottom: 3px;
}

.btn_disabled {
    color: gold;
    border: 1px solid gold;
    background: none;
}

.btn_disabled:hover {
    background-color: gold;
    color: #fff;
}

.rates_group {
    display: flex;
    justify-content: space-around;
}

.btn_zone {
    display: flex;
    justify-content: space-evenly;
    margin-top: 25px;
}
</style>
