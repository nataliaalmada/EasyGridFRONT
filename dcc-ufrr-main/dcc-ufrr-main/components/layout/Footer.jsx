import {
  Box,
  Flex,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  VStack,
  Icon,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { GrInstagram } from "react-icons/gr";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

import NextLink from "next/link";
import { useEffect, useState } from "react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import MapboxMap from "../sections/mapbox-map";

let urls = {
  development: process.env.NEXT_PUBLIC_API_URL_LOCAL,
  production: process.env.NEXT_PUBLIC_API_URL_DEPLOY,
};

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <Box
      bg="gray.100"
      _dark={{ bg: "gray.600" }}
      w="full"
      pt={{ base: 0, sm: 4 }}
    >
      <Stack
        direction={{ base: "column", lg: "row" }}
        w={{ base: "100%", sm: "50%" }}
        mx="auto"
        justify="space-between"
        px={{ base: 2, md: 10 }}
        py={{ base: 3, md: 10 }}
      >
        <Flex
          justify={{ base: "space-evenly", md: "center" }}
          gap={{ base: 0, md: 3 }}
        >
          <Image
            alt="logo-footer"
            src="/images/logos/logo-dcc-03.png"
            boxSize={{ base: "14", md: "16" }}
          />

          <Image
            alt="logo-ufrr"
            src="/images/logos/logo_ufrr.png"
            boxSize="16"
            onClick={() => window.open("https://ufrr.br/")}
          />
        </Flex>
        <HStack
          alignItems="start"
          flex={1}
          justify="space-around"
          fontSize={{ base: "10px", md: "12px" }}
          color="gray.800"
          _dark={{ color: "white" }}
          textAlign={{ base: "left", md: "left" }}
        >
          <Flex justify="start" direction="column">
            <Heading as="h2" size="xs">
              Institucional
            </Heading>
            <Link
              textTransform="uppercase"
              href="https://ufrr.br/"
              target="_blank"
            >
              Site UFRR
            </Link>
            <Link textTransform="uppercase">Site CCT</Link>
            <Link
              textTransform="uppercase"
              href="https://ensino.nead.ufrr.br/site/"
              target="_blank"
            >
              Site NEAD
            </Link>
          </Flex>
          <Flex justify="start" direction="column">
            <Heading as="h2" size="xs">
              Documentos
            </Heading>
            <Link
              textTransform="uppercase"
              href="https://ufrr.br/calendariouniversitario"
              target="_blank"
            >
              Calendário UFRR
            </Link>
            <Link
              textTransform="uppercase"
              href={`${
                urls[process.env.NODE_ENV]
              }/files/mapa-campus-paricarana.pdf`}
            >
              Mapa Campus Paricarana
            </Link>
            <Link
              textTransform="uppercase"
              href="https://editais.ufrr.br/"
              target="_blank"
            >
              Editais da UFRR
            </Link>
            <Link
              textTransform="uppercase"
              href="https://ufrr.br/2015-07-23-18-30-35"
              target="_blank"
            >
              Regimento UFRR
            </Link>
          </Flex>
          <Flex justify="start" direction="column">
            <Heading as="h2" size="xs">
              Contato
            </Heading>
            <Link>chefia.dcc@ufrr.br</Link>
            <Link>coordenacao.dcc@ufrr.br</Link>
          </Flex>
        </HStack>
      </Stack>
      <Box
        fontSize="2xs"
        lineHeight={1}
        w="full"
        pt={2}
        borderTop="1px"
        borderTopColor="gray.400"
        borderTopStyle="dashed"
      >
        <HStack
          w="full"
          spacing={{ base: 0, md: 5 }}
          gap={{ base: 2, md: 0 }}
          flexDirection={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
        >
          <VStack>
            <Heading as="h2" size="xs">
              Endereço
            </Heading>
            <Text>UFRR, Campus Paricarana, CCT</Text>
            <Text>Av. Capitão Ene Garcez, 2413 - Bairro Aeroporto. </Text>
            <Text>Boa Vista - Roraima RR. 69304-000</Text>
          </VStack>
          <Flex height={250} width={{ base: "100%", md: 500 }}>
            <MapboxMap />
          </Flex>
        </HStack>
      </Box>
      <VStack py={4} bg="red.800" color="white" mt={{ base: 0, md: 2 }}>
        <HStack justify="center">
          <Text fontSize="xs">Redes Sociais do DCC: </Text>
          <HStack spacing={5}>
            <NextLink href="https://www.facebook.com/dccufrr" passHref>
              <Link isExternal _hover={{ opacity: "70%" }}>
                <Icon
                  _dark={{ color: "white" }}
                  h="20px"
                  w="20px"
                  as={FaFacebookF}
                />
              </Link>
            </NextLink>

            <NextLink href="https://www.instagram.com/dcc.ufrr/" passHref>
              <Link isExternal _hover={{ opacity: "70%" }}>
                <Icon
                  _dark={{ color: "white" }}
                  h="20px"
                  w="20px"
                  as={GrInstagram}
                />
              </Link>
            </NextLink>
            <NextLink
              href="https://www.linkedin.com/company/92523964/admin/"
              passHref
            >
              <Link isExternal _hover={{ opacity: "70%" }}>
                <Icon
                  _dark={{ color: "white" }}
                  h="20px"
                  w="20px"
                  as={FaLinkedinIn}
                />
              </Link>
            </NextLink>
          </HStack>
        </HStack>
      </VStack>
      <VStack w="full" bg="#071d41">
        <HStack>
          <NextLink href="https://www.gov.br/pt-br" passHref>
            <Link isExternal>
              <Image
                boxSize="100px"
                src="/images/gov-br.svg"
                alt="gov.br-logo"
              />
            </Link>
          </NextLink>
        </HStack>
      </VStack>
      <VStack w="full" bg="#071d41" borderTop="1px" borderTopColor="white">
        <Text py={4} fontSize={{ base: "2xs", md: "xs" }} color="white">
          O Padrão Digital de Governo utiliza as licenças{" "}
          <a
            href="https://creativecommons.org/publicdomain/zero/1.0/"
            target="_blank"
            rel="noreferrer"
          >
            CC0 1.0 Universal
          </a>{" "}
          e{" "}
          <a href="https://mit-license.org/" target="_blank" rel="noreferrer">
            MIT
          </a>
          .
        </Text>
      </VStack>
      {isVisible && (
        <Box
          onClick={scrollToTop}
          position="fixed"
          bottom="20px"
          right={["16px", "84px"]}
          zIndex={3}
        >
          <IconButton
            size={"md"}
            rounded="full"
            bg="#1351b4"
            color="white"
            _hover={{ background: "#326AC4" }}
            aria-label="Search database"
            icon={<ChevronUpIcon fontWeight="extrabold" fontSize="2xl" />}
          />
        </Box>
      )}
    </Box>
  );
}
