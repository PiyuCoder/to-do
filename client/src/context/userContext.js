import React, { createContext, useEffect, useState } from "react";
import { getUserData } from "../api/api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState();
  const [user, setUser] = useState("");
  const [token, setToken] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [flag, setFlag] = useState(true);

  console.log(user);

  useEffect(() => {
    const fetch = async () => {
      setToken(localStorage.getItem("token"));
      if (token) {
        try {
          //Fetch the data
          const res = await getUserData(token);
          if (res?.data?.success) {
            setUser(res?.data?.name);
            setData(res?.data?.taskdata);
            setTimeout(() => {
              setIsLoading(false);
            }, 2000);
          }

          console.log(res);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetch();
  }, [setData, token, flag]);
  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
        user,
        setUser,
        data,
        setData,
        setToken,
        token,
        isLoading,
        setIsLoading,
        flag,
        setFlag,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
