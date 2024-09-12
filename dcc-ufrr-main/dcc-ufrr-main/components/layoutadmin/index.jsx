import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { FiMenu, FiSearch } from "react-icons/fi";

import { MdOutlineOpenInBrowser } from "react-icons/md";
import SidebarContent from "./Sidebar";

import UserMenu from "./UserMenu";

export default function LayoutAdmin({ children }) {
  const sidebar = useDisclosure();

  return (
    <Box
      as="section"
      bg="gray.50"
      _dark={{ bg: "gray.700" }}
      minH="100vh"
      minW="100vw"
    >
      <SidebarContent display={{ base: "none", md: "unset" }} navm={sidebar} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" navm={sidebar} />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          bg="white"
          borderBottomWidth="1px"
          color="inherit"
          h="14"
          px={4}
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="lg"
          />
          <InputGroup w="96" display={{ base: "none", md: "flex" }}>
            <InputLeftElement color="gray.500">
              <FiSearch />
            </InputLeftElement>
            <Input fontSize="sm" placeholder="Buscar por assunto..." />
          </InputGroup>
          <HStack spacing={10}>
            <Flex>
              <Button
                rightIcon={<MdOutlineOpenInBrowser size={20} />}
                colorScheme="telegram"
                variant="outline"
                size="sm"
                onClick={() => window.open("/")}
              >
                Abrir Frontend
              </Button>
            </Flex>
            <Flex align="center">
              <Icon color="gray.500" as={FaBell} cursor="pointer" />
              <UserMenu />
            </Flex>
          </HStack>
        </Flex>

        <Flex as="main" p="4" maxH="full" w="full" justifyContent="center">
          {children}
        </Flex>
      </Box>
    </Box>
  );
}
