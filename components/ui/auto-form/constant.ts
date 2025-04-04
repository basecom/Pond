import type { InputComponents } from './interface';
import AutoFormFieldArray from './UiAutoFormFieldArray.vue';
import AutoFormFieldBoolean from './UiAutoFormFieldBoolean.vue';
import AutoFormFieldDate from './UiAutoFormFieldDate.vue';
import AutoFormFieldEnum from './UiAutoFormFieldEnum.vue';
import AutoFormFieldFile from './UiAutoFormFieldFile.vue';
import AutoFormFieldInput from './UiAutoFormFieldInput.vue';
import AutoFormFieldNumber from './UiAutoFormFieldNumber.vue';
import AutoFormFieldObject from './UiAutoFormFieldObject.vue';

export const INPUT_COMPONENTS: InputComponents = {
    date: AutoFormFieldDate,
    select: AutoFormFieldEnum,
    radio: AutoFormFieldEnum,
    checkbox: AutoFormFieldBoolean,
    switch: AutoFormFieldBoolean,
    textarea: AutoFormFieldInput,
    number: AutoFormFieldNumber,
    string: AutoFormFieldInput,
    file: AutoFormFieldFile,
    array: AutoFormFieldArray,
    object: AutoFormFieldObject,
};

/**
 * Define handlers for specific Zod types.
 * You can expand this object to support more types.
 */
export const DEFAULT_ZOD_HANDLERS: {
  [key: string]: keyof typeof INPUT_COMPONENTS
} = {
    ZodString: 'string',
    ZodBoolean: 'checkbox',
    ZodDate: 'date',
    ZodEnum: 'select',
    ZodNativeEnum: 'select',
    ZodNumber: 'number',
    ZodArray: 'array',
    ZodObject: 'object',
};
