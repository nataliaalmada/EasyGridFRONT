// https://codesandbox.io/s/chakra-slatejs-ptpfm?file=/src/index.tsx
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Center,
  ModalFooter,
  useDisclosure,
  HStack,
  Flex,
  Checkbox,
  Image,
} from "@chakra-ui/react";
import LinkIconText from "../../../components/_ui/LinkIconText";
import { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useNoticiasCtx } from "../../../contexts/NoticiasContext";
import { MdKeyboardBackspace, MdSave } from "react-icons/md";
import { FiImage } from "react-icons/fi";
import { useAuth } from "../../../contexts/AuthContext";
import RichTextEditor from "../../../components/_ui/RichTextEditor";
import { FileUploadEdit } from "../../../components/_ui/FileUpload";
import { usePageInstCtx } from "../../../contexts/PageInstContext";
import CustomDatepicker from "../../../components/_ui/CustomDatepicker";

export default function CriarPagina() {
  const router = useRouter();
  const [dataCat, setDataCat] = useState([]);
  const { catsNoticias, createNoticias, setContentCtx } = useNoticiasCtx();
  const { user } = useAuth();
  const toast = useToast();
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [errorMessage] = useState("");
  const [isEventCheck, setIsEventCheck] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const defaultValues = {
    doe: new Date().toISOString().slice(0, 10),
  };
  //const [dateEvent, setDateEvent] = useState(defaultValues);
  const [enableDateEvent, setEnableDateEvent] = useState(false);

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues, mode: "all" });

  const { loadImagesDataCtx } = usePageInstCtx();

  // ---- Insert Image (Thumbnail) ----
  const {
    isOpen: isOpenUpload,
    onOpen: onOpenUpload,
    onClose: onCloseUpload,
  } = useDisclosure();

  function handleClose() {
    onCloseUpload();
    loadImagesDataCtx();
  }

  // ---- Functions ----
  useEffect(() => {
    setDataCat(catsNoticias);
  });

  async function handleCadastrar(dataForm) {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("content-cms");
      const contentNew = await JSON.parse(item);

      const newDataForm = {
        name: dataForm.name,
        title: dataForm.title,
        thumbnail: thumbnailImage?.source,
        categoria_id: dataForm.categoria_id,
        is_event: dataForm.checkBoxEvent,
        date_event: dataForm?.doe,
        content: contentNew,
        user_id: user.id,
      };
      console.log(newDataForm);
      createNoticias(newDataForm)
        .then((resp) => {
          if (resp) {
            console.log(resp);
            setContentCtx([]);
            toast({
              title: `Sucesso! ${resp.page.menuName} adicionado a lista de páginas.`,
              status: "success",
              duration: 7000,
              position: "top",
              isClosable: true,
            });
            router.push("/admin/noticias/gerenciar-paginas");
          }
        })
        .catch((error) => console.log(error));
    }
  }

  function handleCheck(event) {
    setIsEventCheck(event.target.checked);
    setEnableDateEvent(!enableDateEvent);
  }

  return (
    <>
      <VStack w={{ base: "100%", sm: "80%" }} alignItems="flex-start">
        <LinkIconText
          icon={ArrowBackIcon}
          text="VOLTAR"
          onClick={() => router.back()}
        />
        <Text fontSize="xs" color="gray.400" fontWeight="bold" pt={5}>
          | NOTÍCIAS
        </Text>
        <Heading as="h2" size="lg" lineHeight={0.8} pb={4}>
          Criar Notícia
        </Heading>

        <Box h="full" boxShadow="md" bg="white" w="full">
          <Box bg="white" p={6} rounded="md">
            <form onSubmit={handleSubmit(handleCadastrar)}>
              <VStack spacing={4} align="flex-start">
                <FormControl isInvalid={errors.name} isRequired>
                  <FormLabel htmlFor="name" fontSize="xs" fontWeight="semibold">
                    Nome da Notícia
                  </FormLabel>
                  <Input
                    {...register("name", {
                      required: "Este campo é obrigatório",
                    })}
                    id="name"
                    name="name"
                    type="text"
                    variant="filled"
                    fontSize="xs"
                    placeholder="Nome da notícia..."
                  />
                </FormControl>
                <Flex w="100%" gap={4}>
                  <Flex w="40%">
                    <FormControl isRequired>
                      <FormLabel
                        htmlFor="categoria"
                        fontSize="xs"
                        fontWeight="semibold"
                      >
                        Categoria
                      </FormLabel>
                      <Select
                        {...register("categoria_id")}
                        placeholder="Selecione uma categoria..."
                        color="gray.500"
                        variant="filled"
                        fontSize="xs"
                      >
                        {dataCat &&
                          dataCat.map((cat) => {
                            return (
                              <option key={cat.id} value={cat.id}>
                                {cat.name}
                              </option>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </Flex>
                  <Flex w="25%">
                    <FormControl>
                      <FormLabel
                        htmlFor="titulo"
                        fontSize="xs"
                        fontWeight="semibold"
                        textAlign="center"
                      >
                        Mostrar em Eventos (Página Inicial)?
                      </FormLabel>
                      <Center
                        border="1px"
                        borderStyle="dashed"
                        borderColor="gray.300"
                        h="9"
                        borderRadius="md"
                      >
                        <Checkbox
                          {...register("checkBoxEvent")}
                          size="md"
                          borderColor="brand.500"
                          pt={1}
                          isChecked={isEventCheck}
                          onChange={(e) => handleCheck(e)}
                        />
                      </Center>
                    </FormControl>
                  </Flex>
                  <Flex w="35%">
                    <FormControl isInvalid={errors.whatsapp}>
                      <FormLabel
                        htmlFor="data_nascimento"
                        fontSize="xs"
                        fontWeight="semibold"
                      >
                        Data do Evento:
                      </FormLabel>
                      <CustomDatepicker
                        name="doe"
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "Enter Date of Event",
                          },
                        }}
                        render={({ field: { ...rest } }) => (
                          <input
                            type="date"
                            disabled={!enableDateEvent}
                            style={
                              !enableDateEvent
                                ? { color: "gray" }
                                : { color: "black" }
                            }
                            {...rest}
                          />
                        )}
                        isClearable
                        onClear={() =>
                          setValue("doe", "", {
                            shouldValidate: true,
                            shouldDirty: true,
                          })
                        }
                      />
                      <Box fontSize="xs" fontWeight="bold" color="red">
                        {errorMessage}
                      </Box>
                    </FormControl>
                  </Flex>
                </Flex>
                <Flex w="100%" gap={4}>
                  <Flex w="60%">
                    <FormControl isInvalid={errors.name}>
                      <FormLabel
                        htmlFor="titulo"
                        fontSize="xs"
                        fontWeight="semibold"
                      >
                        Título
                      </FormLabel>
                      <Input
                        {...register("title")}
                        id="title"
                        name="title"
                        type="text"
                        variant="filled"
                        fontSize="xs"
                        placeholder="Título da página"
                      />
                    </FormControl>
                  </Flex>
                  <Flex
                    w="38%"
                    border="1px"
                    borderStyle="dashed"
                    borderColor="gray.300"
                    p={2}
                    borderRadius="md"
                  >
                    <HStack w="full" justifyContent="center">
                      <Image
                        boxSize="20"
                        objectFit="contain"
                        src={thumbnailImage?.source || "/images/no_image.png"}
                        alt="thumb"
                      />

                      <Button
                        leftIcon={<FiImage />}
                        size="xs"
                        w="200"
                        colorScheme="linkedin"
                        py={4}
                        onClick={onOpenUpload}
                      >
                        Selecionar Thumb
                      </Button>
                    </HStack>
                  </Flex>
                </Flex>
                <FormControl isInvalid={errors.descricao}>
                  <RichTextEditor />
                </FormControl>
                <HStack alignSelf="flex-end">
                  <Button
                    leftIcon={<MdKeyboardBackspace />}
                    color="white"
                    bg="gray.500"
                    _hover={{ bg: "gray.700" }}
                    fontSize="xs"
                    onClick={() => router.back()}
                  >
                    Cancelar
                  </Button>
                  <Button
                    leftIcon={<MdSave size={16} />}
                    type="submit"
                    color="white"
                    bg="brand.600"
                    _hover={{ bg: "brand.800" }}
                    fontSize="xs"
                    px={8}
                  >
                    Salvar
                  </Button>
                </HStack>
              </VStack>
            </form>
          </Box>
        </Box>
      </VStack>
      <Modal isOpen={isOpenUpload} onClose={onCloseUpload} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Escolha ou envie uma imagem...</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box as="form" align="center">
              <Center flexDirection="column" gap="10">
                <FileUploadEdit
                  accept="image/*"
                  imgEdit={false}
                  dragDrop={true}
                  multiple={true}
                  preview={false}
                  handleSelect={setThumbnailImage}
                  handleClose={handleClose}
                />
              </Center>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
