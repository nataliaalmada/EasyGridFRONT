import { createContext, useState, useContext, useEffect } from "react";
import api from "../utils/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]); // Initialize users as an empty array

  const getAllUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data); // Ensure the data returned from the API is an array
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users, // Provide the users state
        getAllUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

