export function useCmsElementData(element) {
    const getData = (key?: string) => {
        return key ? element.data[key] : element.data;
    };

    return {
        getData,
    };
}
