import { defineStore } from "pinia"

export const useLocalStore = defineStore("favourites", {
    state: () => ({
        maxRate: 10,
        favourites: [],
        currentRate: 0
    }),
    actions: {
        getLocalStoreData(film_id) {
            this.favourites =
            JSON.parse(localStorage.getItem("favourites")) || []
            const existFilm = this.favourites.find(film => film.id === film_id)
            this.currentRate = existFilm ? existFilm.rate : 0
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
                if (this.favourites[existFilmIndex].rate === Number(film_info.rate)) {
                    this.favourites.splice(existFilmIndex, 1) // одинаковые оценки
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

    },
})
