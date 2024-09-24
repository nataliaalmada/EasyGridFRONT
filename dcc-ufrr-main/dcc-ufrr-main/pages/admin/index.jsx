import { Box, Button, HStack, Image, Link, Text, VStack } from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import { FiExternalLink } from "react-icons/fi";
import AdminStatistics from "../../components/sections/AdminStatistics";
import LineChar from "../../components/sections/AdminStatistics/LineChart";
import CardDashboard from "../../components/_ui/CardDashboard";
import { useUser } from "../../contexts/UserContext";
import { usePageInstCtx } from "../../contexts/PageInstContext";
import { useNoticiasCtx } from "../../contexts/NoticiasContext";
import NextLink from "next/link"; // import NextLink
import api from "../../utils/api";
import { useEffect } from "react";

function AdminIndex() {
  const { pagesSize } = usePageInstCtx();
  const { noticiasSize } = useNoticiasCtx();
  const { usersSize, getAllUsers } = useUser(); // Updated destructuring

  useEffect(() => {
    getAllUsers();
  }, []);

  // Force reload page (uma vez)
  if (typeof window !== "undefined") {
    window.onload = function () {
      if (!localStorage.loaded) {
        localStorage.setItem("loaded", "yes");
        window.location.reload();
      }
    };
  }

  return (
    <HStack
      w="full"
      spacing={{ base: 0, md: 5 }}
      flexDirection={{ base: "column", md: "row" }}
      alignItems="flex-start"
      justifyContent="center"
      gap={2}
    >
      <VStack w={{ base: "full", md: "35%" }}>
        <CardDashboard
          title="Bem-vindo ao CMS - DCC/UFRR"
          bgHead="gray.100"
          bgBody="white"
          color="black"
        >
          <VStack w="full" alignItems="flex-start">
            <HStack borderBottom="1px" borderBottomColor="gray.200" pb={1}>
              <VStack>
                <Box p={2}>
                  <Image
                    boxSize="60px"
                    src="images/icons/rocket.png"
                    alt="rocket"
                  />
                </Box>
              </VStack>
              <VStack spacing={0} alignItems="flex-start">
                <HStack>
                  <Text fontWeight="bold" fontSize="sm" color="brand.500">
                    Primeiros passos com o CMS
                  </Text>
                  <FiExternalLink color="brand.500" />
                </HStack>
                <Text color="gray.500" fontSize="xs">
                  Veja alguns tutoriais de como utilizar esta ferramenta.
                </Text>
              </VStack>
            </HStack>
            <HStack>
              <VStack>
                <Box p={2}>
                  <Image
                    boxSize="60px"
                    src="images/icons/ideia.png"
                    alt="rocket"
                  />
                </Box>
              </VStack>
              <VStack spacing={0} alignItems="flex-start">
                <HStack>
                  <Text fontWeight="bold" fontSize="sm" color="brand.500">
                    Quais as novidades!
                  </Text>
                  <FiExternalLink color="brand.500" />
                </HStack>
                <Text color="gray.500" fontSize="xs">
                  Descubra novos serviços e recursos do CMS.
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </CardDashboard>

        {/* New buttons for managing users, assigning subjects, and schedules */}
        <NextLink href="/admin/users/manage-teachers" passHref>
          <Button colorScheme="teal" w="full">
            Gerenciar Professores
          </Button>
        </NextLink>

        <NextLink href="/admin/schedule" passHref>
          <Button colorScheme="blue" w="full">
            Gerenciar Horários
          </Button>
        </NextLink>
      </VStack>

      <VStack w={{ base: "full", md: "60%" }}>
        <CardDashboard
          title="Estatísticas"
          bgHead="gray.100"
          bgBody="white"
          color="black"
        >
          <VStack
            w="full"
            alignItems={{ base: "center", md: "flex-start" }}
            gap={10}
          >
            <AdminStatistics
              pagesSize={pagesSize}
              noticiasSize={noticiasSize}
              usersSize={usersSize}
            />
            <LineChar />
          </VStack>
        </CardDashboard>
      </VStack>
    </HStack>
  );
}

export default AdminIndex;

