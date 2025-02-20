export type RemoveFilterEvent = {
    code: 'properties'|'price';
    value: string|null;
}

export type ChangePriceFilter = {
    code: 'price';
    value: {
        min: number,
        max: number
    };
}

export type ChangePropertyFilter = {
    code: 'properties';
    value: string[];
}
