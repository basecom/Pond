/** @type {import('tailwindcss').Config} */
export default {
    theme: {
        fontFamily: {
            main: ['"PT Sans"', 'sans-serif'],
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            brand: {
                primary: {
                    DEFAULT: '#0099FF',
                    dark: '#006EFF',
                    light: '#89d0ff',
                },
                secondary: '#FB4566',
                tertiary: '#465C54',
            },
            gray: {
                light: '#F7F7F7',
                medium: '#E5E7EB',
                dark: '#6B7280',
                DEFAULT: '#A2A2A2',
            },
            white: '#FFFFFF', // Here for compatibility with shopware cms
            black: '#000000', // Here for compatibility with shopware cms
            status: {
                info: '#0099CC',
                success: '#669933',
                warning: '#FFCC00',
                important: '#FF9900',
                danger: '#CC0000',
            },
        },
        extend: {
            inset: {
                '1/2-full-width': 'calc(-50dvw + 50%)',
            },
            boxShadow: {
                'header-flyout': '0px 3px 7px -2px rgba(35, 35, 35, 0.10)',
            },
            gridTemplateColumns: {
                '2/3': 'minmax(0, 4fr) minmax(0, 8fr)',
            },
            width: {
                128: '32rem', // 512px
            },
            height: {
                '1lh': '1lh',
                '2lh': '2lh',
                '3lh': '3lh',
                '4lh': '4lh',
            },
            keyframes: {
                slideDown: {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                slideUp: {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
            },
            animation: {
                slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
                slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
            },
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
            screens: {
                DEFAULT: '1400px',
            },
        },
    },
    plugins: [],
};
