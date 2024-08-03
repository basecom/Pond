/**
 * Use it to create simple modal controllers
 */
export function useModal() {
    const isOpen = ref(false);
    const isLocked = useScrollLock(document?.body);

    const open = () => {
        isOpen.value = isLocked.value = true;
    };

    const close = () => {
        isOpen.value = isLocked.value = false;
    };

    return {
        isOpen: computed(() => isOpen.value),
        open,
        close,
    };
}
