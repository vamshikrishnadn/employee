import React, { useState, useEffect } from 'react';
import AppTable from '../../layouts/AppTable';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  getEmployees,
  allDepartments,
  addUsersToDepartment,
} from '../../../store/actions/DepartmentActions';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { PencilSquare, TrashFill } from 'react-bootstrap-icons';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import AppModal from '../../layouts/AppModal';

const Employees = () => {
  const dispatch = useDispatch();

  // state
  const [activeItem, setActiveItem] = useState(1);
  const [activeLength, setActiveLength] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [employeeIds, setEmployeeIds] = useState([]);
  const [data, setData] = useState({ category: 'HR' });

  // selectors
  const token = useSelector(state => state.auth?.authDetails?.token);
  const { allEmployees } = useSelector(state => state.department);
  const rows = useSelector(state => state.department?.allEmployees?.employees);
  const departments = useSelector(state => state.department?.allDepartments);
  console.log('🚀 ~ file: Employees.js:35 ~ Employees ~ departments:', departments);

  const columns = ['Name', 'Email', 'Created At'];
  const { btnLoader } = useSelector(state => state.app);

  useEffect(() => {
    dispatch(allDepartments(token));
  }, []);

  useEffect(() => {
    dispatch(getEmployees(token, activeItem));
  }, [activeItem]);

  useEffect(() => {
    if (allEmployees) {
      setActiveLength(Math.ceil(allEmployees?.count / 5));
    }
  }, []);

  const layoutElements = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Enter name',
      required: true,
    },
    {
      name: 'salary',
      type: 'number',
      required: true,
      placeholder: 'Enter salary',
    },
    {
      name: 'location',
      type: 'text',
      required: false,
      placeholder: 'Enter location',
    },
  ];

  const renderPaginationItems = () => {
    let items = [];
    for (let number = 1; number <= Math.ceil(allEmployees?.count / 5); number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === activeItem}
          onClick={() => setActiveItem(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return items;
  };

  const handleAddDepartment = () => {
    setShowModal(true);
  };

  const handleCheckBoxChange = e => {
    console.log('e', e);
    if (e.target.checked) {
      setEmployeeIds([...employeeIds, e.target.value]);
    } else {
      const filterIds = employeeIds.filter(id => id !== e.target.value);
      setEmployeeIds(filterIds);
    }
  };

  const handleSubmit = () => {
    dispatch(addUsersToDepartment(token, { employeeIds }, data?.department, setShowModal));
  };

  return allEmployees && departments ? (
    <section>
      <div className='container'>
        <div className='d-flex justify-content-between'>
          <h2 className='text-center text-success mb-4'>Employees</h2>
          <button
            className='btn btn-success my-auto'
            onClick={handleAddDepartment}
            type='button'
            disabled={employeeIds.length === 0}
          >
            Assign
          </button>
        </div>
        <Table striped bordered hover variant='light' responsive className='text-center'>
          <thead>
            <tr>
              <th></th>
              {columns?.map((column, i) => (
                <th key={i}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <h6 className='text-center text-danger'>No records found</h6>
            ) : (
              rows?.map((row, ri) => (
                <tr key={ri}>
                  <td>
                    <Form.Check
                      type={'checkbox'}
                      name={row?._id}
                      value={row?._id}
                      onChange={handleCheckBoxChange}
                    />
                  </td>
                  <td className='text-capitalize'>{row?.name}</td>
                  <td>{row?.email}</td>
                  <td>{moment(row?.createdAt).format('ll')}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <div className='d-flex justify-content-center'>
          <Pagination>
            <Pagination.Item onClick={() => activeItem > 1 && setActiveItem(activeItem - 1)}>
              Prev
            </Pagination.Item>
            {renderPaginationItems()}
            <Pagination.Item
              onClick={() => activeLength > activeItem && setActiveItem(activeItem + 1)}
            >
              Next
            </Pagination.Item>
          </Pagination>
        </div>
      </div>

      {/* modal for add and delete */}
      <AppModal
        size={'md'}
        title={'Assign Employee'}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <p className='text-center' style={{ fontSize: '1.1rem' }}>
          Choose which department to be assigned to selected employees?
        </p>

        <div className='col-12 col-lg-10 mx-auto'>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>
              Department<span className='text-danger'>*</span>
            </Form.Label>
            <Form.Select
              aria-label='Default select example'
              onChange={e => setData({ ...data, department: e.target.value })}
              required
              value={data?.['department']}
            >
              <option>Select Department</option>
              {departments.map((option, i) => (
                <option value={option?._id}>{option?.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
        <div className='col-12 d-flex justify-content-center'>
          <div>
            <button
              className='btn btn-danger mx-3'
              onClick={() => setShowModal(false)}
              type='button'
            >
              Cancel
            </button>
            <button
              className='btn btn-primary'
              type='button'
              onClick={handleSubmit}
              disabled={!data?.department}
            >
              {btnLoader && showModal ? <Spinner animation='border' size='sm' /> : 'Submit'}
            </button>
          </div>
        </div>
      </AppModal>
    </section>
  ) : (
    <div className='d-flex w-100 justify-content-center'>
      <Spinner animation='border' size='lg' />
    </div>
  );
};

export default Employees;
