interface TUserData {
    user_id: number
    token: string
}

export const useUser = defineStore("useUser", () => {
    const log = useLogger('useUser')
    const data = ref({} as TUserData)

    function setUserData(obj: TUserData) {
        data.value = obj

        log.success('Store was updated:', JSON.stringify(obj))
    }

    return {data, setUserData}
});