import { createContext, useReducer } from "react";
import UserReducer from "./UserReducer";

export const UserContext = createContext();

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

export const UserProvider = ({ children }) => {
  const initialState = {
    user: user ? user : null,
    error: false,
    success: false,
    loading: false,
    message: "",
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
