import { toast } from 'react-toastify';
import { signupService, signinService } from '../services/AuthServices';
import { buttonLoader } from './AppActions';

export const registerUser = (formValues, navigate) => dispatch => {
  dispatch(buttonLoader(true));
  signupService(formValues)
    .then(res => {
      dispatch(buttonLoader(false));
      dispatch({
        type: 'USER_DETAILS',
        payload: res.data.payload,
      });
      navigate('/dashboard');
      return toast.success('Account created successfully.');
    })
    .catch(error => {
      dispatch(buttonLoader(false));
      console.error(error);
      console.log(error);
      return toast.error(error?.response?.data?.message);
    });
};

export const loginUser = (formValues, navigate) => dispatch => {
  dispatch(buttonLoader(true));
  signinService(formValues)
    .then(res => {
      dispatch(buttonLoader(false));
      dispatch({
        type: 'USER_DETAILS',
        payload: res.data.payload,
      });
      navigate('/dashboard');

      return toast.success('Logged in successfully.');
    })
    .catch(error => {
      console.error(error);
      console.log(error);
      dispatch(buttonLoader(false));
      return toast.error(error?.response?.data?.message);
    });
};

export const handleLogout = navigate => dispatch => {
  dispatch({
    type: 'USER_DETAILS',
    payload: null,
  });
  navigate('/');
  return toast.success('Logged out successfully');
};
