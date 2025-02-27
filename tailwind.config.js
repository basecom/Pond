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
                primary: '#0099FF',
            },
            white: '#FFFFFF', // Here for compatibility with shopware cms
            black: '#000000', // Here for compatibility with shopware cms
            gray: {
                50: '#fafafa',
                100: '#f4f4f5',
                200: '#e4e4e7',
                300: '#d4d4d8',
                400: '#9f9fa9',
                500: '#71717b',
                600: '#52525c',
                700: '#3f3f46',
                800: '#27272a',
                900: '#18181b',
                950: '#09090b',
            },
            red: {
                500: '#fb2c36',
            },
            yellow: {
                500: '#f0b100',
            },
            green: {
                500: '#00c950',
            },
            blue: {
                500: '#00a6f4',
            },
        },
        extend: {
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
        },
    },
    plugins: [require('tailwindcss-animate')],
};
