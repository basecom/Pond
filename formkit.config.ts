import { rootClasses } from './formkit.theme';
import { createAutoAnimatePlugin, createFloatingLabelsPlugin } from '@formkit/addons';
import '@formkit/addons/css/floatingLabels';

export default {
    iconLoader: (iconName: string) => {
        const getIcon = async (iconkey: string) => {
            if (!iconkey) {
                return undefined;
            }
            try {
                const iconsImport = import.meta.glob('assets/icons/**/**.svg', {
                    as: 'raw',
                    eager: false,
                });

                const iconsImportElement = iconsImport[`/assets/icons/${iconkey}.svg`];
                if (!iconsImportElement) {
                    return undefined;
                }

                return (await iconsImportElement()) ?? undefined;
            } catch {
                return undefined;
            }
        };

        return fetch(`https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/svgs/solid/${iconName}.svg`)
            .then(async r => {
                const icon = await r.text();
                if (icon.startsWith('<svg')) {
                    // returns the icon from fontawesome
                    return icon;
                } else {
                    // returns the icon from our repository as fallback (or undefined if not found)
                    return getIcon(iconName);
                }
            })
            .catch(e => {
                console.error(e);
                return undefined;
            });
    },
    config: {
        rootClasses,
    },
    plugins: [
        createAutoAnimatePlugin(
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
        createFloatingLabelsPlugin({
            useAsDefault: true, // defaults to false
        }),
    ],
};
