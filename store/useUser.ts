interface TUserData {
    user_id: number
    token: string
}

export const useUser = defineStore("useUser", () => {
    const data = ref({} as TUserData)

    function setUserData(obj: TUserData) {
        data.value = obj
    }

    return {data, setUserData}
});