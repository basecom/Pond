import { cva, type VariantProps } from 'class-variance-authority';

export { default as Button } from './Button.vue';

export const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                default: 'bg-gray-900 text-gray-50 shadow hover:bg-gray-900/90',
                destructive:
          'bg-red-500 text-gray-50 shadow-sm hover:bg-red-500/90',
                outline:
          'border border-gray-200 bg-white shadow-sm hover:bg-gray-100 hover:text-gray-900',
                secondary:
          'bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-100/80',
                ghost: 'hover:bg-gray-100 hover:text-gray-900',
                link: 'text-gray-900 underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-9 px-4 py-2',
                xs: 'h-7 rounded px-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-10 rounded-md px-8',
                icon: 'size-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>
