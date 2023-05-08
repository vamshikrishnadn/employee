export default (state = {}, action) => {
  switch (action.type) {
    case 'BUTTON_LOADER':
      return {
        ...state,
        btnLoader: action.payload,
      };

    default:
      return state;
  }
};
