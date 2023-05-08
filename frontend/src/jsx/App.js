import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import Dashboard from './component/Manager/Dashboard';
import NavBar from './layouts/NavBar';
import EmployeeDashboard from './component/Employee/EmployeeDashboard';
import QueryList from './component/Querry/QueryList';

const App = () => {
  const userType = useSelector(state => state.auth?.authDetails?.user?.role);
  const renderRoutes = () => {
    if (userType === 'employee') {
      return (
        <>
          <Route path='/login' element={<Login />} />;
          <Route path='/dashboard' element={<EmployeeDashboard />} />;
          <Route path='/query' element={<QueryList />} />;
          <Route path='*' element={<Navigate to='/dashboard' replace />} />
        </>
      );
    } else if (userType === 'manager') {
      return (
        <>
          <Route path='/login' element={<Login />} />;
          <Route path='/query' element={<QueryList />} />;
          <Route path='/dashboard' element={<Dashboard />} />;
          <Route path='*' element={<Navigate to='/dashboard' replace />} />
        </>
      );
    } else {
      return (
        <>
          <Route path='/login' element={<Login />} />;
          <Route path='/register' element={<Register />} />;
          <Route path='*' element={<Navigate to='/login' replace />} />
        </>
      );
    }
  };

  return (
    <>
      <BrowserRouter>
        {userType && (
          <>
            <NavBar />
          </>
        )}
        <Routes>{renderRoutes()}</Routes>
      </BrowserRouter>
      {/* <Login /> */}
    </>
  );
};

export default App;
