import { rootClasses } from './formkit.theme';
import { de } from '@formkit/i18n';
import { createAutoAnimatePlugin, createFloatingLabelsPlugin } from '@formkit/addons';
import '@formkit/addons/css/floatingLabels';

export const defaultPlugins = {
    autoAnimate: createAutoAnimatePlugin(
        {
            duration: 250,
            easing: 'ease-in-out',
        },
        {
            global: ['outer', 'inner'],
            form: ['form'],
            repeater: ['items'],
        },
    ),
    floatingLabels: createFloatingLabelsPlugin({
        useAsDefault: true,
    }),
};

const iconsConfig = import.meta.glob('assets/icons/**/**.svg', {
    query: '?raw',
    import: 'default',
    eager: true,
});

const icons = Object.keys(iconsConfig).reduce((acc, key) => {
    const iconName = key.replace('/assets/icons/', '').replace('.svg', '');

    acc[iconName] = iconsConfig[key];

    return acc;
}, {} as Record<string, unknown>);

export default {
    icons,
    iconLoader: (iconName: string) => 
        // returns the icon from fontawesome as fallback (or undefined if not found)
        fetch(`https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/svgs/solid/${iconName}.svg`)
            .then(async r => {
                const icon = await r.text();
                if (icon.startsWith('<svg')) {
                    // returns the icon from fontawesome
                    return icon;
                }
                // returns undefined if the icon is not found in either the local repository or the CDN
                return undefined;
            })
            .catch(e => {
                console.error(e);
                return undefined;
            })
    ,
    locales: { de },
    config: {
        rootClasses,
    },
    plugins: Object.values(defaultPlugins),
    props: {
        decoratorIcon: 'check',
    },
};
