import {
  Box,
  Collapse,
  Flex,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePageInstCtx } from "../../contexts/PageInstContext";
import Logo from "../_ui/Logo";
import {
  MdHome,
  MdKeyboardArrowRight,
  MdComputer,
  MdMenuBook,
  MdExtension,
} from "react-icons/md";
import { ImLab } from "react-icons/im";

const getIcon = {
  dcc: MdComputer,
  ensino: MdMenuBook,
  pesquisa: ImLab,
  extensao: MdExtension,
};

export default function NavbarMobile(props) {
  const router = useRouter();
  const { catsPageInst } = usePageInstCtx();
  const [data, setData] = useState([]);
  const { navm } = props;

  useEffect(() => {
    setData(catsPageInst);
  });

  catsPageInst.map((menu) => (menu.dis = useDisclosure()));

  const NavItem = (props) => {
    const { icon, children, ...rest } = props;

    return (
      <Flex
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{ color: "gray.400" }}
        _hover={{
          bg: "gray.100",
          _dark: { bg: "gray.900" },
          color: "gray.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: "brand.400",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

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
      <Flex w="full" justifyContent="center" py={5}>
        <Logo src="/images/logos/logo-dcc-01.png" w="50%" />
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
        alignItems="flex-start"
      >
        <NavItem icon={MdHome} onClick={() => handleRouter("/")}>
          Home
        </NavItem>
        {data &&
          data.map((menu) => {
            return (
              menu.active && (
                <>
                  <NavItem
                    key={menu.id}
                    icon={getIcon[menu.slug]}
                    onClick={menu.dis.onToggle}
                    w="full"
                  >
                    <Flex
                      w="full"
                      alignItems="center"
                      justifyContent="space-between"
                      pl="2.5"
                    >
                      <Text>{menu.name}</Text>
                      <Icon
                        as={MdKeyboardArrowRight}
                        // ml="auto"
                        transform={menu.dis.isOpen && "rotate(90deg)"}
                      />
                    </Flex>
                  </NavItem>
                  <Collapse in={menu.dis.isOpen}>
                    {menu.PageInstitucionals?.map((page) => {
                      return (
                        page.active && (
                          <NavItem
                            key={page.id}
                            pl="12"
                            py="2"
                            color="brand.600"
                            justifyContent="flex-start"
                            onClick={() =>
                              handleRouter(
                                `/${page.type}/${menu.slug}/${page.name}`
                              )
                            }
                          >
                            {page.menuName}
                          </NavItem>
                        )
                      );
                    })}
                  </Collapse>
                </>
              )
            );
          })}
      </Flex>
    </Box>
  );
}
