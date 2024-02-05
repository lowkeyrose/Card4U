export const RoleTypes = {
    none: 0,
    user: 1,
    business: 2,
    admin: 3
}

export const checkPermissions = (permissions, UserRoleType) => {
    return permissions.includes(UserRoleType)
}

export const pages = [
    { route: '/about', title: 'About' },
    { route: '/cards/favorite', title: 'Fav Cards', permissions: [RoleTypes.user, RoleTypes.business, RoleTypes.admin] },
    { route: '/business/cards', title: 'My Cards', permissions: [RoleTypes.business, RoleTypes.admin] },
    { route: '/admin/clients', title: 'Client Management', permissions: [RoleTypes.admin] },
    { route: '/login', title: 'Login', permissions: [RoleTypes.none] },
    { route: '/signup', title: 'Signup', permissions: [RoleTypes.none] },
];

export const settings = [
    { route: '/account', title: 'Account', permissions: [RoleTypes.user, RoleTypes.business] },
];