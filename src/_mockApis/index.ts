import mock from './mock';
import './contacts/ContactsData';
import './roles/role';
import './role_permissions/rolePermission';

mock.onAny().passThrough();
