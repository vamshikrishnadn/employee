export const buttonLoader = status => dispatch => {
  dispatch({
    type: 'BUTTON_LOADER',
    payload: status,
  });
  return;
};
