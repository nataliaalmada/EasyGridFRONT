import { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import LinkIconText from "../../../components/_ui/LinkIconText";
import { MdDelete, MdEdit } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../../contexts/UserContext";

function getRole(role) {
  const roles = ["Usuário", "Editor", "Admin"];
  return roles[--role];
}

export default function AdminUsers() {
  const router = useRouter();
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedUser, setSelectedUser] = useState(null);
  const { usersAll, updateUserActive } = useUser();
  let cancelRef = useRef();

  const {
    isOpen: isOpenDelete,
    // eslint-disable-next-line no-unused-vars
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const toast = useToast();

  // ---- Functions ----
  useEffect(() => {
    setData(usersAll);
  });

  const onBtnClick = (event) => {
    console.log(event.target);
    if (event.target) {
      event.target.setAttribute("disabled", "disabled");
    }
  };

  function toggleActive(event, user) {
    onBtnClick(event);
    setSelectedUser(user);
    user.active = !user.active;
    console.log(user);
    updateUserActive(user)
      .then((resp) => {
        if (resp) {
          console.log(resp);
          toast({
            title: `Sucesso! ${resp.updatedUser.name} está ${resp.updatedUser.active} agora!.`,
            status: "success",
            duration: 7000,
            position: "top",
            isClosable: true,
          });
          event.target.removeAttribute("disabled");
          router.push("/admin/users");
        }
      })
      .catch((error) => {
        event.target.removeAttribute("disabled");
        console.log(error);
      });
  }

  return (
    <VStack w={{ base: "100%", sm: "80%" }} alignItems="flex-start">
      <LinkIconText
        icon={ArrowBackIcon}
        text="VOLTAR"
        onClick={() => router.back()}
      />
      <HStack>
        <Heading>Adminstrar Usuários</Heading>
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
                  <Th textAlign="center">E-mail</Th>
                  <Th textAlign="center">Perfil</Th>
                  <Th textAlign="center">Criado em</Th>
                  <Th textAlign="center">Último acesso</Th>
                  <Th textAlign="center">Status</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data &&
                  data.map((user) => {
                    return (
                      <Tr key={user.id}>
                        <Th textAlign="center">
                          <Checkbox />
                        </Th>
                        <Td>{user.id}</Td>
                        <Td>{user.name}</Td>
                        <Td textAlign="center">{user.email}</Td>
                        <Td textAlign="center">{getRole(user?.role)}</Td>

                        <Td textAlign="center">
                          {new Date(user.createdAt).toLocaleString()}
                        </Td>
                        <Td textAlign="center" color="brand.500">
                          {new Date(user.last_access).toLocaleString()}
                        </Td>
                        <Td textAlign="center">
                          {user.active ? (
                            <Button
                              colorScheme="green"
                              size="xs"
                              variant="outline"
                              px={3}
                              onClick={(event) => toggleActive(event, user)}
                              disabled={
                                user.email === "acauan.ribeiro@gmail.com"
                                  ? true
                                  : false
                              }
                            >
                              Ativo
                            </Button>
                          ) : (
                            <Button
                              colorScheme="red"
                              size="xs"
                              fontSize="xs"
                              variant="outline"
                              onClick={() => toggleActive(event, user)}
                            >
                              Inativo
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
                                disabled
                                // onClick={() => handleOnUpdateModal(user)}
                              />
                            </Tooltip>
                            <Tooltip label="Deletar" placement="top">
                              <IconButton
                                colorScheme="gray"
                                icon={<MdDelete />}
                                aria-label="Delete"
                                disabled
                                // onClick={() => handleOpenAlertDelete(user)}
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

      <AlertDialog
        isOpen={isOpenDelete}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Apagar Usuário
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja apagar a categoria:{" "}
              {/* <Text fontWeight="bold">{selectedCat?.name}</Text> */}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} fontSize="xs" onClick={onCloseDelete}>
                Cancel
              </Button>
              <Button
                leftIcon={<MdDelete size={16} />}
                colorScheme="red"
                fontSize="xs"
                // onClick={() => handleDelete(selectedCat?.id)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
}
