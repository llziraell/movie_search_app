import { defineStore } from "pinia"

export const useFilmsStore = defineStore("films", {
    state: () => ({
        films: null,
        perPage: 25,
        totalFilms: 0,
        searchedFilms: [],
        isSearchBtnActive: false,
        selectedFilm: [],
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
                localStorage.setItem("films", JSON.stringify(responseData))
            } catch (error) {
                console.error("Ошибка загрузки данных:", error)
            }
        },

        searchFilms(inputFilm) {
            if (inputFilm === "") {
                return (this.searchedFilms = [])
            } else {
                this.searchedFilms = this.films.filter((film) => {
                    return film.name
                        .toLowerCase()
                        .includes(inputFilm.toLowerCase())
                })
            }
        },

        toggleSearchBtn() {
            if (this.searchedFilms.length !== 0) {
                this.isSearchBtnActive = !this.isSearchBtnActive
            }
        },

        getFilmById(film_id) {
            const storedFilms = JSON.parse(localStorage.getItem("films")) || []
            this.selectedFilm = storedFilms.filter((film) => {
                return film.id === film_id
            })
            console.log(this.selectedFilm)
        },
    },
})
