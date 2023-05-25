import asinActions from "./action";

const initialState = {};

const reducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case asinActions.types.UPDATE_STATE:
      return {
        ...state,
        ...payload.state,
      };

    default:
      return state;
  }
};

export default reducer;
