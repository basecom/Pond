import type { ResolvedApiError } from '~/types/errors';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';
import type { FormKitNode } from '@formkit/core';

export function useFormkitHelper() {
    /**
     *  This function formats EntityArrays to the structure of Array<{label: '', value: ''}>
     *  This is necessary/helpfull since thisways we don't have to create select options manually and allows us to use
     *  the placeholder function from formkit
     */
    const entityArrayToOptions = <T extends { id: string }>(
        arr: T[],
        displayName: keyof T,
        sorted: boolean = false,
    ) => {
        const mapped = arr.map(element => {
            return {
                label: getTranslatedProperty(element, displayName),
                value: element.id,
            };
        });

        if (!sorted) {
            return mapped;
        }

        return mapped.sort((a, b) => (a.label > b.label ? 1 : -1));
    };

    const errorOfField = (name: string, apiErrors: ResolvedApiError[]) => {
        return apiErrors?.filter(err => err.key === name).map(err => `${err.key}_${err.code}`) ?? [];
    };

    const togglePasswordVisibility = (node: FormKitNode) => {
        node.props.suffixIcon = node.props.suffixIcon === 'lock' ? 'lock-open' : 'lock';
        node.props.type = node.props.type === 'password' ? 'text' : 'password';
    };

    return {
        entityArrayToOptions,
        errorOfField,
        togglePasswordVisibility,
    };
}
