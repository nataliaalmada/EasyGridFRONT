import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box, Flex } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <Flex flexDirection="column" justify="space-between" minH="100vh">
      <Box>
        <Navbar zIndex={4} />
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}
