import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '@/store/Store';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import PrivateRoute from './PrivateRoute';
import { ROUTES } from './routerPath';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));
const ResetPassword = Loadable(lazy(() => import('../views/authentication/auth1/ResetPassword')));

const Error = Loadable(lazy(() => import('../views/authentication/Error')));

const Dashboard = Loadable(lazy(() => import('@/views/dashboard/Modern')));

// Users
const Users = Loadable(lazy(() => import('../views/users')));
const UsersAdd = Loadable(lazy(() => import('../views/users/create')));
const UsersView = Loadable(lazy(() => import('../views/users/view')));

// Sub Users
const SubAdminUsers = Loadable(lazy(() => import('../views/subadmins')));
const SubUsersAdd = Loadable(lazy(() => import('../views/subadmins/create')));
const SubAdminView = Loadable(lazy(() => import('../views/subadmins/view')));

// Categories
const Categories = Loadable(lazy(() => import('../views/categories')));
const CategoriesAdd = Loadable(lazy(() => import('../views/categories/create')));
const CategoriesView = Loadable(lazy(() => import('../views/categories/view')));

// Modules
const ModulesList = Loadable(lazy(() => import('../views/modules')));
const ModulesAdd = Loadable(lazy(() => import('../views/modules/create')));
const ModulesView = Loadable(lazy(() => import('../views/modules/view')));

// Permissions
const PermissionsList = Loadable(lazy(() => import('../views/permissions')));
const PermissionsAdd = Loadable(lazy(() => import('../views/permissions/create')));
const PermissionsView = Loadable(lazy(() => import('../views/permissions/view')));

// Roles
const RolesList = Loadable(lazy(() => import('../views/roles')));
const RolesAdd = Loadable(lazy(() => import('../views/roles/create')));

// Account Settings
const ChangePassword = Loadable(lazy(() => import('../views/account-settings/ChangePassword')));
const AppSettings = Loadable(lazy(() => import('../views/account-settings/AppSettings')));

// CMS
const CMSList = Loadable(lazy(() => import('../views/cms')));
const CMSAdd = Loadable(lazy(() => import('../views/cms/create')));


