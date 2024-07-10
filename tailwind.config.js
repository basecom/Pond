/** @type {import('tailwindcss').Config} */
export default {
    theme: {
        fontFamily: {
            main: ['"PT Sans"', 'sans-serif'],
        },
        colors: {
            transparent: 'transparent',
            brand: {
                primary: '#0099FF',
                'primary-dark': '#006eff',
                secondary: '#FB4566',
                tertiary: '#465C54',
            },
            gray: {
                light: '#f7f7f7',
                dark: '#454545',
            },
            white: '#FFFFFF', // Here for compatibility with shopware cms
            black: '#000000', // Here for compatibility with shopware cms
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
