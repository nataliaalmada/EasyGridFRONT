// File: dcc-ufrr-main/pages/admin/schedule/index.jsx

import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../../../utils/api";

export default function ManageSchedule() {
  const [currentSchedules, setCurrentSchedules] = useState([]);
  const [previousSchedules, setPreviousSchedules] = useState([]);
  const [nextSchedules, setNextSchedules] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const { data: current } = await api.get("/schedules/current");
      const { data: previous } = await api.get("/schedules/previous");
      const { data: next } = await api.get("/schedules/next");
      const { data: suggested } = await api.get("/schedules/suggestions");

      setCurrentSchedules(current || []);  // Ensure it's always an array
      setPreviousSchedules(previous || []); // Ensure it's always an array
      setNextSchedules(next || []); // Ensure it's always an array
      setSuggestions(suggested || []); // Ensure it's always an array
    } catch (error) {
      console.error("Failed to fetch schedules", error);
    }
  };

  return (
    <Box p={10}>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Semestre Atual</Tab>
          <Tab>Semestre Anterior</Tab>
          <Tab>Próximo Semestre</Tab>
          <Tab>Sugestões</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ScheduleList schedules={currentSchedules} />
          </TabPanel>
          <TabPanel>
            <ScheduleList schedules={previousSchedules} />
          </TabPanel>
          <TabPanel>
            <ScheduleList schedules={nextSchedules} />
          </TabPanel>
          <TabPanel>
            <ScheduleList schedules={suggestions} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

function ScheduleList({ schedules }) {
  // Add a check to ensure schedules is an array before calling .map()
  return (
    <Box>
      {Array.isArray(schedules) && schedules.map((schedule) => (
        <Box key={schedule.id} borderWidth="1px" p={4} mb={2}>
          <Text>{schedule.name}</Text>
          <Button colorScheme="teal" mt={2}>Edit</Button>
        </Box>
      ))}
      {/* Display a message if schedules is not an array or is empty */}
      {(!Array.isArray(schedules) || schedules.length === 0) && (
        <Text>Nenhum horário para mostrar.</Text>
      )}
    </Box>
  );
}

