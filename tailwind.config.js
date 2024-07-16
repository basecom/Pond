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
                },
                secondary: '#FB4566',
                tertiary: '#465C54',
            },
            gray: {
                light: '#F7F7F7',
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
        extend: {},
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
