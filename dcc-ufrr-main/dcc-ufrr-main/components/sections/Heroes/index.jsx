import {
  Box,
  Flex,
  Badge,
  SimpleGrid,
  Button,
  Image,
  Heading,
  Link,
} from "@chakra-ui/react";

import { MdSendToMobile } from "react-icons/md";

export default function Heroes() {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={1}>
      <Flex
        direction="column"
        alignItems="start"
        justifyContent="start"
        px={{ base: 4, md: 20 }}
        pt={{ base: 4, md: 0 }}
      >
        <Badge
          color="white"
          px={3}
          py={1}
          // mb={3}
          variant="solid"
          colorScheme="brand"
          rounded="full"
        >
          INFO DCC
        </Badge>
        <Heading
          as="h1"
          my={6}
          fontSize={{ base: "3xl", md: "3xl" }}
          fontWeight="bold"
          color="white"
          _dark={{ color: "gray.300" }}
          lineHeight="shorter"
          textAlign="end"
        >
          Atualize-se das notícias do DCC ou mande uma mensagem pra gente!
        </Heading>
        <Flex w="full" justifyContent="flex-end">
          <Link href="https://forms.gle/Y2UMKtyWcyLitHQj8" isExternal>
            <Button
              color="white"
              variant="solid"
              colorScheme="brand"
              size={{ base: "sm", md: "lg" }}
              roundedLeft={0}
              rightIcon={<MdSendToMobile />}
            >
              Mande uma mensagem para o DCC
            </Button>
          </Link>
        </Flex>
      </Flex>
      <Flex
        justifyContent="flex-start"
        alignItems="center"
        h="100%"
        display={{ base: "none", md: "flex" }}
      >
        <Box h="100%">
          <Image
            src="/images/meninos-front.jpg"
            alt="img"
            boxSize="100%"
            objectFit="contain"
            boxShadow="dark-lg"
          />
        </Box>
      </Flex>
    </SimpleGrid>
  );
}
