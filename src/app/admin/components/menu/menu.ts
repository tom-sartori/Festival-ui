import {Menu} from './menu.model';

export const menuItems = [
    new Menu (1, 'ADMIN_NAV.DASHBOARD', '/admin', null, 'dashboard', null, false, 0),
    new Menu (10, 'GAME.NAV', '/admin/game', null, 'casino', null, false, 0),
    new Menu (20, 'ZONE.NAV', '/admin/zone', null, 'location_on', null, false, 0),
    new Menu (30, 'VOLUNTEER.NAV', '/admin/volunteer', null, 'groups', null, false, 0),
    new Menu (28, 'PRODUCT.TITLE', '/admin/products', null, 'add_circle_outline', null, false, 0),
    new Menu (40, 'ADMIN_NAV.USERS', '/admin/users', null, 'group_add', null, false, 0),
    new Menu (80, 'ADMIN_NAV.ANALYTICS', '/admin/analytics', null, 'multiline_chart', null, false, 0),
]
