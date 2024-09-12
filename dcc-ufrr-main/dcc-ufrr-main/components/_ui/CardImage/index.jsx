import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

export default function CardImage({
  imageData,
  insertImage,
  editor,
  handleSelect,
  handleClose,
}) {
  return (
    <Flex>
      <Box
        maxW="xs"
        mx="auto"
        bg="gray.100"
        _dark={{ bg: "gray.800" }}
        shadow="lg"
        rounded="lg"
      >
        <Image
          h={40}
          w="full"
          fit="cover"
          src={imageData?.source}
          alt={imageData?.name}
        />
        <VStack
          alignItems="center"
          spacing={0}
          py={1}
          px={3}
          roundedBottom="lg"
        >
          <HStack>
            <Text fontSize="3xs">{imageData?.name}</Text>
            <Text fontSize="2xs">{imageData?.size}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Button
              colorScheme="teal"
              variant="ghost"
              size="xs"
              fontSize="2xs"
              fontWeight="bold"
              rounded="lg"
              textTransform="uppercase"
              bg="gray.200"
              _focus={{
                bg: "gray.400",
              }}
              onMouseDown={(event) => {
                event.preventDefault();
                if (insertImage) {
                  insertImage(editor, imageData?.source);
                }
                if(handleSelect) {
                  handleSelect(imageData)
                }
                handleClose();
              }}
            >
              Selecionar
            </Button>
            <IconButton
              variant="ghost"
              colorScheme="teal"
              aria-label="Delete Image"
              icon={<MdDelete />}
              size="sm"
            />
          </HStack>
        </VStack>
      </Box>
    </Flex>
  );
}
