import { createContext, useState } from "react";

export const UserInfoContext = createContext({
  userInfo: {},
});

export const UserInfoProvider = ({ children }) => {
  const userInfoData = {
    name: "Oskar Danielczyk",
    walletReturn: 23.6,
    walletBalance: 14986,
    walletDayChange: -1.3,
  };

  const userInfo = useState(userInfoData);
  const value = userInfo;

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
};
