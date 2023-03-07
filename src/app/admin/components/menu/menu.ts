import { Menu } from './menu.model';

export const menuItems = [
	new Menu(10, 'ZONE.NAV', '/admin/zone', null, 'location_on', null, false, 0),
	new Menu(20, 'GAME.NAV', '/admin/game', null, 'casino', null, false, 0),
	new Menu(30, 'VOLUNTEER.NAV', '/admin/volunteer', null, 'groups', null, false, 0)
];
