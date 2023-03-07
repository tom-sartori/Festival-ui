import { Menu } from './menu.model';

export const horizontalMenuItems = [
	new Menu(1, 'HOME.NAV', '/', null, null, false, 0),
	new Menu(10, 'GAME.NAV', '/game', null, null, false, 0),
	new Menu(20, 'ZONE.NAV', '/zone', null, null, false, 0),
	new Menu(30, 'VOLUNTEER.NAV', '/volunteer', null, null, false, 0),
	new Menu(80, 'LOGIN.NAV', '/login', null, null, false, 0)
];

export const horizontalMenuItemsPrivate = [
	new Menu(1, 'HOME.NAV', '/', null, null, false, 0),
	new Menu(10, 'GAME.NAV', '/game', null, null, false, 0),
	new Menu(20, 'ZONE.NAV', '/zone', null, null, false, 0),
	new Menu(30, 'VOLUNTEER.NAV', '/volunteer', null, null, false, 0),
	new Menu(90, 'NAV.ADMIN', '/admin', null, null, false, 0),
	new Menu(100, 'LOGOUT.NAV', '/logout', null, null, false, 0)
];
