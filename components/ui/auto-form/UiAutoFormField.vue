<script setup lang="ts" generic="U extends ZodAny">
import type { ZodAny } from 'zod';
import type { Config, ConfigItem, Shape } from './interface';
import { DEFAULT_ZOD_HANDLERS, INPUT_COMPONENTS } from './constant';
import useDependencies from './dependencies';

const props = defineProps<{
  fieldName: string
  shape: Shape
  config?: ConfigItem | Config<U>
}>();

const { handleError } = usePondHandleError();

const isValidConfig = (config: unknown): config is ConfigItem => (config as ConfigItem)?.component !== undefined;

const delegatedProps = computed(() => {
    if (['ZodObject', 'ZodArray'].includes(props.shape?.type))
        return { schema: props.shape?.schema };
    return undefined;
});

const getInputComponent = (shapeType: string | undefined) => {
    if (!shapeType) {
    // Handle the case where shapeType is undefined or empty
        handleError('[Pond][UiAutoFormField]: Undefined shapeType');
        return;
    }

    const componentKey = DEFAULT_ZOD_HANDLERS[shapeType];

    // Ensure that the componentKey is not undefined
    if (componentKey && componentKey in INPUT_COMPONENTS) {
        return INPUT_COMPONENTS[componentKey];
    }

    handleError(`[Pond][UiAutoFormField]: Invalid key ${componentKey}`);
};

const { isDisabled, isHidden, isRequired, overrideOptions } = useDependencies(props.fieldName);
</script>

<template>
    <component
        :is="isValidConfig(config)
            ? typeof config.component === 'string'
                ? INPUT_COMPONENTS[config.component!]
                : config.component
            : getInputComponent(shape?.type)"
        v-if="!isHidden"
        :field-name="fieldName"
        :label="shape.schema?.description"
        :required="isRequired || shape.required"
        :options="overrideOptions || shape.options"
        :disabled="isDisabled"
        :config="config"
        v-bind="delegatedProps"
    >
        <slot />
    </component>
</template>
