export function useCmsElementData(element) {
    const getData = (key) => {
        return (
            element.data[key]
        );
    }

    return {
        getData,
    }
}
