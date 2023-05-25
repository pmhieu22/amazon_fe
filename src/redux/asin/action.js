const prefix = "ASIN_";

const types = {
  UPDATE_STATE: prefix + "UPDATE_STATE",
};

const actions = {
  updateState: (state) => {
    return {
      type: types.UPDATE_STATE,
      payload: {
        state,
      },
    };
  },
};

const asinActions = { actions, types };

export default asinActions;
