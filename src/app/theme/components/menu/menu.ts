import {Menu} from './menu.model';

export const horizontalMenuItems = [
	new Menu(1, 'HOME.NAV', '/', null, null, false, 0),
	new Menu(2, 'PRODUCT.TITLE', '/product', null, null, false, 0),
	new Menu(10, 'NAV.PAGES', null, null, null, true, 0),
	new Menu(12, 'NAV.CHEFS', '/chefs', null, null, false, 10),
	new Menu(13, 'NAV.CHEF', '/chefs/1', null, null, false, 10),
	new Menu(20, 'ACCOUNT.TITLE', null, null, null, true, 10),
	new Menu(21, 'LOGIN.TITLE', '/login', null, null, false, 20),
	new Menu(22, 'REGISTER.TITLE', '/register', null, null, false, 20),
	new Menu(90, 'NAV.ADMIN', '/admin', null, null, false, 0)
];
