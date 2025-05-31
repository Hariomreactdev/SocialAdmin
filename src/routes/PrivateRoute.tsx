import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../store/Store';

interface PrivateRouteProps {
  element: JSX.Element;
  module: string;
  permission: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, module, permission }) => {
  const user = useSelector((state: AppState) => state.authReducer.user);

  // Function to check if the user has permission
  const hasPermission = () => {
    if (user) {
      // if (user.role === 'ADMIN') {
      //   return true;
      // } else if (user?.permissions) {
      //   const modulePermissions = user.permissions.find((item: any) => item.module === module);
      //   return modulePermissions?.[permission] ? modulePermissions[permission] : false;
      // }
    }
    return true;
  };

  return hasPermission() ? element : <Navigate to="/auth/404" />;
};

export default PrivateRoute;
