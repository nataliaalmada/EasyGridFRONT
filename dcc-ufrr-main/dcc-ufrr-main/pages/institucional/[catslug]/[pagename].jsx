// File: dcc-ufrr-main/pages/institucional/[catslug].jsx

import { useEffect, useState } from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import SideBar from "../../../components/layout/Sidebar";
import { AiOutlineHome } from "react-icons/ai";
import RichTextDisplay from "../../../components/_ui/RichTextDisplay";

export default function InstPage({ page, otherpages, catname, catslug }) {
  const sidebar = useDisclosure();
  const navbarMobile = useDisclosure();
  const [contentPageIni, setContentPageIni] = useState(page?.content);

  useEffect(() => {
    navbarMobile.onClose();
    setContentPageIni(page?.content);
  }, [page?.content]);

  return (
    <Flex
      h="full"
      w="full"
      justifyContent="center"
      px={{ base: 0, md: 10 }}
      py={{ base: 3, md: 10 }}
    >
      <HStack w={{ base: "100%", sm: "60%" }}>
        <SideBar
          display={{ base: "none", md: "unset" }}
          catname={catname}
          catslug={catslug}
          catpages={otherpages}
          type="inst"
        />
        <Box
          ml={{ base: 0, md: 60 }}
          transition=".3s ease"
          h="full"
          w="full"
          pr={2}
        >
          <VStack w="full">
            <Box alignSelf="start" px={{ base: 2, md: 5 }}>
              <Breadcrumb
                spacing={{ base: 1, md: 5 }}
                separator={<ChevronRightIcon color="gray.500" />}
                fontWeight="bold"
                fontSize={{ base: "2xs", md: "sm" }}
                textAlign={{ base: "center", md: "left" }}
                color="gray.800"
                px={1}
              >
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <HStack spacing={1}>
                      <AiOutlineHome fontSize="16" />
                      <Text>Home</Text>
                    </HStack>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">{catname}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href="#">{page?.menuName}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>
            <VStack w="full">
              <Box w="full" alignSelf="start" px={{ base: 0, md: 5 }} pt={1}>
                <RichTextDisplay
                  titlePage={page?.title}
                  contentPage={contentPageIni}
                />
              </Box>
            </VStack>
          </VStack>
        </Box>
        <Drawer
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement="left"
        >
          <DrawerOverlay />
          <DrawerContent>
            <SideBar w="full" borderRight="none" />
          </DrawerContent>
        </Drawer>
      </HStack>
    </Flex>
  );
}

// Remove the getStaticPaths and getStaticProps functions

