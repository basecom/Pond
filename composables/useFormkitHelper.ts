import type { ResolvedApiError } from '~/types/errors';
import type { Entity } from '@shopware-pwa/types';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';
import type { ComputedRef } from 'vue';
import type { FormkitFields, FormkitNode } from '~/types/formkit';

export function useFormkitHelper() {

    /**
     *  This function formats the object key of the submitted form fields since SW sometimes expects params to be an array
     *  while submitting `billingAddress[street]` is not recognized by the backend as an array  but as one string.
     */
    const formatFormFields = (fields: FormkitFields) => {
        const reformatted = {};

        for (const key in fields) {
            if (fields[key]) {
                const match = key.match(/^([^[]+)\[([^\]]+)]$/);
                if (match) {
                    const mainKey = match[1];
                    const subKey = match[2];

                    if (!reformatted[mainKey]) {
                        reformatted[mainKey] = {};
                    }
                    reformatted[mainKey][subKey] = fields[key];
                } else {
                    reformatted[key] = fields[key];
                }
            }
        }

        return reformatted;
    }

    /**
     *  This function formats EntityArrays to the structure of Array<{label: '', value: ''}>
     *  This is necessary/helpfull since thisways we don't have to create select options manually and allows us to use
     *  the placeholder function from formkit
     */
    const entityArrayToOptions = (arr: ComputedRef<Entity[]>, displayName = 'name', sorted: boolean = false) => {
        const mapped = arr.value.map(element => {
            return {
                label: getTranslatedProperty(element, displayName),
                value: element.id ?? element._uniqueIdentifier
            }
        });

        if (!sorted) {
            return mapped;
        }

        return mapped.sort((a, b) => a.label > b.label ? 1 : -1)
    }

    const errorOfField = (name: string, apiErrors: ResolvedApiError[]) => {
        return apiErrors?.filter(err => err.key === name).map(err => `${err.key}_${err.code}`) ?? []
    }

    const togglePasswordVisibility = (node: FormkitNode) => {
        node.props.suffixIcon = node.props.suffixIcon === 'lock' ? 'lock-open' : 'lock'
        node.type = node.type === 'password' ? 'text' : 'password'
    }

    return {
        formatFormFields,
        entityArrayToOptions,
        errorOfField,
        togglePasswordVisibility,
    };
}