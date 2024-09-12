import { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import LinkIconText from "../../../components/_ui/LinkIconText";
import { MdWarning } from "react-icons/md";

export default function Configuracoes() {
  const router = useRouter();

  return (
    <VStack w={{ base: "100%", sm: "80%" }} alignItems="flex-start">
      <LinkIconText
        icon={ArrowBackIcon}
        text="VOLTAR"
        onClick={() => router.back()}
      />
      <HStack>
        <Heading>Configurações</Heading>
        <HStack color="red">
          <MdWarning size={20} />
          <Text>Em desenvolvimento</Text>
        </HStack>
      </HStack>
      <Box h="full" boxShadow="md" bg="white" w="full">
        <Box bg="white" p={6} rounded="md" h={400}></Box>
      </Box>
    </VStack>
  );
}
