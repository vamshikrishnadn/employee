import React from 'react';
import Login from './component/Auth/Login';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Register from './component/Auth/Register';

const App = () => {
  const userType = '';
  const renderRoutes = () => {
    if (userType === 'employee') {
      return;
    } else if (userType === 'manager') {
    } else {
      return (
        <>
          <Route path='/' element={<Login />} />;
          <Route path='/register' element={<Register />} />;
          <Route path='*' element={<Navigate to='/' replace />} />
        </>
      );
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>{renderRoutes()}</Routes>
      </BrowserRouter>
      {/* <Login /> */}
    </>
  );
};

export default App;
