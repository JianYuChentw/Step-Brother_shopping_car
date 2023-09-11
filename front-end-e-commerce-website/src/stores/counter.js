import { defineStore } from 'pinia'

export const save_status = defineStore('status', {
    state: () => {
        return {
            login_status: null,
        }
    },
    actions: {
        login() {
            this.login_status = true
        },
    },
    persist: true,
})

export const save_user_data = defineStore('user_data', {
    state: () => {
        return {
            user_grade: null,
            user_name: null,
        }
    },
    actions: {
        save(grade, name) {
            this.user_grade = grade
            this.user_name = name
        },
    },
    persist: true,
})
