import {
  Box,
  HStack,
  Heading,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function CardNews({ news }) {
  return (
    <VStack
      borderBottom={{ base: "1px", md: "none" }}
      borderBottomColor="gray.300"
      pb={{ base: 2, md: 0 }}
    >
      <VStack>
        <Box w={{ base: "80%", md: "60%" }}>
          {news?.thumbnail ? (
            <Image alt="thumbnail" src={news?.thumbnail} mx="auto" />
          ) : (
            ""
          )}
        </Box>
      </VStack>
      <VStack justifyContent="space-between">
        <Box>
          <Heading
            as="h2"
            size="sm"
            textAlign="center"
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
          <Text fontSize="xs" display="block" w="130" overflow="hidden">
            {news?.content.find((el) => el.type === "paragraph")
              ? news?.content.find((el) => el.type === "paragraph").children[0]
                  .text
              : ""}
          </Text>
        </Box>
        <HStack
          w="full"
          justifyContent="space-between"
          pr={6}
          pb={{ base: 0, md: 2 }}
        >
          <Text fontSize="2xs" color="cyan.800">
            {new Date(news?.createdAt).toLocaleString()}
          </Text>

          {news?.id ? (
            <NextLink
              href={`/${news?.type}/${news?.catnoticia.slug}/${news?.name}`}
              passHref
            >
              <Link fontSize="xs" color="brand.500" fontWeight="bold">
                Ler mais...
              </Link>
            </NextLink>
          ) : (
            ""
          )}
        </HStack>
      </VStack>
    </VStack>
  );
}
