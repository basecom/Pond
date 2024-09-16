/**
 * This function returns the breadcrumb hierarchy for static pages, such as account and checkout.
 * Options can be defined to e.g. display only parts of the hierarchy or to alter its structure.
 */
export function useStaticBreadcrumbs() {
    const checkoutBreadcrumbs = ({ index, orderId }: { index: number; orderId?: string }) => {
        const breadcrumbs = [
            {
                name: 'Cart',
                path: '/checkout/cart',
            },
            {
                name: 'Checkout',
                path: '/checkout/confirm',
            },
            {
                name: 'Order',
                path: orderId ? '/checkout/finish/' + orderId : '/checkout/finish',
            },
        ];

        return breadcrumbs.slice(0, index + 1);
    };

    const accountBreadcrumbs = ({ type }: { type?: string }) => {
        const breadcrumbs = [
            {
                name: 'Account',
                path: '/account',
            },
        ];

        if (type === 'login') {
            breadcrumbs.push({
                name: 'Login',
                path: '/account/login',
            });
        } else if (type === 'register') {
            breadcrumbs.push({
                name: 'Register',
                path: '/account/register',
            });
        }

        return breadcrumbs;
    };

    return { checkoutBreadcrumbs, accountBreadcrumbs };
}
