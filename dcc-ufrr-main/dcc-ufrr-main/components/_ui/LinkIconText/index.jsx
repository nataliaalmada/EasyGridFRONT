import { Box, HStack, Icon, Text } from "@chakra-ui/react";

export default function LinkIconText({ icon, text, onClick }) {
  return (
    <Box as="button" onClick={onClick}>
      <HStack color="linkColor" fontWeight="extrabold" fontSize="sm">
        <Icon as={icon} boxSize={6} />
        <Text>{text}</Text>
      </HStack>
    </Box>
  );
}
