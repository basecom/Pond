export const usePondCmsUtils = () => {
    const componentExists = (componentName: string) => resolveComponent(componentName) !== componentName;

    return {
        componentExists,
    };
};
