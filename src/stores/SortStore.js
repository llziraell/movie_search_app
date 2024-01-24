import { defineStore } from "pinia"
import { useLocalStore } from "@/stores/LocalStore.js"

export const useSortStore = defineStore("sortedFilms", {
    state: () => ({
        films_: null,
        optionsFilms: {},
        sortedFilms: null,
        perPage: 25,
        totalFilms: 0,
        films_for_sort: [],

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
            if (currentView === "films") {
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

        setSortedFilmsByCurrentView(currentView, films_for_sort) {
            if (currentView === "films") {
                this.sortedFilms = films_for_sort
                this.totalFilms = this.sortedFilms.length
            } else if (currentView === 0) {
                this.sortedBookmarks = films_for_sort
            } else if (currentView === 1) {
                this.sortedRates = films_for_sort
            }
        },

        sortFilms(toggleYear, toggleRates, toggleMovieLength, currentView) {
            console.log(currentView)

            let films_for_sort = this.getFilmsByCurrentView(currentView)

            console.log(films_for_sort)

            console.log(toggleRates.map((item) => item.state))

            if (toggleRates.some((item) => item.state)) {
                const rate = toggleRates.findIndex((btn) => btn.state === false)
                films_for_sort = films_for_sort.filter((film) => {
                    return film.rating.imdb <= rate
                })
                console.log("rate")
                console.log(films_for_sort)
            }

            if (toggleMovieLength.some((item) => item.state)) {
                console.log(films_for_sort)
                if (toggleMovieLength[0].state) {
                    films_for_sort = films_for_sort.filter((film) => {
                        console.log(film)
                        return film.movieLength < 90
                    })
                } else {
                    films_for_sort = films_for_sort.filter((film) => {
                        return film.movieLength >= 90
                    })
                }
                console.log("length")
                console.log(films_for_sort)
            }

            if (toggleYear.some((item) => item.state)) {
                films_for_sort = films_for_sort.filter((film) => {
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
                console.log("year")
                console.log(films_for_sort)
            }

            this.setSortedFilmsByCurrentView(currentView, films_for_sort)
        },
    },
})
