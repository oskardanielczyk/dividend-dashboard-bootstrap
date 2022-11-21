import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({
  isLoggedIn: false,
  userLoginData: null,
  dataReload: false,
});

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLoginData, setUserLoginData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionData = sessionStorage.getItem("userData");
    if (sessionData) {
      setIsLoggedIn(true);
      setUserLoginData(JSON.parse(sessionStorage.getItem("userData")));
    }
  }, []);

  const login = (userData) => {
    setUserLoginData(userData);
    setIsLoggedIn(true);
    sessionStorage.setItem("userData", JSON.stringify(userData));
    navigate("/");
  };

  const signup = (userData) => {
    setUserLoginData(userData);
    setIsLoggedIn(true);
    sessionStorage.setItem("userData", JSON.stringify(userData));
    navigate("/");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserLoginData(null);
    sessionStorage.removeItem("userData");
    navigate("/auth");
  };

  const value = {
    userLoginData,
    setUserLoginData,
    isLoggedIn,
    setIsLoggedIn,
    login,
    signup,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
