import React from 'react';
import { BrowserRouter, Route, Routes as RDOMRoutes } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import { ProtectedRoute } from './ProtectedRoute';

const Routes: React.FC = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <RDOMRoutes>
        <Route path="/signin" element={<SignIn />} />

        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </RDOMRoutes>
    </BrowserRouter>
  );
};

export default Routes;
