const UserReducer = (state, action) => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
        error: false,
        success: true,
        loading: false,
        message: "Success",
      };
    case "REGISTER_USER":
      return {
        ...state,
        user: action.payload,
        error: false,
        success: true,
        loading: false,
        message: "Registered Successfully",
      };
    case "LOGIN_USER":
      return {
        ...state,
        user: action.payload,
        error: false,
        success: true,
        loading: false,
        message: "Logged in Successfully",
      };
    case "LOGOUT_USER":
      return {
        ...state,
        user: null,
        error: false,
        success: true,
        loading: false,
        message: "Logged out Successfully",
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default UserReducer;
