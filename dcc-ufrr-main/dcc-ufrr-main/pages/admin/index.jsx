import { Box, HStack, Image, Link, Text, VStack } from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import { FiExternalLink } from "react-icons/fi";
import AdminStatistics from "../../components/sections/AdminStatistics";
import LineChar from "../../components/sections/AdminStatistics/LineChart";
import CardDashboard from "../../components/_ui/CardDashboard";
import { useUser } from "../../contexts/UserContext";
import { usePageInstCtx } from "../../contexts/PageInstContext";
import { useNoticiasCtx } from "../../contexts/NoticiasContext";
import NextLink from "next/link";

import api from "../../utils/api";
import { useEffect } from "react";

export default function AdminIndex() {
  const { pagesSize } = usePageInstCtx();
  const { noticiasSize } = useNoticiasCtx();
  const { usersSize, getAllUsers, getSizeUsers } = useUser();

  useEffect(() => {
    getAllUsers();
    getSizeUsers();
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
        <CardDashboard
          title="Links Úteis para os Professores"
          bgHead="gray.100"
          bgBody="white"
          color="black"
        >
          <VStack w="full" alignItems="flex-start">
            <HStack>
              <VStack spacing={0} alignItems="flex-start">
                <NextLink
                  href="https://ufrr-my.sharepoint.com/:f:/g/personal/chefia_dcc_ufrr_br/EqFGji3MCf9BhCt7qaERzzsBfm6rA7hLAlAmzFxhJZCmlw?e=NIv7oO"
                  passHref
                >
                  <Link
                    style={{ textDecoration: "none" }}
                    _hover={{ opacity: "85%" }}
                    isExternal
                  >
                    <HStack>
                      <Text fontWeight="bold" fontSize="sm" color="brand.500">
                        Sharepoint - Gestão DCC
                      </Text>
                      <FiExternalLink color="brand.500" />
                    </HStack>
                  </Link>
                </NextLink>

                <Text color="gray.500" fontSize="xs">
                  Documentos, memorandos e atas do departamento.
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </CardDashboard>
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

export async function getServerSideProps({ req, res }) {
  const defaultReturnObject = {
    redirect: {
      destination: "/auth/login",
      permanent: false,
    },
  };

  try {
    const token = getCookie(process.env.NEXT_PUBLIC_COOKIE_NAME, { req, res });
    if (!token) {
      return defaultReturnObject;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;
    const { data } = await api.post("/public/validate");
    if (!data.isvalid) {
      return defaultReturnObject;
    }
    return {
      props: {},
    };
  } catch (error) {
    console.log("Index Admin, getServerSideProps, Something Went Wrong", error);
    return defaultReturnObject;
  }
}
