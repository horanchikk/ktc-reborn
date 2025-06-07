import { useSnackbar } from "#imports"

export default defineNuxtPlugin(() => {
    const log = useLogger('snackbarPlugin')
    try {
        const snackbar = useSnackbar()
        return {
            provide: {
                snackbar: snackbar
            }
        }
    } catch (e) {
        log.error(e)
    }
})