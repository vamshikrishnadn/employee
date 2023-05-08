export default (state = {}, action) => {
  switch (action.type) {
    case 'USER_DEPARTMENTS':
      return {
        ...state,
        userDepartment: { ...action.payload },
      };
    case 'ALL_EMPLOYEES':
      return {
        ...state,
        allEmployees: { ...action.payload },
      };
    case 'ALL_DEPARTMENTS':
      return {
        ...state,
        allDepartments: [...action.payload],
      };
    case 'EMPLOYEE_DEPARTMENTS':
      return {
        ...state,
        employeeDepartments: [...action.payload],
      };

    default:
      return state;
  }
};
