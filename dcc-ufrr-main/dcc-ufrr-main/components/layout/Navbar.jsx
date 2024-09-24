import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  HStack,
  Button,
  useDisclosure,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import Logo from "../_ui/Logo";
import NavbarMobile from "./NavbarMobile";
import { FiMenu } from "react-icons/fi";
import { usePageInstCtx } from "../../contexts/PageInstContext";

export default function Navbar() {
  const router = useRouter();
  // const bg = useColorModeValue("gray.50", "gray.800");
  const navbarMobile = useDisclosure();
  const { catsPageInst } = usePageInstCtx();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(catsPageInst);
  });

  return (
    <Box
      as="header"
      // bg={bg}
      bg="#e9ecef"
      w="full"
      px={{
        base: 2,
        md: 4,
      }}
      py={4}
      shadow="md"
    >
      <Drawer
        isOpen={navbarMobile.isOpen}
        onClose={navbarMobile.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <NavbarMobile w="full" borderRight="none" navm={navbarMobile} />
        </DrawerContent>
      </Drawer>

      <Flex
        alignItems="center"
        justifyContent={{ base: "space-between", md: "space-evenly" }}
        w="full"
        px={{ base: 0, md: 15 }}
      >
        <Box
          display={{
            base: "inline-flex",
            md: "none",
          }}
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={navbarMobile.onOpen}
            icon={<FiMenu />}
            size="lg"
          />
        </Box>
        <Flex justifyContent="center" w={{ base: "full", md: "fit-content" }}>
          <NextLink href="/" title="DCC Page" passHref>
            <Link>
              <Logo src="/images/logos/logo-dcc-01.png" w={28} />
            </Link>
          </NextLink>
        </Flex>

        <HStack display="flex" alignItems="center" spacing={1}>
          <HStack
            spacing={1}
            mr={1}
            color="brand.600"
            display={{
              base: "none",
              md: "inline-flex",
            }}
          >
            {data &&
              data.map((menu) => {
                return (
                  menu.active && (
                    <Menu key={menu.id}>
                      <MenuButton
                        as={Button}
                        variant="ghost"
                        rightIcon={<ChevronDownIcon />}
                      >
                        {menu.name}
                      </MenuButton>
                      <MenuList fontSize="smaller">
                        {menu.PageInstitucionals?.sort(
                          (a, b) => a.id - b.id
                        ).map((page) => {
                          return (
                            page.active && (
                              <MenuItem
                                key={page.id}
                                onClick={() =>
                                  router.push(
                                    `/${page.type}/${menu.slug}/${page.name}`
                                  )
                                }
                              >
                                {page.menuName}
                              </MenuItem>
                            )
                          );
                        })}
                      </MenuList>
                    </Menu>
                  )
                );
              })}
          </HStack>
        </HStack>
        <Flex pr={{ base: 0, md: 10 }}>
          <Button
            bg="brand.600"
            color="white"
            size="xs"
            _hover={{ bg: "brand.800" }}
            _active={{
              bg: "brand.800",
              transform: "scale(0.98)",
              borderColor: "brand.800",
            }}
            onClick={() => router.push("/admin")}
          >
            DCC Admin
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
