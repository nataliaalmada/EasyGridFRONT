import { useRouter } from "next/router";
import {
  Box,
  Collapse,
  Divider,
  Flex,
  Heading,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { FaRss } from "react-icons/fa";
import { MdHome, MdKeyboardArrowRight, MdWysiwyg } from "react-icons/md";
import { GoFileSymlinkDirectory } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { BsGearFill } from "react-icons/bs";
import Logo from "../_ui/Logo";
import NavItem from "./Navitem";

export default function SidebarContent(props) {
  const router = useRouter();
  const paginas = useDisclosure();
  const noticias = useDisclosure();
  const { navm } =  props ;

  function handleRouter(url) {
    router.push(url);
    navm.onClose();
  }

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{ bg: "gray.800" }}
      border
      color="inherit"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Flex w="full" justifyContent="center" py={5}>
          <Logo src="/images/logos/logo-dcc-01.png" w={28} />
        </Flex>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem
          icon={MdHome}
          main={true}
          onClick={() => handleRouter(`/admin`)}
        >
          Dashboard
        </NavItem>
        {/* ---------------------------------------------- */}
        {/* ----------- Páginas Institucionais ----------- */}
        {/* ---------------------------------------------- */}
        <NavItem icon={MdWysiwyg} main={true} onClick={paginas.onToggle}>
          Páginas Institucionais
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={paginas.isOpen && "rotate(90deg)"}
          />
        </NavItem>
        <Collapse in={paginas.isOpen}>
          <NavItem
            pl="12"
            py="2"
            onClick={() =>
              handleRouter("/admin/pag-institucionais/gerenciar-categorias")
            }
          >
            Categorias (Top Menu)
          </NavItem>
          <NavItem
            pl="12"
            py="2"
            onClick={() =>
              handleRouter("/admin/pag-institucionais/gerenciar-paginas")
            }
          >
            Gerenciar Páginas
          </NavItem>
        </Collapse>

        {/* ---------------------------------------------- */}
        {/* ------------ Notícias e Eventos -------------- */}
        {/* ---------------------------------------------- */}
        <NavItem icon={FaRss} main={true} onClick={noticias.onToggle}>
          Notícias e Eventos
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={noticias.isOpen && "rotate(90deg)"}
          />
        </NavItem>
        <Collapse in={noticias.isOpen}>
          <NavItem
            pl="12"
            py="2"
            onClick={() => handleRouter("/admin/noticias/gerenciar-categorias")}
          >
            Gerenciar Categorias
          </NavItem>
          <NavItem
            pl="12"
            py="2"
            onClick={() => handleRouter("/admin/noticias/gerenciar-paginas")}
          >
            Gerenciar Notícias/Eventos
          </NavItem>
        </Collapse>

        {/* ---------------------------------------------- */}
        {/* ---------- Gerenciados de Arquivos ----------- */}
        {/* ---------------------------------------------- */}
        <NavItem
          icon={GoFileSymlinkDirectory}
          main={true}
          onClick={() => handleRouter("/admin/gerenciador-arquivos")}
        >
          Gerenciador de Arquivos
        </NavItem>

        <Divider pt={5} />

        <Box>
          <Heading
            as="h4"
            size="xs"
            textAlign="center"
            color="brand.600"
            pt={3}
          >
            Admin Panel
          </Heading>
        </Box>

        {/* ---------------------------------------------- */}
        {/* ----------- Administrar Usuários ------------- */}
        {/* ---------------------------------------------- */}
        <NavItem
          icon={FiUsers}
          main={true}
          onClick={() => handleRouter("/admin/users")}
        >
          Administrar Usuários
        </NavItem>

        {/* ---------------------------------------------- */}
        {/* --------------- Configurações ---------------- */}
        {/* ---------------------------------------------- */}
        <NavItem
          icon={BsGearFill}
          main={true}
          onClick={() => handleRouter("/admin/config")}
        >
          Configurações
        </NavItem>
      </Flex>
    </Box>
  );
}
