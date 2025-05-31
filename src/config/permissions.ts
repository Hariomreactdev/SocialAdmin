export const roles = {
  SUPER_ADMIN: 'super_admin',
  SELLER: 'seller',
  CONSUMER: 'consumer',
};

export const permissions = {
  DASHBOARD: 'dashboard',
  USERS: 'users',
};

export const rolePermissions = {
  [roles.SUPER_ADMIN]: [permissions.DASHBOARD, permissions.USERS],
  [roles.SELLER]: [permissions.DASHBOARD],
  [roles.CONSUMER]: [permissions.DASHBOARD],
};
