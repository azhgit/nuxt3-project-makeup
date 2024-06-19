import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menuStore', {
    state: () => ({
        isExpanded: [false, false, false]
    }),
    actions: {
        toggleMenu(index) {
            this.isExpanded = this.isExpanded.map((v, i) => (i === index ? !v : false))
            console.log(this.isExpanded)
        },
        setMenuState(index, value) {
            this.isExpanded[index] = value
        },
        resetMenu() {
            this.isExpanded = [false, false, false];
        },
        resetOpenMenu() {
            this.isExpanded = [true, true, true];
        },
    },
    persist: true
})
