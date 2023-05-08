import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { employeeDepartments } from '../../../store/actions/DepartmentActions';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';

const EmployeeDashboard = () => {
  const dispatch = useDispatch();

  // selectors
  const token = useSelector(state => state.auth?.authDetails?.token);
  const userId = useSelector(state => state.auth?.authDetails?.user?._id);
  const departments = useSelector(state => state.department?.employeeDepartments);

  const columns = ['Sl. No.', 'Department Name', 'Category', 'Salary', 'Location'];

  console.log(
    '🚀 ~ file: EmployeeDashboard.js:12 ~ EmployeeDashboard ~ employeeDepartments:',
    departments
  );

  useEffect(() => {
    dispatch(employeeDepartments(token, userId));
  }, []);

  return departments ? (
    <section>
      <div className='container'>
        <div className='d-flex justify-content-center'>
          <h2 className='text-center text-success mb-4'>Allocated Departments</h2>
        </div>
        <Table striped bordered hover variant='light' responsive className='text-center'>
          <thead>
            <tr>
              {columns?.map((column, i) => (
                <th key={i}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {departments.length === 0
              ? 'No records found'
              : departments?.map((row, ri) => (
                  <tr key={ri}>
                    <td>{ri + 1}</td>
                    <td className='text-capitalize'>{row?.name}</td>
                    <td>{row?.category}</td>
                    <td>{row?.salary}</td>
                    <td>{row?.location ?? '-'}</td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </div>
    </section>
  ) : (
    <div className='d-flex w-100 justify-content-center'>
      <Spinner animation='border' size='lg' />
    </div>
  );
};

export default EmployeeDashboard;
