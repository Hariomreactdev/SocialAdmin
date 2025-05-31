import { access } from 'fs';

const apiPath = {
  auth: {
    login: {
      method: 'post',
      url: '/auth/login',
    } as const,
    logout: {
      method: 'post',
      url: '/auth/logout',
    } as const,
    forgot: {
      method: 'post',
      url: 'password/forgot',
    } as const,
    reset: {
      method: 'post',
      url: '/password/reset',
    } as const,
  },
  dashboard: {
    counts: {
      method: 'get',
      url: '/admin/dashboard',
    } as const,
  },
  user: {
    list: {
      method: 'get',
      url: '/admin/users?role=user',
    } as const,
    create: {
      method: 'post',
      url: '/admin/users',
    } as const,
    view: {
      method: 'get',
      url: '/admin/users/:id',
    } as const,
    update: {
      method: 'put',
      url: '/admin/users/edit/:id',
    } as const,
    status: {
      method: 'patch',
      url: '/admin/users/:id/status',
    } as const,
    delete: {
      method: 'delete',
      url: '/admin/users/:id',
    } as const,
  },
  subadmins: {
    list: {
      method: 'get',
      url: '/admin/users?role=admin&admin_type=admin',
    } as const,
    create: {
      method: 'post',
      url: '/admin/users/create-staff',
    } as const,
    delete: {
      method: 'delete',
      url: '/admin/users/delete-staff/:id',
    } as const,
  },
  category: {
    list: {
      method: 'get',
      url: '/category',
    } as const,
    create: {
      method: 'post',
      url: '/category',
    } as const,
    view: {
      method: 'get',
      url: '/category/:id',
    } as const,
    update: {
      method: 'put',
      url: '/category/:id',
    } as const,
    delete: {
      method: 'delete',
      url: '/category/:id',
    } as const,
  },
  cms: {
    list: {
      method: 'get',
      url: '/cms',
    } as const,
    create: {
      method: 'post',
      url: '/cms',
    } as const,
    view: {
      method: 'get',
      url: '/cms/:id',
    } as const,
    update: {
      method: 'put',
      url: '/cms/:id',
    } as const,
    delete: {
      method: 'delete',
      url: '/cms/:id',
    } as const,
  },
  roles: {
    list: {
      method: 'get',
      url: '/roles',
    } as const,
    create: {
      method: 'post',
      url: '/roles',
    } as const,
    view: {
      method: 'get',
      url: '/roles/:id',
    } as const,
    update: {
      method: 'put',
      url: '/roles/:id',
    } as const,
    delete: {
      method: 'delete',
      url: '/roles/:id',
    } as const,
    status: {
      method: 'patch',
      url: 'roles/:id/toggle-status',
    } as const,
  },
  modules: {
    list: {
      method: 'get',
      url: '/modules',
    } as const,
    create: {
      method: 'post',
      url: '/modules',
    } as const,
    view: {
      method: 'get',
      url: '/modules/:id',
    } as const,
    update: {
      method: 'put',
      url: '/modules/:id',
    } as const,
    delete: {
      method: 'delete',
      url: '/modules/:id',
    } as const,
  },
  permissions: {
    list: {
      method: 'get',
      url: '/permissions',
    } as const,
    create: {
      method: 'post',
      url: '/permissions',
    } as const,
    view: {
      method: 'get',
      url: '/permissions/:id',
    } as const,
    update: {
      method: 'put',
      url: '/permissions/:id',
    } as const,
    delete: {
      method: 'delete',
      url: '/permissions/:id',
    } as const,
  },
  accountSettings: {
    changePassword: { method: 'post', url: '/password/change' } as const,
    appSettings: { method: 'put', url: '/admin/settings' } as const,
    getAppSettings: { method: 'get', url: '/admin/settings' } as const,
  },
};

export default apiPath;
