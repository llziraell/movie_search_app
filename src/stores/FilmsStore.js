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

            console.log(inputFilm)

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

        //???
        showSearchedFilms(inputFilm) {
            const fullConcurrence = this.films.find(
                (film) => film.name === inputFilm
            )

            // console.log(typeof(fullConcurrence))

            if (fullConcurrence) {
                this.searchedFilms = []
                this.searchedFilms.push(fullConcurrence)
            }

            console.log(typeof(this.searchedFilms))
            if (this.searchedFilms.length !== 0) {
                this.isSearchBtnActive = true
            }

            console.log(this.searchedFilms)
        },

        closeSearchedFilms() {
            this.isSearchBtnActive = false
        },

        getFilmById(film_id) {
            const storedFilms = JSON.parse(localStorage.getItem("films")) || []
            this.selectedFilm = storedFilms.filter((film) => {
                return film.id === film_id
            })
            console.log(this.selectedFilm)
        },

        getRecommendFilms(selectedFilm) {
            const films = JSON.parse(localStorage.getItem("films"))

            this.recommendFilms = films.filter((film) => {
                let nonRepeat = film.id !== selectedFilm.id
                let byRate =
                    parseInt(selectedFilm.rating.imdb) >= film.rating.imdb &&
                    parseInt(selectedFilm.rating.imdb) <
                        parseInt(film.rating.imdb) + 1
                let byType = selectedFilm.type === film.type
                return byType && byRate && nonRepeat
            })
            if (this.recommendFilms.length >= 5) {
                this.recommendFilms = this.recommendFilms.slice(0, 5)
            }
            console.log(this.recommendFilms)
        },
    },
})
