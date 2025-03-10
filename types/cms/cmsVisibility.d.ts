export type CmsElementLazyLoadConfig = {
    id: string;
    type: LazyLoadTypes;
    loaded: boolean;
}

export type CmsElementConfig = {
    id: string;
    visible: boolean;
    loaded: boolean;
    lazyLoad: CmsElementLazyLoadConfig[];
}

export type CmsPageConfig = {
    id: string;
    elements: CmsElementConfig[];
}

export type LazyLoadTypes = 'image';

export type UseLazyLoad<T = HTMLElement> = {
    isElementLoaded: (element: T) => boolean;
    watchElementLoaded: (element: T, cb: () => void) => void;
}
