import global from './global.json';
import account from './account.json';
import checkout from './checkout.json';
import cms from './cms.json';
import composable from './composable.json';
import layout from './layout.json';
import navigation from './navigation.json';
import order from './order.json';
import product from './product.json';
import search from './search.json';
import shared from './shared.json';
import utility from './utility.json';
import cookie from './cookie.json';

export default {
    ...global,
    ...account,
    ...checkout,
    ...cms,
    ...composable,
    ...cookie,
    ...layout,
    ...navigation,
    ...order,
    ...product,
    ...search,
    ...shared,
    ...utility,
};
