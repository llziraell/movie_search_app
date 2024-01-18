import { defineStore } from "pinia"

export const useFilmsStore = defineStore("films", {
    state: () => ({
        films: null,
    }),
    actions: {
        async getFilms() {
            try {
                const response = await fetch(
                    "http://localhost:8585/docs",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                const responseData = await response.json()

                this.films = responseData
                console.log(responseData)
            } catch (error) {
                console.error("Ошибка загрузки данных:", error)
            }
        },
    },
})
