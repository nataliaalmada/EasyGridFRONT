// File: dcc-ufrr-main/contexts/ScheduleContext.js

import { createContext, useState, useContext, useEffect } from "react";
import api from "../utils/api";

const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [schedules, setSchedules] = useState([]); // Initialize as an empty array

  const getAllSchedules = async () => {
    try {
      const { data } = await api.get("/schedules");
      setSchedules(data); // Ensure the API returns an array
    } catch (error) {
      console.error("Failed to fetch schedules", error);
    }
  };

  useEffect(() => {
    getAllSchedules();
  }, []);

  return (
    <ScheduleContext.Provider
      value={{
        schedules, // Provide schedules state
        getAllSchedules,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => useContext(ScheduleContext);

