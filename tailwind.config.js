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
            gray: '#A2A2A2', 
            white: '#FFFFFF', // Here for compatibility with shopware cms
            black: '#000000', // Here for compatibility with shopware cms
            status: {
                info: '#0099CC',
                success: '#693',
                warning: '#fc0',
                danger: '#c00',
            },
            // we need to readd the zinc colors in order to display components correctly
            zinc: {
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
