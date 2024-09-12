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
  useDisclosure,
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
import { ArrowBackIcon } from "@chakra-ui/icons";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNoticiasCtx } from "../../../contexts/NoticiasContext";
import { usePageInstCtx } from "../../../contexts/PageInstContext";

export default function GerenciarPaginas() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const {
    catsNoticias,
    deleteNoticias,
    setSelectedNoticiaCtx,
    updateNoticiasActive,
  } = useNoticiasCtx();

  const { setCreateFlagCtx } = usePageInstCtx();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const cancelRef = useRef();
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
    setData(catsNoticias);
  });

  async function handleDelete(id) {
    deleteNoticias(id)
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

  function handleAtualizarPage(pag) {
    setSelectedNoticiaCtx(pag);
    setCreateFlagCtx(false);
    router.push("/admin/noticias/atualizar-pagina");
  }

  function handleOpenAlert(pag) {
    setSelectedPage(pag);
    onOpenDelete();
  }

  function toggleActive(pag) {
    setSelectedPage(pag);
    pag.active = !pag.active;
    console.log(pag);
    updateNoticiasActive(pag)
      .then((resp) => {
        if (resp) {
          console.log(resp);
          toast({
            title: `Sucesso! ${resp.updatedPage.menuName} atualizado na lista de páginas.`,
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

  function formatCorrectDate(dateValue) {
    const day = dateValue.getUTCDate();
    const month = dateValue.getUTCMonth() + 1; // Return Value is 0 indexed
    const year = dateValue.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <>
      <VStack w={{ base: "100%", sm: "90%" }} alignItems="flex-start">
        <LinkIconText
          icon={ArrowBackIcon}
          text="VOLTAR"
          onClick={() => router.back()}
        />
        <HStack w="full" justifyContent="space-between">
          <VStack alignItems="flex-start">
            <Text fontSize="xs" color="gray.400" fontWeight="bold" pt={5}>
              | NOTÍCIAS/EVENTOS
            </Text>
            <Heading as="h2" size="lg" lineHeight={0.8} pb={4}>
              Gerenciar Notícias/Eventos
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
            onClick={() => {
              setCreateFlagCtx(true);
              router.push("/admin/noticias/criar-pagina");
            }}
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
                    <Th>Página</Th>
                    <Th>Título</Th>
                    <Th textAlign="center">Categoria</Th>
                    <Th textAlign="center">Data do Evento</Th>
                    <Th textAlign="center">Autor</Th>
                    <Th textAlign="center">Criado em</Th>
                    <Th textAlign="center">Status</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data &&
                    data.map((cat) => {
                      return cat.noticias
                        ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((pag) => {
                          return (
                            <Tr key={pag.id}>
                              <Td textAlign="center" size="xs">
                                <Checkbox />
                              </Td>
                              <Td fontSize="xs">{pag.menuName}</Td>
                              <Td fontSize="xs">{pag.title}</Td>
                              <Td fontSize="xs" textAlign="center">
                                {cat.name}
                              </Td>
                              <Td fontSize="xs" textAlign="center">
                                {formatCorrectDate(new Date(pag.date_event))}
                              </Td>
                              <Td fontSize="xs" textAlign="center">
                                {pag.User.name}
                              </Td>
                              <Td fontSize="xs" textAlign="center">
                                {new Date(pag.createdAt).toLocaleString()}
                              </Td>
                              <Td fontSize="xs" textAlign="center">
                                {pag.active ? (
                                  <Button
                                    colorScheme="green"
                                    size="xs"
                                    variant="outline"
                                    px={3}
                                    onClick={() => toggleActive(pag)}
                                  >
                                    Publicado
                                  </Button>
                                ) : (
                                  <Button
                                    colorScheme="red"
                                    size="xs"
                                    fontSize="xs"
                                    variant="outline"
                                    onClick={() => toggleActive(pag)}
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
                                      onClick={() => handleAtualizarPage(pag)}
                                    />
                                  </Tooltip>
                                  <Tooltip label="Deletar" placement="top">
                                    <IconButton
                                      colorScheme="gray"
                                      icon={<MdDelete />}
                                      aria-label="Delete"
                                      onClick={() => handleOpenAlert(pag)}
                                    />
                                  </Tooltip>
                                </ButtonGroup>
                              </Td>
                            </Tr>
                          );
                        });
                    })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </VStack>

      <AlertDialog
        isOpen={isOpenDelete}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Apagar Notícia
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja apagar a notícia:{" "}
              <Text fontWeight="bold">{selectedPage?.menuName}</Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} fontSize="xs" onClick={onCloseDelete}>
                Cancel
              </Button>
              <Button
                leftIcon={<MdDelete size={16} />}
                colorScheme="red"
                fontSize="xs"
                onClick={() => handleDelete(selectedPage?.id)}
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
