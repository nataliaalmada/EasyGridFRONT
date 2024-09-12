import {
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { MdCalendarToday } from "react-icons/md";

export default function CardNewsAll({ news }) {
  function formatCorrectDate(dateValue) {
    const day = dateValue.getUTCDate();
    const month = dateValue.getUTCMonth() + 1; // Return Value is 0 indexed
    const year = dateValue.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <HStack
      py={{ base: 2, md: 5 }}
      w="full"
      spacing={{ base: 3, md: 5 }}
      justifyContent="center"
      flexWrap={{ base: "wrap", md: "nowrap" }}
    >
      <NextLink
        href={`/${news?.type}/${news?.catnoticia.slug}/${news?.name}`}
        passHref
      >
        <Link>
          <Flex
            w={{ base: "full", md: "250px" }}
            justifyContent="center"
            alignItems="center"
          >
            {news?.thumbnail ? (
              <Image alignSelf="center" alt="thumbnail" src={news?.thumbnail} />
            ) : (
              <Image
                alignSelf="center"
                alt="thumbnail"
                src="/images/no_image.png"
              />
            )}
          </Flex>
        </Link>
      </NextLink>
      <VStack alignItems={{ base: "center", md: "start" }}>
        <Heading
          as="h1"
          size="md"
          fontWeight="bold"
          color="brand.500"
          pb={2}
          pt={{ base: 2, md: 1 }}
        >
          <NextLink
            href={`/${news?.type}/${news?.catnoticia.slug}/${news?.name}`}
            passHref
          >
            <Link>{news?.title}</Link>
          </NextLink>
        </Heading>
        <Text
          fontSize="sm"
          textAlign="left"
          fontWeight="normal"
          display="block"
          w="130"
          overflow="hidden"
        >
          {news?.content
            ? news?.content.find((record) => record.type === "paragraph")
                .children[0].text
            : "Sem conteúdo"}
        </Text>
        <VStack pt={5} w="full" fontSize="xs" color="brand.600" lineHeight={1}>
          <HStack alignSelf="flex-start" spacing={1}>
            {news.is_event ? (
              <VStack alignItems="start">
                <HStack color="brand.500">
                  <MdCalendarToday />
                  <Text>Data do Evento:</Text>
                  <Text fontWeight="semibold">
                    {formatCorrectDate(new Date(news?.date_event))}
                  </Text>
                </HStack>
                <HStack>
                  <MdCalendarToday />
                  <Text>Data da Notícia:</Text>
                  <Text fontWeight="semibold">
                    {new Date(news?.createdAt).toLocaleString()}
                  </Text>
                </HStack>
              </VStack>
            ) : (
              <>
                <MdCalendarToday />
                <Text>Data da Notícia:</Text>
                <Text fontWeight="semibold">
                  {new Date(news?.createdAt).toLocaleString()}
                </Text>
              </>
            )}
          </HStack>
        </VStack>
      </VStack>
    </HStack>
  );
}
