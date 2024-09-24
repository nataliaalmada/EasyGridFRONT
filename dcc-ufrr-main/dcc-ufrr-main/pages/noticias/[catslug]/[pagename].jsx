// File: dcc-ufrr-main/pages/noticias/[catslug].jsx

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
  const [contentPageIni, setContentPageIni] = useState(page?.content || []);

  useEffect(() => {
    navbarMobile.onClose();
    setContentPageIni(page?.content);
  }, [page?.content]);

  console.log(page);

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
          type="news"
        />
        <Box
          ml={{ base: 0, md: 60 }}
          transition=".3s ease"
          h="full"
          w="full"
          pr={2}
        >
          <VStack w="full">
            <Box alignSelf="start" px={{ base: 1, md: 5 }}>
              <Breadcrumb
                spacing={{ base: 1, md: 5 }}
                gap={0}
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
                  <BreadcrumbLink href="/noticias/all">
                    <Text>Todas as Notícias</Text>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href="#">
                    <Text>{page?.menuName}</Text>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>
            <VStack w="full">
              <Box w="full" alignSelf="start" px={{ base: 1, md: 5 }} pt={1}>
                <RichTextDisplay
                  titlePage={page?.title}
                  contentPage={contentPageIni}
                  author={page?.User.name}
                  updatedAt={page?.updatedAt}
                  pageType={page?.type}
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

// Removed getStaticPaths and getStaticProps functions for testing purposes.

