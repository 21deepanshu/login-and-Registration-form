const initialState = {
  isAuthenticated: false,
  user: null,
  userData: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        isAuthenticated: false,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "SIGNUP_FAIL":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload,
      };
    case "SAVE_USER_DATA":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        userData: action.payload,
        loading: null,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
