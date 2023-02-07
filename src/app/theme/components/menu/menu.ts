import {Menu} from './menu.model';

export const horizontalMenuItems = [
	new Menu(1, 'HOME.NAV', '/', null, null, false, 0),
	new Menu(10, 'GAME.NAV', '/game', null, null, false, 0),
	new Menu(20, 'ZONE.NAV', '/zone', null, null, false, 0),
	new Menu(30, 'VOLUNTEER.NAV', '/volunteer', null, null, false, 0),
	new Menu(40, 'PRODUCT.TITLE', '/product', null, null, false, 0),
	new Menu(50, 'NAV.PAGES', null, null, null, true, 0),
	new Menu(51, 'NAV.CHEFS', '/chefs', null, null, false, 50),
	new Menu(52, 'NAV.CHEF', '/chefs/1', null, null, false, 50),
	new Menu(53, 'ACCOUNT.TITLE', null, null, null, true, 50),
	new Menu(54, 'LOGIN.TITLE', '/login', null, null, false, 50),
	new Menu(55, 'REGISTER.TITLE', '/register', null, null, false, 50),
	new Menu(90, 'NAV.ADMIN', '/admin', null, null, false, 0)
];
