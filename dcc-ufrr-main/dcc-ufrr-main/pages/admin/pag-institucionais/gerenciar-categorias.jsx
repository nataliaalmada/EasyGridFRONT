import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Heading,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import LinkIconText from "../../../components/_ui/LinkIconText";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import { usePageInstCtx } from "../../../contexts/PageInstContext";

export default function GerenciarCategorias() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);

  const {
    catsPageInst,
    createCatPageInst,
    updateCatPageInst,
    deleteCatPageInst,
  } = usePageInstCtx();

  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const cancelRef = useRef();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const toast = useToast();

  // Force reload page (uma vez)
  if (typeof window !== "undefined") {
    window.onload = function () {
      if (!localStorage.loaded) {
        localStorage.setItem("loaded", "yes");
        window.location.reload();
      }
    };
  }

  // ---- Functions ----
  useEffect(() => {
    setData(catsPageInst);
  });

  async function handleCadastrar(dataForm) {
    createCatPageInst(dataForm.name)
      .then((data) => {
        if (data) {
          handleOnCloseModal();
          toast({
            title: `Sucesso! ${data.menu.name} adicionado a lista.`,
            status: "success",
            duration: 7000,
            position: "top",
            isClosable: true,
          });
        }
      })
      .catch((error) => console.log(error));
  }

  async function handleUpdate(dataForm) {
    const id = dataForm?.id || selectedCat?.id;
    console.log(id);
    updateCatPageInst(id, dataForm)
      .then((data) => {
        if (data) {
          handleOnCloseModal();
          toast({
            title: `Sucesso! ${data.menu.name} adicionado a lista.`,
            status: "success",
            duration: 7000,
            position: "top",
            isClosable: true,
          });
        }
      })
      .catch((error) => console.log(error));
  }

  async function handleDelete(id) {
    deleteCatPageInst(id)
      .then((data) => {
        if (data) {
          onCloseDelete();
          console.log(data);
          toast({
            title: `Sucesso!  ${data.msg.name} removido da lista.`,
            status: "success",
            duration: 7000,
            position: "top",
            isClosable: true,
          });
        }
      })
      .catch((error) => console.log(error));
  }

  function handleOnCloseModal() {
    onCloseCreate();
    onCloseUpdate();
    reset();
  }

  function handleOnUpdateModal(cat) {
    setSelectedCat(cat);
    onOpenUpdate();
  }

  function handleOpenAlertDelete(cat) {
    setSelectedCat(cat);
    onOpenDelete();
  }

  function toggleActive(cat) {
    setSelectedCat(cat);
    cat.active = !cat.active;
    handleUpdate(cat);
  }

  return (
    <>
      <VStack w={{ base: "100%", sm: "80%" }} alignItems="flex-start">
        <LinkIconText
          icon={ArrowBackIcon}
          text="VOLTAR"
          onClick={() => router.back()}
        />
        <HStack w="full" justifyContent="space-between">
          <VStack alignItems="flex-start">
            <Text fontSize="xs" color="gray.400" fontWeight="bold" pt={5}>
              | PÁGINAS INSTITUCIONAIS
            </Text>
            <Heading as="h2" size="lg" lineHeight={0.8} pb={4}>
              Categorias (Top Menu)
            </Heading>
          </VStack>

          <Button
            leftIcon={<AiOutlinePlus />}
            width={{ base: 100, md: 200 }}
            whiteSpace="break-spaces"
            color="white"
            bg="brand.500"
            _hover={{ bg: "brand.700" }}
            fontSize={{ base: "xs", md: "sm" }}
            onClick={onOpenCreate}
          >
            Adicionar uma nova
          </Button>
        </HStack>

        <Box h="full" boxShadow="md" bg="white" w="full">
          <Box bg="white" p={6} rounded="md">
            <TableContainer>
              <Table size="sm" whiteSpace="break-spaces">
                <Thead>
                  <Tr>
                    <Th textAlign="center">
                      <Checkbox />
                    </Th>
                    <Th>ID</Th>
                    <Th>Nome</Th>
                    <Th textAlign="center">Páginas</Th>
                    <Th textAlign="center">Criado em</Th>
                    <Th textAlign="center">Status</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data &&
                    data
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      )
                      .map((cat) => {
                        return (
                          <Tr key={cat.id}>
                            <Th textAlign="center">
                              <Checkbox />
                            </Th>
                            <Td>{cat.id}</Td>
                            <Td>{cat.name}</Td>
                            <Td textAlign="center">
                              {cat.PageInstitucionals.length}
                            </Td>
                            <Td textAlign="center">
                              {new Date(cat.createdAt).toLocaleString()}
                            </Td>
                            <Td textAlign="center">
                              {cat.active ? (
                                <Button
                                  colorScheme="green"
                                  size="xs"
                                  variant="outline"
                                  px={3}
                                  onClick={() => toggleActive(cat)}
                                >
                                  Publicado
                                </Button>
                              ) : (
                                <Button
                                  colorScheme="red"
                                  size="xs"
                                  fontSize="xs"
                                  variant="outline"
                                  onClick={() => toggleActive(cat)}
                                >
                                  Privado
                                </Button>
                              )}
                            </Td>
                            <Td textAlign="center">
                              <ButtonGroup
                                variant="ghost"
                                size="sm"
                                spacing={3}
                                alignItems="center"
                              >
                                <Tooltip label="Editar" placement="top">
                                  <IconButton
                                    colorScheme="gray"
                                    icon={<MdEdit />}
                                    aria-label="Edit"
                                    onClick={() => handleOnUpdateModal(cat)}
                                  />
                                </Tooltip>
                                <Tooltip label="Deletar" placement="top">
                                  <IconButton
                                    colorScheme="gray"
                                    icon={<MdDelete />}
                                    aria-label="Delete"
                                    onClick={() => handleOpenAlertDelete(cat)}
                                  />
                                </Tooltip>
                              </ButtonGroup>
                            </Td>
                          </Tr>
                        );
                      })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </VStack>
      <Modal isOpen={isOpenCreate} onClose={() => handleOnCloseModal()}>
        <ModalOverlay />
        <ModalContent>
          <form id="form-cadastrar" onSubmit={handleSubmit(handleCadastrar)}>
            <ModalHeader>Adicionar Categoria</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack spacing={4} align="flex-start">
                <FormControl isInvalid={errors.name} isRequired>
                  <FormLabel htmlFor="name" fontSize="xs" fontWeight="semibold">
                    Nome
                  </FormLabel>
                  <Input
                    {...register("name")}
                    id="name"
                    name="name"
                    type="text"
                    fontSize="xs"
                    variant="filled"
                    placeholder="Nome da categoria..."
                  />

                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter gap={2}>
              <Button
                form="form-cadastrar"
                leftIcon={<MdSave size={16} />}
                type="submit"
                color="white"
                bg="brand.600"
                _hover={{ bg: "brand.800" }}
                fontSize="xs"
                alignSelf="flex-end"
                px={4}
              >
                Salvar
              </Button>
              <Button fontSize="xs" onClick={handleOnCloseModal}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenUpdate} onClose={() => handleOnCloseModal()}>
        <ModalOverlay />
        <ModalContent>
          <form id="form-atualizar" onSubmit={handleSubmit(handleUpdate)}>
            <ModalHeader>Atualizar Categoria</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack spacing={4} align="flex-start">
                <FormControl isInvalid={errors.name} isRequired>
                  <FormLabel htmlFor="name" fontSize="xs" fontWeight="semibold">
                    Nome
                  </FormLabel>
                  <Input
                    {...register("name", setValue("name", selectedCat?.name))}
                    id="name"
                    name="name"
                    type="text"
                    variant="filled"
                    placeholder="Nome da categoria..."
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter gap={2}>
              <Button
                form="form-atualizar"
                leftIcon={<MdSave size={16} />}
                type="submit"
                color="white"
                bg="brand.600"
                _hover={{ bg: "brand.800" }}
                fontSize="xs"
                alignSelf="flex-end"
                px={4}
              >
                Salvar
              </Button>
              <Button fontSize="xs" onClick={handleOnCloseModal}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isOpenDelete}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Apagar Categoria
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja apagar a categoria:{" "}
              <Text fontWeight="bold">{selectedCat?.name}</Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} fontSize="xs" onClick={onCloseDelete}>
                Cancel
              </Button>
              <Button
                leftIcon={<MdDelete size={16} />}
                colorScheme="red"
                fontSize="xs"
                onClick={() => handleDelete(selectedCat?.id)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
