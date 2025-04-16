import { cva, type VariantProps } from 'class-variance-authority';

export { default as UiAlert } from './UiAlert.vue';
export { default as UiAlertDescription } from './UiAlertDescription.vue';
export { default as UiAlertTitle } from './UiAlertTitle.vue';

export const alertVariants = cva(
    'relative w-full rounded-lg border border-gray-200 px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-gray-950 [&>svg~*]:pl-7',
    {
        variants: {
            variant: {
                default: 'bg-white text-gray-950',
                destructive: 'border-red-500/50 text-red-500',
                successful: 'border-green-500/50 text-green-500',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export type AlertVariants = VariantProps<typeof alertVariants>
