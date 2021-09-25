import { authInitialState, alertInitialState } from '../initialState';
import { SET_ALERT, SET_AUTH, REMOVE_AUTH } from '../types';

export const authReducer = (state = authInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_AUTH:
      return { ...state, ...payload };

    case REMOVE_AUTH:
      return { ...authInitialState };

    default:
      return state;
  }
};

export const alertReducer = (state = alertInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return { ...state, ...payload };
    default:
      return state;
  }
};
