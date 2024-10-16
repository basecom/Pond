export function useCmsElementData(element) {
    const getData = (key?: string) => {
        if (key) {
            return element.data[key];
        } else {
            return element.data;
        }
    };

    return {
        getData,
    };
}
