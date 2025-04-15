import type { ToastRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

import { cva, type VariantProps } from 'class-variance-authority';

export { default as UiToast } from './UiToast.vue';
export { default as UiToastAction } from './UiToastAction.vue';
export { default as UiToastClose } from './UiToastClose.vue';
export { default as UiToastDescription } from './UiToastDescription.vue';
export { default as UiToaster } from './UiToaster.vue';
export { default as UiToastProvider } from './UiToastProvider.vue';
export { default as UiToastTitle } from './UiToastTitle.vue';
export { default as UiToastViewport } from './UiToastViewport.vue';
export { toast, useToast } from './use-toast';

export const toastVariants = cva(
    'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border border-gray-200 p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--reka-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--reka-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
    {
        variants: {
            variant: {
                default: 'border bg-white text-gray-950',
                destructive:
                    'destructive group border-red-500 bg-red-500 text-gray-50',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

type ToastVariants = VariantProps<typeof toastVariants>

export interface ToastProps extends ToastRootProps {
  class?: HTMLAttributes['class']
  variant?: ToastVariants['variant']
  onOpenChange?: ((value: boolean) => void) | undefined
}
