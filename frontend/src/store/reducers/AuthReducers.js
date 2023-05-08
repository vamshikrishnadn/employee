export default (state = {}, action) => {
  switch (action.type) {
    case 'USER_DETAILS':
      return {
        ...state,
        authDetails: { ...action.payload },
      };

    default:
      return state;
  }
};
