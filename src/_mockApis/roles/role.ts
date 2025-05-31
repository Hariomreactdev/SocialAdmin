import mock from '../mock';
import store from '@/store/Store';
import { AddRole } from '@/store/apps/role/role';

interface DataType {
  id: number;
  slug: string;
  name: string;
}

export const RoleList: DataType[] = [];

const createSlug = (name: string) => {
  return name
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace from both ends
    .replace(/[\s\W-]+/g, '-') // Replace spaces and special characters with '-'
    .replace(/^-+|-+$/g, ''); // Remove leading or trailing dashes
};

mock.onGet('/api/data/roles').reply(() => {
  const roles = store.getState().RoleReducer.roles;

  return [200, JSON.parse(JSON.stringify(roles))];
});

mock.onPost('/api/data/roles').reply((config) => {
  const newRole = JSON.parse(config.data); // Get new role from request body
  newRole.id = store.getState().RoleReducer.roles.length + 1;
  newRole.slug = createSlug(newRole.name);
  // Dispatch action to update Redux store
  store.dispatch(AddRole([...store.getState().RoleReducer.roles, newRole]));

  return [201, { success: true }];
});

export default RoleList;