const useAppRoutes = () => {
  const user = useSelector((state: AppState) => state.authReducer.user);
  const isLoggedIn = user !== null;

  const protectedRoutes = [
    {
      path: ROUTES.ROOT.BASE,
      element: <FullLayout />,
      children: [
        { path: ROUTES.ROOT.BASE, element: <Navigate to={ROUTES.ROOT.DASHBOARD} /> },
        {
          path: ROUTES.ROOT.DASHBOARD,
          element: (
            <PrivateRoute
              element={<Dashboard />}
              module={ROUTES.CATEGORY.MODULE}
              permission={ROUTES.CATEGORY.PERMISSIONS.LIST}
            />
          ),
        },
        // Account Settings Routes
        {
          path: ROUTES.ACCOUNT_SETTINGS.CHANGE_PASSWORD,
          element: (
            <PrivateRoute
              element={<ChangePassword />}
              module={ROUTES.ACCOUNT_SETTINGS.MODULE}
              permission={ROUTES.ACCOUNT_SETTINGS.PERMISSIONS.CHANGE_PASSWORD}
            />
          ),
        },
 // App Settings Routes
 {
  path: ROUTES.ACCOUNT_SETTINGS.APP_SETTINGS,
  element: (
    <PrivateRoute
      element={<AppSettings />}
      module={ROUTES.ACCOUNT_SETTINGS.MODULE}
      permission={ROUTES.ACCOUNT_SETTINGS.PERMISSIONS.APP_SETTINGS}
    />
  ),
},
 //CMS
 {
  path: ROUTES.CMS.LIST,
  element: (
    <PrivateRoute
      element={<CMSList />}
      module={ROUTES.CMS.MODULE}
      permission={ROUTES.CMS.PERMISSIONS.LIST} 
    />
  ),
},
{
  path: ROUTES.CMS.ADD,
  element: (
    <PrivateRoute
      element={<CMSAdd />}
      module={ROUTES.CMS.MODULE}
      permission={ROUTES.CMS.PERMISSIONS.CREATE} 
    />
  ),
},
{
  path: ROUTES.CMS.EDIT,
  element: (
    <PrivateRoute
      element={<CMSAdd />}
      module={ROUTES.CMS.MODULE}
      permission={ROUTES.CMS.PERMISSIONS.UPDATE} 
    />
  ),
},
        {
          path: ROUTES.ACCOUNT_SETTINGS.APP_SETTINGS,
          element: (
            <PrivateRoute
              element={<AppSettings />}
              module={ROUTES.ACCOUNT_SETTINGS.MODULE}
              permission={ROUTES.ACCOUNT_SETTINGS.PERMISSIONS.APP_SETTINGS}
            />
          ),
        },

        // Users Module Routes
        {
          path: ROUTES.USERS.LIST,
          element: (
            <PrivateRoute
              element={<Users />}
              module={ROUTES.USERS.MODULE}
              permission={ROUTES.USERS.PERMISSIONS.LIST}
            />
          ),
        },
        {
          path: ROUTES.USERS.ADD,
          element: (
            <PrivateRoute
              element={<UsersAdd />}
              module={ROUTES.USERS.MODULE}
              permission={ROUTES.USERS.PERMISSIONS.CREATE}
            />
          ),
        },
        {
          path: ROUTES.USERS.EDIT,
          element: (
            <PrivateRoute
              element={<UsersAdd />}
              module={ROUTES.USERS.MODULE}
              permission={ROUTES.USERS.PERMISSIONS.UPDATE}
            />
          ),
        },
        {
          path: ROUTES.USERS.VIEW,
          element: (
            <PrivateRoute
              element={<UsersView />}
              module={ROUTES.USERS.MODULE}
              permission={ROUTES.USERS.PERMISSIONS.VIEW}
            />
          ),
        },

        // Sub Admins Module Routes
        {
          path: ROUTES.ADMINS.LIST,
          element: (
            <PrivateRoute
              element={<SubAdminUsers />}
              module={ROUTES.ADMINS.MODULE}
              permission={ROUTES.ADMINS.PERMISSIONS.LIST}
            />
          ),
        },
        {
          path: ROUTES.ADMINS.ADD,
          element: (
            <PrivateRoute
              element={<SubUsersAdd />}
              module={ROUTES.ADMINS.MODULE}
              permission={ROUTES.ADMINS.PERMISSIONS.CREATE}
            />
          ),
        },
        {
          path: ROUTES.ADMINS.EDIT,
          element: (
            <PrivateRoute
              element={<SubUsersAdd />}
              module={ROUTES.ADMINS.MODULE}
              permission={ROUTES.ADMINS.PERMISSIONS.UPDATE}
            />
          ),
        },
        {
          path: ROUTES.USERS.VIEW,
          element: (
            <PrivateRoute
              element={<SubAdminView />}
              module={ROUTES.ADMINS.MODULE}
              permission={ROUTES.ADMINS.PERMISSIONS.VIEW}
            />
          ),
        },

        // Categories Routes
        {
          path: ROUTES.CATEGORY.LIST,
          element: (
            <PrivateRoute
              element={<Categories />}
              module={ROUTES.CATEGORY.MODULE}
              permission={ROUTES.CATEGORY.PERMISSIONS.LIST}
            />
          ),
        },
        {
          path: ROUTES.CATEGORY.ADD,
          element: (
            <PrivateRoute
              element={<CategoriesAdd />}
              module={ROUTES.CATEGORY.MODULE}
              permission={ROUTES.CATEGORY.PERMISSIONS.CREATE}
            />
          ),
        },
        {
          path: ROUTES.CATEGORY.EDIT,
          element: (
            <PrivateRoute
              element={<CategoriesAdd />}
              module={ROUTES.CATEGORY.MODULE}
              permission={ROUTES.CATEGORY.PERMISSIONS.UPDATE}
            />
          ),
        },
        {
          path: ROUTES.CATEGORY.VIEW,
          element: (
            <PrivateRoute
              element={<CategoriesView />}
              module={ROUTES.CATEGORY.MODULE}
              permission={ROUTES.CATEGORY.PERMISSIONS.VIEW}
            />
          ),
        },

        {
          path: ROUTES.ROLES.LIST,
          element: (
            <PrivateRoute
              element={<RolesList />}
              module={ROUTES.ROLES.MODULE}
              permission={ROUTES.ROLES.PERMISSIONS.LIST}
            />
          ),
        },
        {
          path: ROUTES.ROLES.ADD,
          element: (
            <PrivateRoute
              element={<RolesAdd />}
              module={ROUTES.ROLES.MODULE}
              permission={ROUTES.ROLES.PERMISSIONS.CREATE}
            />
          ),
        },
        {
          path: ROUTES.ROLES.EDIT,
          element: (
            <PrivateRoute
              element={<RolesAdd />}
              module={ROUTES.ROLES.MODULE}
              permission={ROUTES.ROLES.PERMISSIONS.UPDATE}
            />
          ),
        },

        {
          path: ROUTES.MODULES.LIST,
          element: (
            <PrivateRoute
              element={<ModulesList />}
              module={ROUTES.MODULES.MODULE}
              permission={ROUTES.MODULES.PERMISSIONS.LIST}
            />
          ),
        },
        {
          path: ROUTES.MODULES.ADD,
          element: (
            <PrivateRoute
              element={<ModulesAdd />}
              module={ROUTES.MODULES.MODULE}
              permission={ROUTES.MODULES.PERMISSIONS.CREATE}
            />
          ),
        },
        {
          path: ROUTES.MODULES.EDIT,
          element: (
            <PrivateRoute
              element={<ModulesAdd />}
              module={ROUTES.MODULES.MODULE}
              permission={ROUTES.MODULES.PERMISSIONS.UPDATE}
            />
          ),
        },
        {
          path: ROUTES.MODULES.VIEW,
          element: (
            <PrivateRoute
              element={<ModulesView />}
              module={ROUTES.MODULES.MODULE}
              permission={ROUTES.MODULES.PERMISSIONS.VIEW}
            />
          ),
        },

        {
          path: ROUTES.PERMISSIONS.LIST,
          element: (
            <PrivateRoute
              element={<PermissionsList />}
              module={ROUTES.PERMISSIONS.MODULE}
              permission={ROUTES.PERMISSIONS.PERMISSIONS.LIST}
            />
          ),
        },
        {
          path: ROUTES.PERMISSIONS.ADD,
          element: (
            <PrivateRoute
              element={<PermissionsAdd />}
              module={ROUTES.PERMISSIONS.MODULE}
              permission={ROUTES.PERMISSIONS.PERMISSIONS.CREATE}
            />
          ),
        },
        {
          path: ROUTES.PERMISSIONS.EDIT,
          element: (
            <PrivateRoute
              element={<PermissionsAdd />}
              module={ROUTES.PERMISSIONS.MODULE}
              permission={ROUTES.PERMISSIONS.PERMISSIONS.UPDATE}
            />
          ),
        },
        {
          path: ROUTES.PERMISSIONS.VIEW,
          element: (
            <PrivateRoute
              element={<PermissionsView />}
              module={ROUTES.PERMISSIONS.MODULE}
              permission={ROUTES.PERMISSIONS.PERMISSIONS.VIEW}
            />
          ),
        },

        { path: ROUTES.AUTH.NOT_FOUND, element: <Error /> },
        { path: '*', element: <Navigate to={ROUTES.AUTH.NOT_FOUND} /> },
      ],
    },
  ];

  const authRoutes = [
    {
      path: ROUTES.ROOT.BASE,
      element: <BlankLayout />,
      children: [
        { path: ROUTES.ROOT.BASE, element: <Navigate to={ROUTES.AUTH.LOGIN} /> },
        { path: ROUTES.AUTH.NOT_FOUND, element: <Error /> },
        { path: ROUTES.AUTH.LOGIN, element: <Login /> },
        { path: ROUTES.AUTH.FORGOT_PASSWORD, element: <ForgotPassword /> },
        { path: ROUTES.AUTH.RESET_PASSWORD, element: <ResetPassword /> },
        { path: '*', element: <Navigate to={ROUTES.AUTH.NOT_FOUND} /> },
      ],
    },
  ];

  return isLoggedIn ? protectedRoutes : authRoutes;
};

export default useAppRoutes;
