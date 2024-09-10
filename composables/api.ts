import { $fetch } from 'ofetch'

const { API_URL } = useRuntimeConfig()
const anal = $fetch.create({
    baseURL: API_URL,
})
