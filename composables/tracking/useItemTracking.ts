import type { Schemas } from '@shopware/api-client/api-types';
import type { TrackingLineItem } from '~/types/analytics/LineItem';

export type TrackingLineItemList = {
    id: string;
    name: string;
};

export type TrackingLineItemPromotion = {
    id: string;
    name: string;
};

export type GetTrackingLineItemConfig = {
    itemIndex: number;
    product: Schemas['Product'];
    price: Schemas['CalculatedPrice'];
    list?: TrackingLineItemList;
    promotion?: TrackingLineItemPromotion;
    quantity?: number;
};

export type UseItemTrackingReturn = {
    getTrackingItem: (config: GetTrackingLineItemConfig) => TrackingLineItem;
};

export function useItemTracking(): UseItemTrackingReturn {
    const navigationStore = useNavigationStore();
    const { mainNavigation } = storeToRefs(navigationStore);
    const { sessionContext } = useSessionContext();

    const _getCategoryTree = (product: Schemas['Product']): Schemas['Category'][] => {
        const categoryTreeId = product.categoryTree ?? [];

        if (!mainNavigation.value) {
            return [];
        }

        return categoryTreeId.reduce(
            (categoryTree, categoryId) => {
                const currentCategoryLevel: Schemas['Category'][] =
                    categoryTree[categoryTree.length - 1]?.children ?? mainNavigation?.value ?? [];
                const currentCategory = currentCategoryLevel.find(category => category.id === categoryId);

                if (currentCategory) {
                    categoryTree.push(currentCategory);
                }

                return categoryTree;
            },
            [] as Schemas['Category'][],
        );
    };

    const getTrackingItem = ({
        itemIndex,
        product,
        price,
        list,
        quantity,
        promotion,
    }: GetTrackingLineItemConfig): TrackingLineItem => {
        const categoryTree = _getCategoryTree(product);

        const trackingLineItem: TrackingLineItem = {
            item_id: product.productNumber,
            item_name: product.translated.name,
            affiliation: sessionContext.value?.salesChannel?.name,
            index: itemIndex,
            price: price?.listPrice?.price ?? price?.unitPrice ?? 0,
            quantity: quantity ?? 1,
        };

        if (price?.listPrice?.discount) {
            trackingLineItem.discount = price.listPrice.discount;
        }

        if (product.manufacturer) {
            trackingLineItem.item_brand = product.manufacturer.name;
        }

        if (categoryTree[0]) {
            trackingLineItem.item_category = categoryTree[0].name;
        }

        if (categoryTree[1]) {
            trackingLineItem.item_category2 = categoryTree[1].name;
        }

        if (categoryTree[2]) {
            trackingLineItem.item_category3 = categoryTree[2].name;
        }

        if (categoryTree[3]) {
            trackingLineItem.item_category4 = categoryTree[3].name;
        }

        if (categoryTree[4]) {
            trackingLineItem.item_category5 = categoryTree[4].name;
        }

        if (list) {
            trackingLineItem.item_list_id = list.id;
            trackingLineItem.item_list_name = list.name;
        }

        if (product.options?.length) {
            trackingLineItem.item_variant = product.options.map(option => option.name).join(', ');
        }

        if (promotion) {
            trackingLineItem.promotion_id = promotion.id;
            trackingLineItem.promotion_name = promotion.name;
        }

        return trackingLineItem;
    };

    return {
        getTrackingItem,
    };
}
