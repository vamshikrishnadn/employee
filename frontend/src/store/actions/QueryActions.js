import { queryTaskOneService, queryTaskTwoService } from '../services/QueryServices';

export const queryTaskOne = () => dispatch => {
  queryTaskOneService()
    .then(res => {
      dispatch({
        type: 'QUERY_TASK_ONE',
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

export const queryTaskTwo = () => dispatch => {
  queryTaskTwoService()
    .then(res => {
      dispatch({
        type: 'QUERY_TASK_TWO',
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
