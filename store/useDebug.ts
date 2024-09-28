import { useSideBar } from "./useSideBar";
import { useUser } from "./useUser";

export const useDebug = defineStore("useDebug", () => {
    const user = useUser();
    const sidebar = useSideBar();
    const route = useRoute();
    const isVisible = ref(false);

    function show() {
        isVisible.value = true
    }

    function hide() {
        isVisible.value = false
    }
  
    return { isVisible, user, route, show, hide, sidebar };
  });
  