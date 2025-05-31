import mock from '../mock';
import { Chance } from 'chance';

interface RolePermissionType {
  id: number | string;
  role: string;
  module: string;
  list: boolean;
  create: boolean;
  view: boolean;
  edit: boolean;
  delete: boolean;
}

const chance = new Chance();

export const RolePermission: RolePermissionType[] = [
  {
    id: 1,
    role: 'subadmin',
    module: 'dashboard',
    list: false,
    create: false,
    view: true,
    edit: false,
    delete: false,
  },
  {
    id: 2,
    role: 'subadmin',
    module: 'users',
    list: true,
    create: true,
    view: true,
    edit: true,
    delete: true,
  },
  {
    id: 3,
    role: 'staff',
    module: 'contacts',
    list: true,
    create: false,
    view: false,
    edit: false,
    delete: false,
  },
];

mock.onGet('/api/data/get_permissions_by_role').reply((config) => {
  const { requestRole } = config.params;

  const allPermissions: any = RolePermission.filter((item) => item.role === requestRole);

  return [200, allPermissions];
});

export default RolePermission;
