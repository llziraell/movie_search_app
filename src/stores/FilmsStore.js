import { defineStore } from "pinia"

export const useFilmsStore = defineStore("films", {
    state: () => ({
        films: null,
        perPage: 25,
        totalFilms: 0,
        searchedFilms: [],
        isSearchBtnActive: false
    }),
    actions: {
        async getFilms() {
            try {
                const response = await fetch("http://localhost:8585/docs", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const responseData = await response.json()

                this.films = responseData
                this.totalFilms = responseData.length
                console.log(responseData)
            } catch (error) {
                console.error("Ошибка загрузки данных:", error)
            }
        },

        searchFilms(inputFilm) {
            if (inputFilm === "") {
                return
            } else {
                this.searchedFilms = this.films.filter((film) =>
                    film.name.toLowerCase().includes(inputFilm.toLowerCase())
                )
            }
        },

        toggleSearchBtn() {
            this.isSearchBtnActive = !this.isSearchBtnActive
        }
    },
})
