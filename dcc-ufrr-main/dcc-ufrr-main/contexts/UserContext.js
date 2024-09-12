import { createContext, useState, useContext, useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";
import { useAuth } from "./AuthContext";

import api from "../utils/api";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const { user, setUser } = useAuth();
  const [usersAll, setUsersAll] = useState([]);
  const [usersSize, setUsersSize] = useState(0);

  async function getUser() {
    try {
      const { data } = await api.get(`/users/get/${user?.email}`);
      if (data?.user) {
        setCookie(process.env.NEXT_PUBLIC_COOKIE_NAME, data.token);
        setUser(data.user);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getAllUsers() {
    try {
      const { data } = await api.get("/users/getall");
      if (data.users) {
        setUsersAll(data.users);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getSizeUsers() {
    try {
      const { data } = await api.get("/users/getsize");
      if (data.pages) {
        setUsersSize(data.pages);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const updateUser = async (id, dataForm) => {
    console.log(dataForm);
    try {
      const token = getCookie(process.env.NEXT_PUBLIC_COOKIE_NAME);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: resp } = await api.put(`/users/update/${id}`, {
          name: dataForm.name,
          email: dataForm.email,
          password: dataForm.password,
          role: dataForm.role,
          whatsapp: dataForm.whatsapp,
          data_nascimento: dataForm.data_nascimento,
          genero: dataForm.genero,
          endereco: dataForm.endereco,
          change_password: dataForm.change_password,
        });
        await getUser();
        getSizeUsers();

        return resp;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserActive = async (dataForm) => {
    try {
      const token = getCookie(process.env.NEXT_PUBLIC_COOKIE_NAME);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: resp } = await api.put(
          `/users/update-active/${dataForm.id}`,
          {
            active: dataForm.active,
          }
        );
        getAllUsers();

        return resp;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkpassword = async (email, password) => {
    const response = await api.post("/users/checkpassword", {
      email,
      password,
    });
    const { data } = response;
    console.log(response);
    console.log(data);
    return response;
  };

  useEffect(() => {
    getAllUsers();
    getSizeUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        usersSize,
        setUsersSize,
        getSizeUsers,
        getUser,
        updateUser,
        checkpassword,
        usersAll,
        updateUserActive,
        getAllUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
