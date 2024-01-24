import { defineStore } from "pinia"

export const useSortStore = defineStore("sortedFilms", {
    state: () => ({
        films: null,
        optionsFilms: {},
        sortedFilms: null,
    }),
    actions: {
        getFilmsOptions() {
            this.films = JSON.parse(localStorage.getItem("films"))

            const maxYear = Math.max(...this.films.map((film) => film.year))
            const minYear = Math.min(...this.films.map((film) => film.year))

            const maxMovieLength = Math.max(
                ...this.films.map((film) => film.movieLength)
            )
            const minMovieLength = Math.min(
                ...this.films.map((film) => film.movieLength)
            )

            this.optionsFilms = {
                maxYear: maxYear,
                minYear: minYear,
                maxMovieLength: maxMovieLength,
                minMovieLength: minMovieLength,
                minRating: 0,
                maxRating: 10,
            }

            console.log(this.films)
        },

        sortFilms(toggleYear, toggleRates, toggleMovieLength) {
            console.log(toggleYear)
            console.log(toggleRates)
            console.log(toggleMovieLength)

            let films_for_sort = this.films.slice()

            console.log(toggleRates.map(item=> item.state))

            if (toggleRates.some((item) => item.state)) {
                const rate = toggleRates.findIndex((btn) => btn.state === false)
                films_for_sort = films_for_sort.filter((film) => {
                    return film.rating.imdb <= rate
                })
                console.log('rate')
                console.log(films_for_sort)
            }

            if (toggleMovieLength.some((item) => item.state)) {
                if (toggleMovieLength[0].state) {
                    films_for_sort = films_for_sort.filter((film) => {
                        return film.movieLength < 90
                    })
                } else {
                    films_for_sort = films_for_sort.filter((film) => {
                        return film.movieLength >= 90
                    })
                }
                console.log('length')
                console.log(films_for_sort)
            }

            if (toggleYear.some((item) => item.state)) {
                films_for_sort =  films_for_sort.filter((film) => {
                    return toggleYear.some(({ caption, state }) => {
                      switch (caption) {
                        case "70-ые":
                          return state && film.year >= 1970 && film.year <= 1979;
                        case "80-ые":
                          return state && film.year >= 1980 && film.year <= 1989;
                        case "90-ые":
                          return state && film.year >= 1990 && film.year <= 1999;
                        case "2000":
                          return state && film.year >= 2000 && film.year <= 2009;
                        case "2010":
                          return state && film.year >= 2010 && film.year <= 2019;
                        case "новое":
                          return state && film.year >= 2020;
                        default:
                          return false
                      }
                    })
                  })
                  console.log('year')
                  console.log(films_for_sort)
            }

            this.sortedFilms = films_for_sort

            console.log(this.sortedFilms)


        },
    },
})
