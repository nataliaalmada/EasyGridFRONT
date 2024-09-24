// File: dcc-ufrr-main/pages/admin/users/manage-teachers.jsx

import { VStack, HStack, Avatar, Text } from "@chakra-ui/react";
import { useUser } from "../../../contexts/UserContext";

export default function ManageTeachers() {
  const { users } = useUser(); // Fetch users from context

  return (
    <VStack w="full" spacing={4} alignItems="flex-start">
      {/* Safely handle users data, using Array.isArray to check if it's an array */}
      {Array.isArray(users) && users.map((teacher) => (
        <HStack key={teacher.id} w="full" justifyContent="space-between">
          <Avatar name={teacher.name} src={teacher.picture} />
          <Text>{teacher.name}</Text>
        </HStack>
      ))}
      {/* Add a fallback message if users is not an array or is empty */}
      {!Array.isArray(users) && <Text>No users available to display.</Text>}
    </VStack>
  );
}

