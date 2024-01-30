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
        getLocalStoreData(filmId) {
            // массив хранит в себе информацию о оценках и закладках фильма по id фильма
            this.favourites =
                JSON.parse(localStorage.getItem("favourites")) || []
            if (filmId) {
                const existFilm = this.favourites.find(
                    (film) => film.id === filmId
                )
                this.currentRate = existFilm ? existFilm.rate : 0
                this.currentBookmark = existFilm ? existFilm.bookmark : false
            }
        },

        setRate(rate, filmId) {
            const filmInfo = {
                id: filmId,
                rate: rate,
            }

            const existFilmIndex = this.favourites.findIndex(
                (film) => film.id === filmInfo.id
            )

            // если информация об оценках/закладках фильма существует
            if (existFilmIndex !== -1) {
                // если снова ставим ту же оценку - убираем ее
                if (
                    this.favourites[existFilmIndex].rate ===
                    Number(filmInfo.rate)
                ) {
                    this.favourites[existFilmIndex].rate = 0
                    this.currentRate = 0
                } else {
                    // иначе - меняем
                    this.favourites[existFilmIndex].rate = filmInfo.rate
                    this.currentRate = rate
                }
            } else {
                // если еще не существует - добавляем
                this.favourites.push(filmInfo)
                this.currentRate = rate
            }

            localStorage.setItem("favourites", JSON.stringify(this.favourites))
        },

        setBookmark(filmId) {
            const filmInfo = {
                id: filmId,
                bookmark: true,
            }

            const existFilmIndex = this.favourites.findIndex(
                (film) => film.id === filmInfo.id
            )

            if (existFilmIndex !== -1) {
                // если закладка есть - убираем
                this.favourites[existFilmIndex].bookmark =
                    !this.favourites[existFilmIndex].bookmark
                this.currentBookmark = this.favourites[existFilmIndex].bookmark
            } else {
                // иначе - добавляем
                this.favourites.push(filmInfo) 
                this.currentBookmark = true
            }

            localStorage.setItem("favourites", JSON.stringify(this.favourites))
        },

        // общее получение массивов оцененных и помеченных фильмов для отображения
        getMarkedFilms() {
            this.getLocalStoreData()
            const films = JSON.parse(localStorage.getItem("films"))

            this.ratedFilms = films.filter((film) => {
                const existFilm = this.favourites.find(
                    (fav_film) => fav_film.id === film.id
                )
                return existFilm && existFilm.rate > 0
            })

            this.bookmarkedFilms = films.filter((film) => {
                const existFilm = this.favourites.find(
                    (fav_film) => fav_film.id === film.id
                )
                return existFilm && existFilm.bookmark === true
            })
        },
    },
})
