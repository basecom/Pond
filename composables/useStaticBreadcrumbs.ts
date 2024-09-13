export function useStaticBreadcrumbs() {
    const checkoutBreadcrumbs = (index: number, orderId?: string) => {
        const breadcrumbs = [
            {
                name: "Cart",
                path: "/checkout/cart",
            },
            {
                name: "Checkout",
                path: "/checkout/confirm",
            },
            {
                name: "Order",
                path: orderId ? "/checkout/finish/" + orderId : "/checkout/finish",
            },
        ];

        return breadcrumbs.slice(0, index + 1);
    };

    const accountBreadcrumbs = (type?: string) => {
        const breadcrumbs = [
            {
                name: "Account",
                path: "/account",
            }
        ];

        if (type ===  "login") {
            breadcrumbs.push({
                name: "Login",
                path: "/account/login",
            });
        } else if (type === "register") {
            breadcrumbs.push({
                name: "Register",
                path: "/account/register",
            });
        }

        return breadcrumbs;
    }

    return { checkoutBreadcrumbs, accountBreadcrumbs };
}