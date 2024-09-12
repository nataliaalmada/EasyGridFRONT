import { createContext, useState, useContext, useEffect } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { decode } from "jsonwebtoken";

import api from "../utils/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState();

  async function loadUserFromCookies() {
    try {
      const token = getCookie(process.env.NEXT_PUBLIC_COOKIE_NAME);
      if (token) {
        console.log("Got a token in the cookies, let's see if it is valid");
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data } = await api.post("/public/validate");
        if (data.isvalid) {
          const { user } = decode(token);
          if (user) setUser(user);
          console.log("loadUserFromCookies:", user);
        }
      }
      setLoading(false);
    } catch (error) {
      logout();
      console.log(error);
    }
  }
  useEffect(() => {
    loadUserFromCookies();
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/public/login", { email, password });
    const { data } = response;
    console.log(response);
    if (data.token) {
      console.log("Got token");
      setCookie(process.env.NEXT_PUBLIC_COOKIE_NAME, data.token);
      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      const { data: dataValid } = await api.post("/public/validate");
      if (dataValid.isvalid) {
        setUser(data.user);
        return response;
      }
    }
    return response;
  };

  const logout = () => {
    deleteCookie(process.env.NEXT_PUBLIC_COOKIE_NAME);
    setUser(null);
    delete api.defaults.headers.Authorization;
    router.push("/auth/login");
  };

  const userRegister = async (name, email, password) => {
    try {
      const response = await api.post("/public/register", {
        name,
        email,
        password,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        loading,
        logout,
        userRegister,
        message,
        setMessage,
        loadUserFromCookies,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
