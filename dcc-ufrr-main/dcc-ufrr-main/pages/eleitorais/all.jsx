import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import NextLink from "next/link";

export default function AllNoticias() {
  return (
    <Flex
      h="full"
      w="full"
      justifyContent="center"
      px={{ base: 0, md: 10 }}
      pb={{ base: 3, md: 10 }}
      pt={{ base: 3, md: 5 }}
      userSelect="none"
    >
      <HStack
        w={{ base: "100%", md: "60%" }}
        h="full"
        boxShadow="md"
        bg="white"
        p={{ base: 2, md: 10 }}
      >
        <VStack w="full">
          <HStack justifyContent="space-between" w="full" alignItems="center">
            <Box px={{ base: 1, md: 5 }}>
              <Breadcrumb
                spacing="8px"
                separator={<ChevronRightIcon color="gray.500" />}
                fontWeight="bold"
                fontSize="md"
                textAlign="justify"
                color="gray.800"
                display={{ base: "flex", md: "flex" }}
              >
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <HStack gap={1}>
                      <AiOutlineHome fontSize="16" />
                      <Text>Home</Text>
                    </HStack>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>
            <Heading as="h1" size="lg" color="brand.700">
              PROCESSOS ELEITORAIS
            </Heading>
            <Box w="96" display={{ base: "none", md: "flex" }}>
              <InputGroup>
                <InputLeftElement color="gray.600">
                  <FiSearch />
                </InputLeftElement>
                <Input fontSize="sm" placeholder="Buscar por assunto..." />
              </InputGroup>
            </Box>
          </HStack>

          <VStack w="full">
            <Box w="full" alignSelf="start" px={{ base: 1, md: 5 }} pt={10}>

              <Accordion defaultIndex={[0]} allowMultiple>

              <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight="bold"
                      >
                        Ano: 2024
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                  <UnorderedList pl={5} color="darkblue">
                      <NextLink href={`/eleitorais/2024/coord-liead`} passHref>
                        <Link>
                          <ListItem>
                            <Box
                              as="span"
                              flex="1"
                              textAlign="left"
                              fontSize="sm"
                            >
                              Eleição para Coordenador de Curso - LIEaD 2024
                            </Box>
                          </ListItem>
                        </Link>
                      </NextLink>
                    </UnorderedList>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight="bold"
                      >
                        Ano: 2023
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <UnorderedList pl={5} color="darkblue">
                      <NextLink href={`/eleitorais/2023/chefia-dcc`} passHref>
                        <Link>
                          <ListItem>
                            <Box
                              as="span"
                              flex="1"
                              textAlign="left"
                              fontSize="sm"
                            >
                              Eleição para Chefe do Dep. de Ciência da
                              Computação
                            </Box>
                          </ListItem>
                        </Link>
                      </NextLink>
                      <NextLink href={`/eleitorais/2023/coord-dcc`} passHref>
                        <Link>
                          <ListItem>
                            <Box
                              as="span"
                              flex="1"
                              textAlign="left"
                              fontSize="sm"
                            >
                              Eleição para Coordenador de Curso - Ciência da
                              Computação
                            </Box>
                          </ListItem>
                        </Link>
                      </NextLink>
                    </UnorderedList>
                  </AccordionPanel>
                </AccordionItem>

              </Accordion>
            </Box>
          </VStack>
        </VStack>
      </HStack>
    </Flex>
  );
}
