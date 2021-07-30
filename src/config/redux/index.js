import { createStore } from 'redux';

// globalReducer
const initialState = {
  popup: false,
  isLogin: false,
  isLoading: false,
  user: {},
  notes: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_LOADING':
      return {
        ...state,
        isLoading: action.value,
      };
    case 'CHANGE_LOGIN':
      return {
        ...state,
        isLogin: action.value,
      };
    case 'CHANGE_USER':
      return {
        ...state,
        user: {
          email: action.value.user.email,
          uid: action.value.user.uid,
          emailVerified: action.value.user.emailVerified,
          refreshToken: action.value.user.refreshToken,
        },
      };
    case 'SET_NOTES':
      return {
        ...state,
        notes: action.value,
      };
    default:
      return state;
  }
};

// globalStore
const store = createStore(reducer);

export default store;
