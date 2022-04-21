import { Navigate, Outlet } from 'react-router-dom';
import { SignedLayout } from '../components/SignedLayout';

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

  return <SignedLayout>{children || <Outlet />}</SignedLayout>;
};
