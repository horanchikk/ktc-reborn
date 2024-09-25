import { useSideBar } from "./useSideBar";
import { useUser } from "./useUser";

export const useDebug = defineStore("useDebug", () => {
    const isVisible = ref(false);
    const user = useUser();
    const sidebar = useSideBar();
    const route = useRoute();

    function show() {
        isVisible.value = true
    }

    function hide() {
        isVisible.value = false
    }
  
    return { isVisible, user, route, show, hide, sidebar };
  });
  