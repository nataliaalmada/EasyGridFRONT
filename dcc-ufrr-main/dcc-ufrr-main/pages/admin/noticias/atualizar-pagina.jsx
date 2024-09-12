import { useForm, Controller } from "react-hook-form";
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
  const {
    catsNoticias,
    updateNoticias,
    selectedNoticiaCtx,
    setSelectedNoticiaCtx,
  } = useNoticiasCtx();
  const { user } = useAuth();
  const toast = useToast();
  const [errorMessage] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState(
    selectedNoticiaCtx?.thumbnail
      ? {
          name: selectedNoticiaCtx?.thumbnail,
          source: selectedNoticiaCtx?.thumbnail,
        }
      : null
  );
  const [isEventCheck, setIsEventCheck] = useState(
    selectedNoticiaCtx?.is_event
  );
  const [enableDateEvent, setEnableDateEvent] = useState(
    selectedNoticiaCtx?.is_event
  );

  useEffect(() => {
    setDataCat(catsNoticias);
  });

  const {
    handleSubmit,
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: selectedNoticiaCtx?.menuName,
      title: selectedNoticiaCtx?.title,
      categoria_id: selectedNoticiaCtx?.catnoticiaId,
      checkBoxEvent: selectedNoticiaCtx?.is_event,
      doe: selectedNoticiaCtx?.date_event
        ? new Date(selectedNoticiaCtx?.date_event).toISOString().slice(0, 10)
        : "",
      content: selectedNoticiaCtx?.content,
    },
    mode: "all",
  });

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

  async function handleAtualizar(dataForm) {
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
        page_id: selectedNoticiaCtx.id,
      };
      console.log(newDataForm);
      updateNoticias(newDataForm)
        .then((resp) => {
          if (resp) {
            console.log(resp);
            toast({
              title: `Sucesso! ${resp.updatedPage.menuName} atualizado a lista de páginas.`,
              status: "success",
              duration: 7000,
              position: "top",
              isClosable: true,
            });
            setSelectedNoticiaCtx({});
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

  function handleBack() {
    setSelectedNoticiaCtx({});
    router.back();
  }

  return (
    <>
      <VStack w={{ base: "100%", sm: "80%" }} alignItems="flex-start">
        <LinkIconText
          icon={ArrowBackIcon}
          text="VOLTAR"
          onClick={() => handleBack()}
        />
        <Text fontSize="xs" color="gray.400" fontWeight="bold" pt={5}>
          | NOTÍCIAS
        </Text>
        <Heading as="h2" size="lg" lineHeight={0.8} pb={4}>
          Atualizar Notícia / Evento
        </Heading>

        <Box h="full" boxShadow="md" bg="white" w="full">
          <Box bg="white" p={6} rounded="md">
            <form onSubmit={handleSubmit(handleAtualizar)}>
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
                      <Controller
                        control={control}
                        defaultValue={getValues("categoria_id")}
                        name="categorias"
                        render={({ field: { onChange, ref } }) => (
                          <Select
                            {...register("categoria_id")}
                            inputRef={ref}
                            onChange={(val) => onChange(val.value)}
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
                        )}
                      />
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
                    <HStack w="full" justifyContent="center" spacing={5}>
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
                  <RichTextEditor
                    contentSelected={selectedNoticiaCtx?.content}
                  />
                </FormControl>
                <HStack alignSelf="flex-end">
                  <Button
                    leftIcon={<MdKeyboardBackspace />}
                    color="white"
                    bg="gray.500"
                    _hover={{ bg: "gray.700" }}
                    fontSize="xs"
                    onClick={() => handleBack()}
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
                    Atualizar
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
