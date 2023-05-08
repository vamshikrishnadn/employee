export default (state = {}, action) => {
  switch (action.type) {
    case 'QUERY_TASK_ONE':
      return {
        ...state,
        queryTaskOne: [...action.payload],
      };
    case 'QUERY_TASK_TWO':
      return {
        ...state,
        queryTaskTwo: [...action.payload],
      };

    default:
      return state;
  }
};
