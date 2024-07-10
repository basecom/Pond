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
            },
            white: '#FFFFFF', // Here for compatibility with shopware cms
            black: '#000000', // Here for compatibility with shopware cms
        },
        extend: {
            inset: {
                '1/2-full-width': 'calc(-50dvw + 50%)',
            },
            boxShadow: {
                'header-flyout': '0px 3px 7px -2px rgba(35, 35, 35, 0.10)',
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
