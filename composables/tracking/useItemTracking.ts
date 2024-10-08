import type { Schemas } from '@shopware/api-client/api-types';
import type { TrackingLineItem } from '../../types/analytics/line-item';

export type TrackingLineItemList = {
    id: string;
    name: string;
};

export type GetTrackingLineItemConfig = {
    item: Schemas['LineItem'];
    itemIndex: number;
    product: Schemas['Product'];
    list?: TrackingLineItemList;
    quantity?: number;
};

export type UseItemTrackingReturn = {
    getTrackingLineItem: (config: GetTrackingLineItemConfig) => TrackingLineItem;
};

export function useItemTracking(): UseItemTrackingReturn {
    const navigationStore = useNavigationStore();
    const { mainNavigationElements } = storeToRefs(navigationStore);
    const { sessionContext } = useSessionContext();

    const _getCategoryTree = (product: Schemas['Product']): Schemas['Category'][] => {
        const categoryTreeId = product.categoryTree ?? [];

        if (!mainNavigationElements.value) {
            return [];
        }

        return categoryTreeId.reduce(
            (categoryTree, categoryId) => {
                const currentCategoryLevel: Schemas['Category'][] =
                    categoryTree[categoryTree.length - 1]?.children ?? mainNavigationElements.value;
                const currentCategory = currentCategoryLevel.find(category => category.id === categoryId);

                if (currentCategory) {
                    categoryTree.push(currentCategory);
                }

                return categoryTree;
            },
            [] as Schemas['Category'][],
        );
    };

    const getTrackingLineItem = ({
        item,
        itemIndex,
        product,
        list,
        quantity,
    }: GetTrackingLineItemConfig): TrackingLineItem => {
        const payload = item.payload;
        const categoryTree = _getCategoryTree(product);

        const trackingLineItem: TrackingLineItem = {
            item_id: payload.productNumber,
            item_name: item.label!,
            affiliation: sessionContext.value.salesChannel.name,
            index: itemIndex,
            price: item?.price?.listPrice?.price ?? item?.price?.unitPrice ?? 0,
            quantity: quantity ?? 1,
        };

        if (item.price?.listPrice?.discount) {
            trackingLineItem.discount = item.price.listPrice.discount;
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

        return trackingLineItem;
    };

    return {
        getTrackingLineItem,
    };
}
