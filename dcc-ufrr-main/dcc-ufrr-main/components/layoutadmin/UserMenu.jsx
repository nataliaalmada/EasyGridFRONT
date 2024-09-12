import {
  Avatar,
  Box,
  HStack,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import CryptoJS from "crypto-js";
import { RiProfileLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

export default function UserMenu() {
  const router = useRouter();
  const { user, logout } = useAuth();

  setCookie("SameSite", "None");
  setCookie("Secure");

  async function signOut() {
    logout();
  }
  //const { isOpen, onToggle, onClose } = useDisclosure();
  return (
    <Popover>
      {({ onClose }) => (
        <>
          <Tooltip aria-label="tooltip" placement="right" label="Perfil & Sair">
            <Box display="inline-block">
              <PopoverTrigger>
                <Avatar
                  ml="4"
                  size="sm"
                  name={user?.name}
                  src={`https://www.gravatar.com/avatar/${CryptoJS.MD5(
                    user?.email
                  ).toString()}?d=wavatar`}
                  cursor="pointer"
                />
              </PopoverTrigger>
            </Box>
          </Tooltip>
          <Portal>
            <PopoverContent fontSize="sm">
              <PopoverArrow />
              <PopoverHeader textAlign="center">
                <Text fontWeight="semibold">{user?.name}</Text>
                <Text color="gray">{user?.email}</Text>
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <VStack>
                  <HStack
                    w="full"
                    lineHeight="10"
                    _hover={{ bg: "gray.100", cursor: "pointer" }}
                    onClick={() => {
                      router.push("/admin/users/atualizar-dados");
                      onClose();
                    }}
                  >
                    <Icon as={RiProfileLine} mx={1} />
                    <Text>Editar Perfil</Text>
                  </HStack>
                </VStack>
              </PopoverBody>
              <PopoverFooter>
                <HStack
                  w="full"
                  lineHeight="10"
                  _hover={{ bg: "gray.100", cursor: "pointer" }}
                  onClick={() => signOut()}
                >
                  <Icon as={MdLogout} mx={1} />
                  <Text>Sair</Text>
                </HStack>
              </PopoverFooter>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}
