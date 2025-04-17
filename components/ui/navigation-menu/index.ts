import { cva } from 'class-variance-authority';

export { default as UiNavigationMenu } from './UiNavigationMenu.vue';
export { default as UiNavigationMenuContent } from './UiNavigationMenuContent.vue';
export { default as UiNavigationMenuIndicator } from './UiNavigationMenuIndicator.vue';
export { default as UiNavigationMenuItem } from './UiNavigationMenuItem.vue';
export { default as UiNavigationMenuLink } from './UiNavigationMenuLink.vue';
export { default as UiNavigationMenuList } from './UiNavigationMenuList.vue';
export { default as UiNavigationMenuTrigger } from './UiNavigationMenuTrigger.vue';
export { default as UiNavigationMenuViewport } from './UiNavigationMenuViewport.vue';

export const navigationMenuTriggerStyle = cva(
    'group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50',
);
