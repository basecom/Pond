import { cva, type VariantProps } from 'class-variance-authority';

export { default as UiBadge } from './UiBadge.vue';

export const badgeVariants = cva(
    'inline-flex items-center rounded-md border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-gray-900 text-gray-50 shadow hover:bg-gray-900/80',
                secondary:
                    'border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80',
                destructive:
                    'border-transparent bg-red-500 text-white shadow hover:bg-red-500/80',
                outline: 'text-gray-950',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>
