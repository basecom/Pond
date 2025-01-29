export function useCmsElementData(element) {
    const getData = (key?: string) => (key ? element.data[key] : element.data);

    return {
        getData,
    };
}
