import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { queryTaskOne, queryTaskTwo } from '../../../store/actions/QueryActions';
import Spinner from 'react-bootstrap/Spinner';

const QueryList = () => {
  const dispatch = useDispatch();

  // selectors
  const queryOne = useSelector(state => state.query?.queryTaskOne);
  const queryTwo = useSelector(state => state.query?.queryTaskTwo);
  console.log('🚀 ~ file: QueryList.js:11 ~ QueryList ~ queryOne:', queryOne);

  const columns1 = ['Category', 'Location', 'Salary'];
  const columns2 = ['Category', 'Employee Names in Decreasing order', 'Location', 'Salary'];

  useEffect(() => {
    dispatch(queryTaskOne());
    dispatch(queryTaskTwo());
  }, []);

  return (
    <section>
      <div className='container'>
        <div>
          <b>
            1) Make a query that retrieves an employee/s who are in IT department and location name
            is starting from A (location may be aurangabad, ahmedabad, etc).{' '}
          </b>

          <p>
            <b>Condition: </b>{' '}
            {JSON.stringify(
              `await Department.find({ location: { $regex: /^a/, $options: 'i' }, category: 'IT', }).populate('employeeID');`
            )}
          </p>

          {queryOne ? (
            <Table striped bordered hover variant='light' responsive className='text-center'>
              <thead>
                <tr>
                  {columns1?.map((column, i) => (
                    <th key={i}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queryOne?.map((row, i) => (
                  <tr key={i}>
                    <td>{row?.category}</td>
                    <td>{row?.location}</td>
                    <td>{row?.salary}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className='d-flex w-100 justify-content-center'>
              <Spinner animation='border' size='lg' />
            </div>
          )}
        </div>

        <hr />

        <div>
          <b>
            2) Make a query that retrieves an employee/s who are in Sales department and descending
            order of employees name.{' '}
          </b>

          <p>
            <b>Condition: </b>{' '}
            {JSON.stringify(
              `await Department.find({ category: 'Sales' }).populate({ path: 'employeeID', options: { sort: { name: -1 } } });`
            )}
          </p>

          {queryTwo ? (
            <Table striped bordered hover variant='light' responsive className='text-center'>
              <thead>
                <tr>
                  {columns2?.map((column, i) => (
                    <th key={i}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queryTwo?.map((row, i) => (
                  <tr key={i}>
                    <td>{row?.category}</td>
                    <td>
                      {row?.employeeID.length === 0
                        ? '-'
                        : row?.employeeID?.map(user => <span key={user?._id}>{user?.name}, </span>)}
                    </td>
                    <td>{row?.location}</td>
                    <td>{row?.salary}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className='d-flex w-100 justify-content-center'>
              <Spinner animation='border' size='lg' />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QueryList;
