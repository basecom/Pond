// import { useCategory, useShopwareContext } from '#imports';
// import type { Store } from 'pinia';
// import { type Ref, ref } from 'vue';
//
// export type UseProductListStoreReturn = {
//     loading: Ref<boolean>;
// };
//
// export type UseProductSearchListStoreConfig = {
//     id: string;
//     type: 'search';
// };
//
// export type UseProductSearchListStoreReturn = UseProductListStoreReturn & {
//     test: number;
// };
//
// export type UseProductCategoryListStoreConfig = {
//     id: string;
//     type: 'category';
// };
//
// export type UseProductCategoryListStoreReturn = UseProductListStoreReturn & {
//     test: string;
// };
//
// export function useProductListStore(
//     config: UseProductCategoryListStoreConfig,
// ): Store<string, UseProductCategoryListStoreReturn>;
//
// export function useProductListStore(
//     config: UseProductSearchListStoreConfig,
// ): Store<string, UseProductSearchListStoreReturn>;
//
// export function useProductListStore({
//     id,
//     type,
// }: UseProductCategoryListStoreConfig | UseProductSearchListStoreConfig):
//     | Store<string, UseProductCategoryListStoreReturn>
//     | Store<string, UseProductSearchListStoreReturn> {
//     return type === 'category'
//         ? defineStore(`productListing${id}`, categoryStore)()
//         : defineStore(`productListing${id}`, searchStore)();
// }
//
// const searchStore = (): UseProductSearchListStoreReturn => {
//     const { apiClient } = useShopwareContext();
//
//     const loading = ref(false);
//
//     return {
//         loading,
//         test: 1,
//     };
// };
//
// const categoryStore = (): UseProductCategoryListStoreReturn => {
//     const { category } = useCategory();
//     const { apiClient } = useShopwareContext();
//     const loading = ref(false);
//
//     return {
//         loading,
//         test: '1',
//     };
// };
