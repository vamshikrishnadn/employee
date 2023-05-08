import { toast } from 'react-toastify';
import {
  getUserDepartmentService,
  editDepartmentService,
  addDepartmentService,
  deleteDepartmentService,
  getEmployeeService,
  allDepartmentsService,
  addUsersToDepartmentService,
  employeeDepartmentsService,
} from '../services/DepartmentServices';
import { buttonLoader } from './AppActions';

export const userDepartments = (token, page) => dispatch => {
  getUserDepartmentService(token, page)
    .then(res => {
      dispatch({
        type: 'USER_DEPARTMENTS',
        payload: res.data.payload,
      });
      return;
    })
    .catch(error => {
      console.error(error);
      console.log(error);
      return;
    });
};

export const addDepartment = (token, values, setShowModal, page) => dispatch => {
  dispatch(buttonLoader(true));

  addDepartmentService(token, values)
    .then(res => {
      dispatch(buttonLoader(false));
      dispatch(allDepartments(token));
      toast.success('Successfully added.');
      setShowModal(false);
      dispatch(userDepartments(token, page));
      return;
    })
    .catch(error => {
      dispatch(buttonLoader(false));
      console.error(error);
      console.log(error);
      return;
    });
};

export const editDepartment = (token, values, id, setShowModal, page) => dispatch => {
  dispatch(buttonLoader(true));

  editDepartmentService(token, values, id)
    .then(res => {
      dispatch(buttonLoader(false));
      dispatch(allDepartments(token));
      toast.success('Successfully updated.');
      setShowModal(false);
      dispatch(userDepartments(token, page));
      return;
    })
    .catch(error => {
      dispatch(buttonLoader(false));
      console.error(error);
      console.log(error);
      return;
    });
};

export const deleteDepartment = (token, id, setShowModal, page) => dispatch => {
  dispatch(buttonLoader(true));

  deleteDepartmentService(token, id)
    .then(res => {
      dispatch(buttonLoader(false));
      dispatch(allDepartments(token));
      toast.success('Successfully deleted.');
      setShowModal(false);
      dispatch(userDepartments(token, page));
      return;
    })
    .catch(error => {
      dispatch(buttonLoader(false));
      console.error(error);
      console.log(error);
      return;
    });
};

export const getEmployees = (token, page) => dispatch => {
  getEmployeeService(token, page)
    .then(res => {
      dispatch({
        type: 'ALL_EMPLOYEES',
        payload: res.data.payload,
      });
      return;
    })
    .catch(error => {
      console.error(error);
      console.log(error);
      return;
    });
};

export const allDepartments = token => dispatch => {
  allDepartmentsService(token)
    .then(res => {
      dispatch({
        type: 'ALL_DEPARTMENTS',
        payload: res.data.payload,
      });
      return;
    })
    .catch(error => {
      console.error(error);
      console.log(error);
      return;
    });
};

export const addUsersToDepartment = (token, values, id, setShowModal) => dispatch => {
  dispatch(buttonLoader(true));
  addUsersToDepartmentService(token, values, id)
    .then(res => {
      dispatch(buttonLoader(false));
      toast.success('Successfully added');
      dispatch(userDepartments(token, 1));
      setShowModal(false);
      return;
    })
    .catch(error => {
      dispatch(buttonLoader(false));
      console.error(error);
      console.log(error);
      return;
    });
};

export const employeeDepartments = (token, id) => dispatch => {
  employeeDepartmentsService(token, id)
    .then(res => {
      dispatch({
        type: 'EMPLOYEE_DEPARTMENTS',
        payload: res.data.payload,
      });
      return;
    })
    .catch(error => {
      console.error(error);
      console.log(error);
      return;
    });
};


