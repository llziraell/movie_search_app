import { defineStore } from "pinia"

export const useFilmsStore = defineStore("films", {
    state: () => ({
        films: null,
        perPage: 25,
        totalFilms: 0,
        searchedFilms: [],
        isSearchBtnActive: false,
        selectedFilm: [],
        recommendFilms: [],
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
            this.closeSearchedFilms()

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

        showSearchedFilms(inputFilm) {
            // при полном совпадении названия ищется только один фильм, иначе - все фильмы из выпадающего списка
            const fullConcurrence = this.films.find(
                (film) => film.name === inputFilm
            )

            if (fullConcurrence) {
                this.searchedFilms = []
                this.searchedFilms.push(fullConcurrence)
            }

            if (this.searchedFilms.length !== 0) {
                this.isSearchBtnActive = true
            }
        },

        closeSearchedFilms() {
            this.isSearchBtnActive = false
        },

        getFilmById(filmId) {
            const storedFilms = JSON.parse(localStorage.getItem("films")) || []
            this.selectedFilm = storedFilms.filter((film) => {
                return film.id === filmId
            })
        },

        getRecommendFilms(selectedFilm) {
            const films = JSON.parse(localStorage.getItem("films"))

            this.recommendFilms = films.filter((film) => {
                let nonRepeat = film.id !== selectedFilm.id
                // рейтинг рекомендованного фильма должен быть не меньше текущего - 1
                let byRate =
                    parseInt(film.rating.imdb) >=
                    parseInt(selectedFilm.rating.imdb) - 1
                let byType = selectedFilm.type === film.type
                return byType && byRate && nonRepeat
            })
            if (this.recommendFilms.length >= 5) {
                this.recommendFilms = this.recommendFilms.slice(0, 5)
            }
        },
    },
})
