import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineHome, AiOutlineFilePdf } from "react-icons/ai";

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
                fontSize="sm"
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
                <BreadcrumbItem>
                  <BreadcrumbLink href="/eleitorais/all">
                    <HStack gap={1}>
                      <Text>Processos Eleitorais</Text>
                    </HStack>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>
            <Heading as="h1" size={{ base: "md", md: "lg" }} color="brand.700">
              Eleição para Coordenador de Curso DCC - 2023
            </Heading>
          </HStack>

          <VStack w="full">
            <Box
              w="full"
              alignSelf="start"
              px={{ base: 1, md: 5 }}
              pt={{ base: 1, md: 5 }}
            >
              <TableContainer>
                <Table
                  variant="simple"
                  __css={{ "table-layout": "fixed", width: "full" }}
                >
                  <Thead whiteSpace="pre-wrap">
                    <Tr>
                      <Th width="70%">Documentos</Th>
                      <Th textAlign="center" px={0}>
                        Data de Publicação
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody fontSize="sm">
                    <Tr>
                      <Td whiteSpace="pre-wrap">
                        <Link
                          href="https://arquivos.ufrr.br/index.php/s/dqHoVgHX83PaBcY"
                          isExternal
                        >
                          <HStack>
                            <Icon as={AiOutlineFilePdf} color="red.600" />
                            <Text>
                              EDITAL No. 02/2023 - ELEIÇÃO COORDENAÇÃO -
                              DCC/CCT/UFRR - ABERTURA
                            </Text>
                          </HStack>
                        </Link>
                      </Td>
                      <Td textAlign="center">16/10/2023</Td>
                    </Tr>
                    <Tr>
                      <Td whiteSpace="pre-wrap">
                        <Link
                          href="https://arquivos.ufrr.br/index.php/s/mWaROsW19uZxgMh"
                          isExternal
                        >
                          <HStack>
                            <Icon as={AiOutlineFilePdf} color="red.600" />
                            <Text>
                              Comunicado 01 – RESULTADOS DOS RECURSOS AO EDITAL
                              No. 02/2023 - DCC/CCT/UFRR
                            </Text>
                          </HStack>
                        </Link>
                      </Td>
                      <Td textAlign="center">24/10/2023</Td>
                    </Tr>
                    <Tr>
                      <Td whiteSpace="pre-wrap">
                        <Link
                          href="https://arquivos.ufrr.br/index.php/s/exQgBdA9xJzveRf"
                          isExternal
                        >
                          <HStack>
                            <Icon as={AiOutlineFilePdf} color="red.600" />
                            <Text>
                              Comunicado 02 – HOMOLOGAÇÃO DAS INSCRIÇÕES EDITAL
                              No. 02/2023
                            </Text>
                          </HStack>
                        </Link>
                      </Td>
                      <Td textAlign="center">27/10/2023</Td>
                    </Tr>
                    <Tr>
                      <Td whiteSpace="pre-wrap">
                        <Link
                          href="https://arquivos.ufrr.br/index.php/s/HMOcLDVCXEUmapL"
                          isExternal
                        >
                          <HStack>
                            <Icon as={AiOutlineFilePdf} color="red.600" />
                            <Text>
                              Comunicado 03 – RECURSOS CONTRA A HOMOLOGAÇÃO DAS
                              INSCRIÇÕES - EDITAL No. 02/2023
                            </Text>
                          </HStack>
                        </Link>
                      </Td>
                      <Td textAlign="center">30/10/2023</Td>
                    </Tr>
                    <Tr>
                      <Td whiteSpace="pre-wrap">
                        <Link
                          href="https://arquivos.ufrr.br/index.php/s/8uWRxp5vLM83BIe"
                          isExternal
                        >
                          <HStack>
                            <Icon as={AiOutlineFilePdf} color="red.600" />
                            <Text>
                              Resultado das Eleições - Coordenação DCC
                            </Text>
                          </HStack>
                        </Link>
                      </Td>
                      <Td textAlign="center">21/11/2023</Td>
                    </Tr>
                    <Tr>
                      <Td whiteSpace="pre-wrap">
                        <Link
                          href="https://arquivos.ufrr.br/index.php/s/BClLPEqc6t1eXVo"
                          isExternal
                        >
                          <HStack>
                            <Icon as={AiOutlineFilePdf} color="red.600" />
                            <Text>
                              Comunicado 04 - Sobre recursos ao Resultado das
                              Eleições
                            </Text>
                          </HStack>
                        </Link>
                      </Td>
                      <Td textAlign="center">23/11/2023</Td>
                    </Tr>
                    <Tr>
                      <Td whiteSpace="pre-wrap">
                        <Link
                          href="https://arquivos.ufrr.br/index.php/s/MisVKqEyn1ew1UF"
                          isExternal
                        >
                          <HStack>
                            <Icon as={AiOutlineFilePdf} color="red.600" />
                            <Text>
                              Comunicado 05 - Resultado definitivo das eleições
                              para Coordenador de Curso
                            </Text>
                          </HStack>
                        </Link>
                      </Td>
                      <Td textAlign="center">28/11/2023</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </VStack>
        </VStack>
      </HStack>
    </Flex>
  );
}
