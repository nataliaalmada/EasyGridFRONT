import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import CardNewsAll from "../../components/_ui/CardNewsAll";
import { useNoticiasCtx } from "../../contexts/NoticiasContext";

export default function AllEventos() {
  const { allNoticiasCtx } = useNoticiasCtx();
  return (
    <Flex
      h="full"
      w="full"
      justifyContent="center"
      px={{ base: 0, md: 10 }}
      pb={{ base: 3, md: 10 }}
      pt={{ base: 3, md: 5 }}
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
                display={{ base: "none", md: "flex" }}
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
              TODAS OS EVENTOS
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
            <Box w="full" alignSelf="start" px={{ base: 1, md: 5 }} pt={1}>
              <VStack fontSize="xs" fontWeight="semibold" spacing={3}>
                {allNoticiasCtx.map(
                  (news) =>
                    news.is_event && (
                      <>
                        <CardNewsAll key={news.id} news={news} />
                        <Divider border="0.4px" borderColor="gray" />
                      </>
                    )
                )}
              </VStack>
            </Box>
          </VStack>
        </VStack>
      </HStack>
    </Flex>
  );
}
