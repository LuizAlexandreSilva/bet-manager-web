import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  isAllowed: boolean;
  redirectPath?: string;
  children?: JSX.Element;
};

export const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/signin',
  children,
}: Props) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children || <Outlet />;
};
