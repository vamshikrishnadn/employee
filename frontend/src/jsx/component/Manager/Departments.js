import React, { useState, useEffect } from 'react';
import AppTable from '../../layouts/AppTable';
import { useDispatch, useSelector } from 'react-redux';
import {
  addDepartment,
  editDepartment,
  userDepartments,
  deleteDepartment,
} from '../../../store/actions/DepartmentActions';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { PencilSquare, TrashFill } from 'react-bootstrap-icons';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import AppModal from '../../layouts/AppModal';

const Departments = () => {
  const dispatch = useDispatch();

  // state
  const [activeItem, setActiveItem] = useState(1);
  const [activeLength, setActiveLength] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [data, setData] = useState({ category: 'HR' });
  const [edit, setEdit] = useState(false);

  // selectors
  const token = useSelector(state => state.auth?.authDetails?.token);
  const { userDepartment } = useSelector(state => state.department);
  const rows = useSelector(state => state.department?.userDepartment?.department);
  const columns = [
    'Department Name',
    'Category',
    'Salary',
    'Location',
    'Name of employees',
    'Edit',
    'Delete',
  ];
  const { btnLoader } = useSelector(state => state.app);

  useEffect(() => {
    dispatch(userDepartments(token, activeItem));
  }, [activeItem]);

  useEffect(() => {
    if (userDepartment) {
      setActiveLength(Math.ceil(userDepartment?.count / 5));
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

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const renderPaginationItems = () => {
    let items = [];
    for (let number = 1; number <= Math.ceil(userDepartment?.count / 5); number++) {
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

  const handleSubmit = e => {
    e.preventDefault();
    if (edit) {
      return dispatch(editDepartment(token, data, data?._id, setShowModal, activeItem));
    } else {
      dispatch(addDepartment(token, data, setShowModal, activeItem));
    }
  };

  const handleAddDepartment = () => {
    setShowModal(true);
    setData({ category: 'HR' });
    setEdit(false);
  };

  const handleDelete = () => {
    dispatch(deleteDepartment(token, data?._id, setDeleteModal, activeItem));
  };

  return userDepartment ? (
    <section>
      <div className='container'>
        <div className='d-flex justify-content-between'>
          <h2 className='text-center text-success mb-4'>Departments</h2>
          <button className='btn btn-success my-auto' onClick={handleAddDepartment} type='button'>
            Add
          </button>
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
            {rows.length === 0 ? (
              <h6 className='text-center text-danger'>No records found</h6>
            ) : (
              rows?.map((row, ri) => (
                <tr key={ri}>
                  <td className='text-capitalize'>{row?.name}</td>
                  <td>{row?.category}</td>
                  <td>{row?.salary}</td>
                  <td>{row?.location ?? '-'}</td>
                  <td>
                    {row?.employeeID?.length === 0
                      ? '-'
                      : row?.employeeID?.map(user => <span key={user?._id}>{user?.name}, </span>)}
                  </td>
                  <td>
                    <PencilSquare
                      className='cursor-pointer edit_icon'
                      onClick={() => {
                        setShowModal(true);
                        setData(row);
                        setEdit(true);
                      }}
                    />
                  </td>
                  <td>
                    <TrashFill
                      className='cursor-pointer trash_icon'
                      onClick={() => {
                        setDeleteModal(true);
                        setData(row);
                      }}
                    />
                  </td>
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
        title={'Delete Department'}
        showModal={deleteModal}
        setShowModal={setDeleteModal}
      >
        <p className='text-center' style={{ fontSize: '1.1rem' }}>
          Are you sure to delete this department?
        </p>
        <div className='col-12 d-flex justify-content-center'>
          <div>
            <button
              className='btn btn-danger mx-3'
              onClick={() => setDeleteModal(false)}
              type='button'
            >
              No
            </button>
            <button className='btn btn-primary' type='button' onClick={handleDelete}>
              {btnLoader && deleteModal ? <Spinner animation='border' size='sm' /> : 'Yes'}
            </button>
          </div>
        </div>
      </AppModal>

      {/* modal for add and delete */}
      <AppModal
        size={'lg'}
        title={edit ? 'Edit Department' : 'Add Department'}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <Form onSubmit={handleSubmit}>
          <div className='row'>
            {layoutElements?.map((element, i) => (
              <div className='col-12 col-lg-6' key={i}>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label className='text-capitalize'>
                    {element.name}
                    {element?.required && <span className='text-danger'>*</span>}
                  </Form.Label>
                  <Form.Control
                    type={element.type}
                    placeholder={element.placeholder}
                    name={element?.name}
                    required={element?.required}
                    value={data?.[element?.name]}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            ))}

            <div className='col-12 col-lg-6'>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>
                  Category<span className='text-danger'>*</span>
                </Form.Label>
                <Form.Select
                  aria-label='Default select example'
                  onChange={e => setData({ ...data, category: e.target.value })}
                  required
                  value={data?.['category']}
                >
                  {['HR', 'IT', 'Sales', 'Product Manager', 'Marketing'].map((option, i) => (
                    <option value={option}>{option}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>

            <div className='col-12 d-flex justify-content-end'>
              <div>
                <button
                  className='btn btn-danger mx-3'
                  onClick={() => setShowModal(false)}
                  type='button'
                >
                  Cancel
                </button>
                <button className='btn btn-primary' type='submit'>
                  {btnLoader && showModal ? <Spinner animation='border' size='sm' /> : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </Form>
      </AppModal>
    </section>
  ) : (
    <div className='d-flex w-100 justify-content-center'>
      <Spinner animation='border' size='lg' />
    </div>
  );
};

export default Departments;
