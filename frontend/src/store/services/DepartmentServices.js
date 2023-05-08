import axios from 'axios';
import { getConfig } from '../../config/config';

const { depUrl } = getConfig();

const config = token => {
  return {
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };
};

export const getUserDepartmentService = (token, page) =>
  axios.get(`${depUrl}/user?page=${page}`, config(token));

export const addDepartmentService = (token, values) =>
  axios.post(`${depUrl}/create`, values, config(token));

export const editDepartmentService = (token, values, id) => {
  delete values?._id;
  return axios.patch(`${depUrl}/${id}`, values, config(token));
};

export const deleteDepartmentService = (token, id) => {
  return axios.delete(`${depUrl}/${id}`, config(token));
};

export const getEmployeeService = (token, page) => {
  return axios.get(`${depUrl}/employees?page=${page}`, config(token));
};

export const allDepartmentsService = (token, page) => {
  return axios.get(`${depUrl}/alldepartemnts`, config(token));
};

export const addUsersToDepartmentService = (token, values, id) => {
  return axios.post(`${depUrl}/add/user/${id}`, values, config(token));
};

export const employeeDepartmentsService = (token, id) => {
  return axios.get(`${depUrl}/employee/departments/${id}`, config(token));
};
