import { defineStore } from "pinia"

export const useLocalStore = defineStore("favourites", {
    state: () => ({
        maxRate: 10,
        favourites: [],
        currentRate: 0,
        currentBookmark: false,
        bookmarkedFilms: [],
        ratedFilms: [],
        films: null,
    }),
    actions: {
        getLocalStoreData(film_id) {
            this.favourites =
                JSON.parse(localStorage.getItem("favourites")) || []
            if (film_id) {
                const existFilm = this.favourites.find(
                    (film) => film.id === film_id
                )
                this.currentRate = existFilm ? existFilm.rate : 0
                this.currentBookmark = existFilm ? existFilm.bookmark : false
            }
        },

        setRate(rate, film_id) {
            const film_info = {
                id: film_id,
                rate: rate,
            }

            const existFilmIndex = this.favourites.findIndex(
                (film) => film.id === film_info.id
            )

            if (existFilmIndex !== -1) {
                // существует
                if (
                    this.favourites[existFilmIndex].rate ===
                    Number(film_info.rate)
                ) {
                    this.favourites[existFilmIndex].rate = 0 // одинаковые оценки
                    this.currentRate = 0
                } else {
                    this.favourites[existFilmIndex].rate = film_info.rate // измененная оценка
                    this.currentRate = rate
                }
            } else {
                this.favourites.push(film_info) // оценки еще неt
                this.currentRate = rate
            }

            localStorage.setItem("favourites", JSON.stringify(this.favourites))
        },

        setBookmark(film_id) {
            const film_info = {
                id: film_id,
                bookmark: true,
            }

            const existFilmIndex = this.favourites.findIndex(
                (film) => film.id === film_info.id
            )

            if (existFilmIndex !== -1) {
                // существует
                this.favourites[existFilmIndex].bookmark =
                    !this.favourites[existFilmIndex].bookmark // одинаковые оценки
                this.currentBookmark = this.favourites[existFilmIndex].bookmark
            } else {
                this.favourites.push(film_info) // оценки еще неt
                this.currentBookmark = true
            }

            localStorage.setItem("favourites", JSON.stringify(this.favourites))
        },

        getMarkedFilms() {
            this.getLocalStoreData()
            const films = JSON.parse(localStorage.getItem("films"))   

            this.ratedFilms = films.filter((film) => {
                const existFilm = this.favourites.find((fav_film) => fav_film.id === film.id)
                return existFilm && existFilm.rate > 0
              })

            this.bookmarkedFilms = films.filter((film) => {
                const existFilm = this.favourites.find((fav_film) => fav_film.id === film.id)
                return existFilm && existFilm.bookmark === true
            })
        },
    },
})
