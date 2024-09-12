import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function ItemEvento({ dia, mes, tipo, titulo, assunto, href }) {
  const router = useRouter();
  return (
    <HStack
      as="button"
      w="full"
      border="1px"
      borderColor="darkcyan"
      borderRightRadius="lg"
      _hover={{ bg: "#ebedf0" }}
      _active={{
        bg: "#dddfe2",
        transform: "scale(0.98)",
        borderColor: "#bec3c9",
      }}
      onClick={() => router.push(href)}
    >
      <VStack spacing={0.7}>
        <Text
          bgColor="darkcyan"
          color="white"
          py={0.5}
          px={1}
          fontSize="md"
          w="full"
        >
          {dia}
        </Text>
        <Text
          bgColor="darkcyan"
          color="white"
          py={0.5}
          px={1}
          fontSize="xs"
          w="full"
        >
          {mes}
        </Text>
      </VStack>
      <HStack>
        <VStack spacing={0} alignItems="flex-start">
          <Text color="gray" fontSize="2xs">
            {tipo}
          </Text>
          <Heading as="h4" fontSize={{ base: "xs", md: "sm" }}>
            {titulo}
          </Heading>
          <Text color="brand.700"  fontSize={{ base: "2xs", md: "xs" }}>
            {assunto}
          </Text>
        </VStack>
      </HStack>
    </HStack>
  );
}
