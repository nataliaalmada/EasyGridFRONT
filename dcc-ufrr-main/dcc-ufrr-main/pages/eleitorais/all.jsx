// File: dcc-ufrr-main/pages/eleitorais/all.jsx

import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";

export default function EleitoraisAll() {
  return (
    <VStack w="full" align="start" p={5}>
      <Heading as="h1" size="lg" mb={4}>
        Processos Eleitorais - DCC
      </Heading>
      <Box>
        {/* Example content, replace with actual data */}
        <NextLink href="/eleitorais/2023/chefia-dcc" passHref>
          <Text as="a" color="blue.500">
            Chefia DCC - 2023
          </Text>
        </NextLink>
      </Box>
    </VStack>
  );
}

// Removed getServerSideProps function for testing purposes.

