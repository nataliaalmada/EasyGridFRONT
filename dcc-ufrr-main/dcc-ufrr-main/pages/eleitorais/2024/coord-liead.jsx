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
              Eleição para Coordenador do LIEaD - 2024
            </Heading>
          </HStack>

          <VStack w="full">
            <Box w="full" alignSelf="start" px={{ base: 1, md: 5 }} pt={{ base: 1, md: 5 }}>
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
                          href="https://api.dcc-ufrr.app/files/coord-liead-2024/edital_eleicao_coordenacao-liead.pdf"
                          isExternal
                        >
                          <HStack>
                            <Icon as={AiOutlineFilePdf} color="red.600" />
                            <Text>
                              EDITAL Nº. 01/2024 - ELEIÇÃO DCC/CCT/UFRR
                            </Text>
                          </HStack>
                        </Link>
                      </Td>
                      <Td textAlign="center">07/08/2024</Td>
                    </Tr>
                    
                    <Tr>
                      <Td whiteSpace="pre-wrap">
                        <Link
                          href="https://api.dcc-ufrr.app/files/coord-liead-2024/edital_homologa_inscricao_assinado.pdf"
                          isExternal
                        >
                          <HStack>
                            <Icon as={AiOutlineFilePdf} color="red.600" />
                            <Text>
                              EDITAL Nº. 02/2024 - HOMOLOGAÇÃO DAS INSCRIÇÕES DCC/CCT/UFRR
                            </Text>
                          </HStack>
                        </Link>
                      </Td>
                      <Td textAlign="center">16/08/2024</Td>
                    </Tr>

                    <Tr>
                      <Td whiteSpace="pre-wrap">
                        <Link
                          href="https://api.dcc-ufrr.app/files/coord-liead-2024/edital_eleicao_coordenacao-liead-cronograma.pdf"
                          isExternal
                        >
                          <HStack>
                            <Icon as={AiOutlineFilePdf} color="red.600" />
                            <Text>
                              EDITAL Nº. 03/2024 - ELEIÇÃO DCC/CCT/UFRR (Cronograma)
                            </Text>
                          </HStack>
                        </Link>
                      </Td>
                      <Td textAlign="center">02/09/2024</Td>
                    </Tr>

                    <Tr>
                      <Td whiteSpace="pre-wrap">
                        <Link
                          href="https://api.dcc-ufrr.app/files/coord-liead-2024/edital_homologa_resultado.pdf"
                          isExternal
                        >
                          <HStack>
                            <Icon as={AiOutlineFilePdf} color="red.600" />
                            <Text>
                              EDITAL Nº. 04/2024 - HOMOLOGAÇÃO DO RESULTADO - DCC/CCT/UFRR
                            </Text>
                          </HStack>
                        </Link>
                      </Td>
                      <Td textAlign="center">02/09/2024</Td>
                    </Tr>

                    <Tr>
                      <Td whiteSpace="pre-wrap">
                        <Link
                          href="https://api.dcc-ufrr.app/files/coord-liead-2024/edital_resultado_final_assinado.pdf"
                          isExternal
                        >
                          <HStack>
                            <Icon as={AiOutlineFilePdf} color="red.600" />
                            <Text>
                              EDITAL Nº. 05/2024 - RESULTADO FINAL - DCC/CCT/UFRR
                            </Text>
                          </HStack>
                        </Link>
                      </Td>
                      <Td textAlign="center">03/09/2024</Td>
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
