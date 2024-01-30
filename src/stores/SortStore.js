import { defineStore } from "pinia"
import { useLocalStore } from "@/stores/LocalStore.js"

export const useSortStore = defineStore("sortedFilms", {
    state: () => ({
        films_: null,
        optionsFilms: {},
        sortedFilms: null,
        perPage: 25,
        totalFilms: 0,
        filmsForSort: [],

        sortedRates: [],
        sortedBookmarks: [],
    }),
    actions: {
        clearSortedStore() {
            this.sortedFilms = []
            this.sortedRates = []
            this.sortedBookmarks = []
            localStorage.removeItem("sortedFilms")
        },

        getFilmsByCurrentView(currentView) {
            if (currentView === 2) {
                return JSON.parse(localStorage.getItem("films"))
            } else {
                const Favourites = useLocalStore()
                if (currentView === 0) {
                    return Favourites.bookmarkedFilms
                } else if (currentView === 1) {
                    return Favourites.ratedFilms
                }
            }
        },

        setSortedFilmsByCurrentView(currentView, filmsForSort) {
            if (currentView === 2) {
                this.sortedFilms = filmsForSort
                this.totalFilms = this.sortedFilms.length
            } else if (currentView === 0) {
                this.sortedBookmarks = filmsForSort
            } else if (currentView === 1) {
                this.sortedRates = filmsForSort
            }
        },

        sortFilms(toggleYear, toggleRates, toggleMovieLength, currentView) {
            // получаем массив для сортировки в зависимости от вида
            let filmsForSort = this.getFilmsByCurrentView(currentView)

            // по оценке
            if (toggleRates.some((item) => item.state)) {
                let rate = toggleRates.findIndex((btn) => btn.state === false)
                // у 10ой звезды 
                if (rate === -1) {
                    rate = 9.1
                }
                filmsForSort = filmsForSort.filter((film) => {
                    return film.rating.imdb >= rate
                })
            }

            // по хронометражу
            if (toggleMovieLength.some((item) => item.state)) {
                if (toggleMovieLength[0].state) {
                    filmsForSort = filmsForSort.filter((film) => {
                        return film.movieLength < 90
                    })
                } else {
                    filmsForSort = filmsForSort.filter((film) => {
                        return film.movieLength >= 90
                    })
                }
            }

            // по периоду
            if (toggleYear.some((item) => item.state)) {
                filmsForSort = filmsForSort.filter((film) => {
                    return toggleYear.some(({ caption, state }) => {
                        switch (caption) {
                            case "70-ые":
                                return (
                                    state &&
                                    film.year >= 1970 &&
                                    film.year <= 1979
                                )
                            case "80-ые":
                                return (
                                    state &&
                                    film.year >= 1980 &&
                                    film.year <= 1989
                                )
                            case "90-ые":
                                return (
                                    state &&
                                    film.year >= 1990 &&
                                    film.year <= 1999
                                )
                            case "2000":
                                return (
                                    state &&
                                    film.year >= 2000 &&
                                    film.year <= 2009
                                )
                            case "2010":
                                return (
                                    state &&
                                    film.year >= 2010 &&
                                    film.year <= 2019
                                )
                            case "новое":
                                return state && film.year >= 2020
                            default:
                                return false
                        }
                    })
                })
            }
            if (filmsForSort.length === 0) {
                alert('По вашему запросы ничего не найдено')
                this.clearSortedStore()
            } else {
               this.setSortedFilmsByCurrentView(currentView, filmsForSort) 
            }
        },
    },
})
