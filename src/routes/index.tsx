import React from 'react';
import { Routes as RDOMRoutes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import Route from './Route';


const Routes: React.FC = () => (
  <RDOMRoutes>
    <Route path="/" component={SignIn} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
  </RDOMRoutes>
);

export default Routes;
