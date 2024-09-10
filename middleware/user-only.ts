import { useUser } from "~/store/useUser";

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUser();

  if (!JSON.parse(JSON.stringify(user.data)).access_token) 
    return navigateTo("/auth", { redirectCode: 301 });
});
