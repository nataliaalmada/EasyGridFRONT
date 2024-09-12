import { Box, Heading } from "@chakra-ui/react";

export default function CardDashboard({
  title,
  bgHead,
  bgBody,
  color,
  children,
}) {
  return (
    <Box w="full" h="full" boxShadow="md">
      <Box bg={bgBody} w="100%" overflow="hidden" mx="auto">
        <Heading
          as="h3"
          size="sm"
          w="full"
          bg={bgHead}
          color={color}
          py={4}
          px={2}
        >
          {title}
        </Heading>
        <Box py={4} px={4}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
