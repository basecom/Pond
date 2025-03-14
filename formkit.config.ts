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

export default {
    iconLoader: (iconName: string) => {
        const getIcon = async (iconkey: string) => {
            if (!iconkey) {
                return undefined;
            }

            try {
                const iconsImport = import.meta.glob('assets/icons/**/**.svg', {
                    query: '?raw',
                    import: 'default',
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

        return getIcon(iconName)
            .then(async icon => {
                if (icon) {
                    // returns the icon from our repository
                    return icon;
                }
                // returns the icon from fontawesome as fallback (or undefined if not found)
                return fetch(`https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/svgs/solid/${iconName}.svg`)
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
                    });
            })
            .catch(e => {
                console.error(e);
                return undefined;
            });
    },
    locales: { de },
    config: {
        rootClasses,
    },
    plugins: Object.values(defaultPlugins),
    props: {
        decoratorIcon: 'check',
    },
};
