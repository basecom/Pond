import { register } from "swiper/element/bundle";
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook("app:created", () => {
        register();
    });
});