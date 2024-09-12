import Head from "next/head";
import {
  Box,
  Divider,
  Flex,
  HStack,
  Image,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import CardHeader from "../components/_ui/CardHeader";
import CarouselNews from "../components/_ui/CarouselNews";
import Heroes from "../components/sections/Heroes";
import ItemEvento from "../components/_ui/ItemEvento";
import NextLink from "next/link";

import { VscFilePdf } from "react-icons/vsc";
import { FiExternalLink } from "react-icons/fi";
import CardNews from "../components/_ui/CardNews";
import { useNoticiasCtx } from "../contexts/NoticiasContext";

let urls = {
  development: process.env.NEXT_PUBLIC_API_URL_LOCAL,
  production: process.env.NEXT_PUBLIC_API_URL_DEPLOY,
};

let getMonth = [
  "JAN",
  "FEV",
  "MAR",
  "ABR",
  "MAI",
  "JUN",
  "JUL",
  "AGO",
  "SET",
  "OUT",
  "NOV",
  "DEZ",
];

export default function Home() {
  const { allNoticiasCtx } = useNoticiasCtx();

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
    <VStack h="full" w="full">
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="locale" content="pt_BR" />
        <title>DCC - Departamento de Ciência da Computação - UFRR</title>
        <meta
          name="description"
          content="Departamento de Ciência da Computação - DCC, vinculado a Universidade Federal de Roraima - UFRR."
        />
        <meta
          property="site_name"
          content="DCC-Departamento de Ciência da Computação"
        />
        <meta property="url" content="https://dcc-ufrr.app/" />
        <meta
          property="image"
          content="https://dcc-ufrr.app/images/logos/logo-dcc-01.png"
        />
        <meta name="author" content="Acauan C. Ribeiro" />
        <meta name="creator" content="Acauan C. Ribeiro" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href="https://dcc-ufrr.app/" />
        <link
          rel="canonical"
          href="https://dcc-ufrr.app/api//files/mapa-campus-paricarana.pdf"
        />
      </Head>
      <Flex h="full" w="full" justifyContent="center">
        <Flex w={{ base: "100%", sm: "70%" }}>
          <HStack
            w="full"
            spacing={{ base: 0, md: 5 }}
            flexDirection={{ base: "column", md: "row" }}
            alignItems="flex-start"
          >
            <Flex w={{ base: "100%", md: "60%" }}>
              <VStack w="full" pt={{ base: 1, md: 4 }} px={{ base: 1, md: 0 }}>
                {/* ----- SLIDER ----- */}
                <CarouselNews />
                {/* ----- Últimas Notícias ----- */}
                <CardHeader
                  bgHead="brand.700"
                  color="white"
                  title="Últimas Notícias"
                  bgBody="white"
                >
                  <SimpleGrid
                    columns={{ base: 1, md: 3 }}
                    spacing={3}
                    p={0.5}
                    mx="auto"
                  >
                    <CardNews news={allNoticiasCtx[0]} />
                    <CardNews news={allNoticiasCtx[1]} />

                    <VStack
                      fontSize="xs"
                      fontWeight="semibold"
                      spacing={3}
                      alignItems={{ base: "end", md: "end" }}
                    >
                      {allNoticiasCtx.slice(2, 9).map((news) => (
                        <NextLink
                          key={news?.id}
                          href={`/${news?.type}/${news?.catnoticia.slug}/${news?.name}`}
                          passHref
                        >
                          <Link>
                            <VStack spacing={0} gap={0}>
                              <HStack w="full" justifyContent="space-between">
                                <Text align="right">{news?.title}</Text>
                                <FiExternalLink size={16} />
                              </HStack>
                              <Flex w="full" justifyContent="end">
                                <Text fontSize="2xs" color="cyan.800">
                                  {new Date(
                                    news?.createdAt
                                  ).toLocaleDateString()}
                                </Text>
                              </Flex>
                            </VStack>
                          </Link>
                        </NextLink>
                      ))}
                      <Flex
                        w="full"
                        justifyContent="end"
                        pr={{ base: 6, md: 1 }}
                        pt={{ base: 1, md: 2 }}
                      >
                        <NextLink href="/noticias/all" passHref>
                          <Link
                            fontSize="xs"
                            color="brand.500"
                            fontWeight="bold"
                            textAlign="left"
                          >
                            Todas as Notícias...
                          </Link>
                        </NextLink>
                      </Flex>
                    </VStack>
                  </SimpleGrid>
                </CardHeader>
              </VStack>
            </Flex>
            {/* ----- Acesso Rápido ----- */}
            <Flex w={{ base: "100%", sm: "40%" }}>
              <VStack
                w={{ base: "100%", sm: "90%" }}
                pt={4}
                px={{ base: 1, md: 0 }}
                spacing={4}
              >
                <CardHeader
                  bgHead="red.700"
                  color="white"
                  title="Acesso Rápido"
                  bgBody="white"
                >
                  <SimpleGrid
                    columns={{ base: 3, md: 3 }}
                    spacing={3}
                    p={0.5}
                    mx="auto"
                  >
                    <Box
                      as="button"
                      rounded="lg"
                      px={1}
                      py={2}
                      _hover={{ bg: "brand.50" }}
                      _active={{
                        bg: "#dddfe2",
                        transform: "scale(0.98)",
                        borderColor: "#bec3c9",
                      }}
                      onClick={() =>
                        window.open(
                          `${
                            urls[process.env.NODE_ENV]
                          }/files/oferta-dcc-2023-1-labs.pdf`
                        )
                      }
                    >
                      <HStack>
                        <Box right={0} color="red.700">
                          <VscFilePdf fontSize="180%" />
                        </Box>
                        <Text
                          textAlign="start"
                          fontSize="2xs"
                          fontWeight="bold"
                        >
                          Disciplinas DCC - Sem. 2023.1
                        </Text>
                      </HStack>
                    </Box>
                    <Box
                      as="button"
                      rounded="lg"
                      px={1}
                      py={2}
                      _hover={{ bg: "brand.50" }}
                      _active={{
                        bg: "#dddfe2",
                        transform: "scale(0.98)",
                        borderColor: "#bec3c9",
                      }}
                      onClick={() =>
                        window.open(
                          `${urls[process.env.NODE_ENV]}/files/ppc-dcc-2023.pdf`
                        )
                      }
                    >
                      <HStack>
                        <Box right={0} color="red.700">
                          <VscFilePdf fontSize="180%" />
                        </Box>
                        <Text
                          textAlign="start"
                          fontSize="2xs"
                          fontWeight="bold"
                        >
                          PPC do Curso
                        </Text>
                      </HStack>
                    </Box>
                    <Box
                      as="button"
                      rounded="lg"
                      px={1}
                      py={2}
                      _hover={{ bg: "brand.50" }}
                      _active={{
                        bg: "#dddfe2",
                        transform: "scale(0.98)",
                        borderColor: "#bec3c9",
                      }}
                      opacity="0.6"
                      cursor="not-allowed"
                    >
                      <HStack>
                        <Box right={0} color="red.700">
                          <VscFilePdf fontSize="180%" />
                        </Box>
                        <Text
                          textAlign="start"
                          fontSize="2xs"
                          fontWeight="bold"
                        >
                          Manual do Aluno
                        </Text>
                      </HStack>
                    </Box>
                  </SimpleGrid>
                  <Divider />
                  <NextLink
                    href="https://arquivos.ufrr.br/index.php/s/B86YswOYFMq3M8A"
                    passHref
                  >
                    <Link>
                      <HStack pt={3} pl={2}>
                        <Image
                          boxSize="6"
                          src="/images/icons/pasta-aberta.png"
                          alt="files"
                        />
                        <Text fontSize="xs" fontWeight="semibold">
                          Arquivos e Documentos (Cloud)
                        </Text>
                      </HStack>
                    </Link>
                  </NextLink>
                  <Divider />
                  <NextLink href={`/eleitorais/all`} passHref>
                    <Link>
                      <HStack pt={3} pl={2}>
                        <Image
                          boxSize="6"
                          src="/images/icons/pasta-aberta.png"
                          alt="files"
                        />
                        <Text fontSize="xs" fontWeight="semibold">
                          Processos Eleitorais - DCC
                        </Text>
                      </HStack>
                    </Link>
                  </NextLink>
                </CardHeader>
                <CardHeader
                  bgHead="green.600"
                  bgBody="white"
                  color="white"
                  title="Eventos"
                >
                  <VStack w="full">
                    <VStack w={{ base: "90%", md: "70%" }}>
                      {allNoticiasCtx
                        ?.slice(0, 5)
                        .map(
                          (evento) =>
                            evento.is_event && (
                              <ItemEvento
                                key={evento.id}
                                dia={new Date(evento?.date_event).getUTCDate()}
                                mes={
                                  getMonth[
                                    new Date(evento?.date_event).getUTCMonth()
                                  ]
                                }
                                tipo={evento?.name}
                                titulo={evento?.title}
                                href={`/${evento?.type}/${evento?.catnoticia.slug}/${evento?.name}`}
                              />
                            )
                        )}
                      <Flex
                        w="full"
                        justifyContent="end"
                        pr={{ base: 6, md: 1 }}
                        pt={{ base: 1, md: 2 }}
                      >
                        <NextLink href="/eventos/all" passHref>
                          <Link
                            fontSize="xs"
                            color="brand.500"
                            fontWeight="bold"
                            textAlign="left"
                          >
                            Todos os Eventos...
                          </Link>
                        </NextLink>
                      </Flex>
                    </VStack>
                  </VStack>
                </CardHeader>
                {/* ----- CACC E ATLÉTICA ----- */}
                <HStack
                  w="full"
                  borderBottom="1px"
                  borderBottomColor="gray.400"
                  p={4}
                >
                  <NextLink
                    href="https://arquivos.ufrr.br/index.php/s/K1Z6iwpg8MqmPAy"
                    passHref
                  >
                    <Link
                      style={{ textDecoration: "none" }}
                      _hover={{ opacity: "70%" }}
                      w="full"
                      isExternal
                    >
                      <VStack>
                        <Text
                          fontSize={{ base: "xs", md: "sm" }}
                          fontWeight="bold"
                          pt={0.5}
                          color="brand.700"
                          textAlign="center"
                        >
                          DISCIPLINAS E PRÉ-REQUISITOS
                        </Text>
                        <Image
                          boxSize="32"
                          height={24}
                          alt="logo-footer"
                          src="/images/others/disciplinas-dcc-pre-requsitos-2023.png"
                        />
                      </VStack>
                    </Link>
                  </NextLink>
                  <Divider orientation="vertical" />
 
                </HStack>
                <HStack w="full" spacing={8} p={5} justifyContent="center">
                  <VStack>
                    <NextLink
                      href="https://www.instagram.com/cacc.ufrr/"
                      passHref
                    >
                      <Link
                        style={{ textDecoration: "none" }}
                        _hover={{ opacity: "70%" }}
                        isExternal
                      >
                        <Image
                          boxSize="36"
                          alt="logo-footer"
                          src="/images/logos/logo-cacc.png"
                        />

                        <Text
                          textAlign="center"
                          fontSize="xs"
                          fontWeight="bold"
                          pt={0.5}
                        >
                          CENTRO ACADÊMICO
                        </Text>
                      </Link>
                    </NextLink>
                  </VStack>
                  <VStack>
                    <NextLink
                      href="https://www.instagram.com/atleticanexus/"
                      passHref
                    >
                      <Link
                        style={{ textDecoration: "none" }}
                        _hover={{ opacity: "70%" }}
                        isExternal
                      >
                        <Image
                          boxSize="36"
                          alt="logo-footer"
                          src="/images/logos/logo-nexus.png"
                        />

                        <Text
                          textAlign="center"
                          fontSize="xs"
                          fontWeight="bold"
                          pt={0.5}
                        >
                          ATLÉTICA
                        </Text>
                      </Link>
                    </NextLink>
                  </VStack>
                </HStack>
              </VStack>
            </Flex>
          </HStack>
        </Flex>
      </Flex>
      {/* ----- INFO DCC ----- */}
      <Flex
        w="full"
        justifyContent="center"
        bgImage="url('/images/banner-blue.png')"
        bgPosition="center 30px"
        bgRepeat="no-repeat"
      >
        <Flex
          w={{ base: "100%", md: "70%" }}
          h="2xs"
          mt={{ base: 0, md: 5 }}
          zIndex={100}
        >
          <Heroes />
        </Flex>
      </Flex>
    </VStack>
  );
}
