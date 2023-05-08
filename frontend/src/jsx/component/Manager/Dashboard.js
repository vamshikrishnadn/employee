import React from 'react';
import Departments from './Departments';
import Employees from './Employees';

const ManagerDashboard = () => {
  return (
    <>
      <section id='departments'>
        <Departments />
      </section>
      <hr />
      <section id='employees'>
        <Employees />
      </section>
    </>
  );
};

export default ManagerDashboard;
